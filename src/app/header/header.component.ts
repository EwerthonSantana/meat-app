import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/security/login/login.service';

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  isLoggedIn(){
    this.loginService.isLoggedIn()
    console.log(this.loginService.user)
  }

}
