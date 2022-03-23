import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioOption } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {


  @Input() options: RadioOption[]
  @Output() valueEmitter = new EventEmitter<string>();
  value: any
  Onchange: any;


  constructor() { }

  setValue(value: string) {
    this.value = value
    this.Onchange(this.value)
    // console.log(value)
    this.valueEmitter.emit(this.value)

  }



  writeValue(obj: any): void {
    this.value = obj
  }
  registerOnChange(fn: any): void {
    this.Onchange = fn
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }


}
