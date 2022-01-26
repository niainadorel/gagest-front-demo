import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import {
  NbButtonModule,
  NbIconModule,
  NbRadioModule,
  NbCardModule,
  NbDialogModule,
  NbToastrModule,
  NbInputModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbCheckboxModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientComponent } from './client.component';
import { NewClientDialogComponent } from './new-client-dialog/new-client-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
};
@NgModule({
  declarations: [ClientComponent, NewClientDialogComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgxPaginationModule,
    NbButtonModule,
    NbIconModule,
    NbRadioModule,
    NbDialogModule.forChild(config),
    NbCardModule,
    NbToastrModule,
    NbInputModule,
    ReactiveFormsModule,
    FormsModule,
    NbDialogModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbCheckboxModule,
    SweetAlert2Module,
    NgxDatatableModule,
  ],
  entryComponents: [NewClientDialogComponent]

})
export class ClientModule { }
