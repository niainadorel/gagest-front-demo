import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipe } from './pipes/price.pipe';

const TO_EXPORTS = [
  PricePipe
]


@NgModule({
  declarations: [
    ...TO_EXPORTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...TO_EXPORTS
  ]
})
export class SharedModule { }
