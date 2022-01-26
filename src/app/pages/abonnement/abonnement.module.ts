import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonnementRoutingModule } from './abonnement-routing.module';
import { AbonnementComponent } from './abonnement.component';


@NgModule({
  declarations: [AbonnementComponent],
  imports: [
    CommonModule,
    AbonnementRoutingModule
  ]
})
export class AbonnementModule { }
