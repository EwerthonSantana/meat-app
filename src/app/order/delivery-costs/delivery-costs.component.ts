import { Component, Input, OnInit } from '@angular/core';
import { RadioComponent } from 'app/shared/radio/radio.component';
import { OrderComponent } from '../order.component';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html',
})
export class DeliveryCostsComponent implements OnInit {

  @Input() delivery: number
  @Input() itemsValue: number
  value: any
  @Input() valueSeted: string


  constructor(private order: OrderComponent) { }

  ngOnInit() {


  }

  onValueEmitter(value: any): void {
    this.valueSeted = this.value
  }


  total(): number {
    this.value = this.order.value

    console.log(this.value)

    if (this.value === "DEB") {
      return this.delivery + this.itemsValue + 1
    } else {
      return this.delivery + this.itemsValue

    }
  }

}
