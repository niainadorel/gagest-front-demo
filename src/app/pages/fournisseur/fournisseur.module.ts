import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
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
import { FournisseurComponent } from './fournisseur.component';
import { NewFournisseurDialogComponent } from './new-fournisseur-dialog/new-fournisseur-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
  width: 450
};
@NgModule({
  declarations: [FournisseurComponent, NewFournisseurDialogComponent],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
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
  entryComponents: [NewFournisseurDialogComponent]

})
export class FournisseurModule { }
