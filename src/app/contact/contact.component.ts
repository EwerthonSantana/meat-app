import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from './contact.service';
import { Contact } from './contact.model'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  contactId: string;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private contatcService: ContactService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      fone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern(this.numberPattern)]),
      tittle: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    }, { validators: [ContactComponent.equalsTo] })

  }
  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }
    return undefined

  }

  checkContact(contact: Contact) {
    this.contatcService.checkContact(contact).pipe(tap(
      (contactId: string) => { this.contactId = contactId }
    )).subscribe((contatcId: string) => {
      this.router.navigate(['/contact-summary'])

    })

  }

}

