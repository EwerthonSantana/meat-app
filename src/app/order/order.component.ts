import { Component, OnInit, ValueProvider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { group } from '@angular/animations';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {



  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup
  delivery: number = 8
  orderId: string
  value: string

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }

  ]
  activatedRoute: ActivatedRoute;


  constructor(private orderService: OrderService,
    private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      number: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: new FormControl(''),
      paymentOption: new FormControl('', Validators.required),
    }, { validators: [OrderComponent.equalsTo] })
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

  setValue(value:string){
    this.value = value
    console.log(value);
    
  }

  itemsValue(): number {

    return this.orderService.itemsValue()


  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order).pipe(
      tap((orderId: string) => { this.orderId = orderId }))
      .subscribe((orderId: string) => {
        this.orderService.clear()
        this.router.navigate(['/order-summary'])

      })


  }

  isOrderComplited(): boolean {
    return this.orderId !== undefined
  }
}
