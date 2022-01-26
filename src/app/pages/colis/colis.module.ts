import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NbIconModule, NbSpinnerModule, NbDialogModule, NbCardModule,
  NbRadioModule, NbButtonModule, NbDatepickerModule } from '@nebular/theme';

import { ColisRoutingModule } from './colis-routing.module';
import { ColisComponent } from './colis.component';
import { ChooseproductComponent } from './chooseproduct/chooseproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
};

@NgModule({
  declarations: [ColisComponent, ChooseproductComponent],
  imports: [
    CommonModule,
    ColisRoutingModule,
    NgxDatatableModule,
    NbIconModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(config),
    NbCardModule,
    NbRadioModule,
    NgxPaginationModule,
    NbButtonModule,
    NbDatepickerModule,
    SweetAlert2Module
  ],
  entryComponents: [ChooseproductComponent]
})
export class ColisModule { }
