import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventaireRoutingModule } from './inventaire-routing.module';
import { InventaireComponent } from './inventaire.component';

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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModifDialogComponent } from './modif-dialog/modif-dialog.component';


const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
};
@NgModule({
  declarations: [InventaireComponent, ModifDialogComponent],
  imports: [
    CommonModule,
    InventaireRoutingModule,
    NbButtonModule,
    NbIconModule,
    NbRadioModule,
    NbCardModule,
    NbToastrModule,
    NbInputModule,
    ReactiveFormsModule,
    FormsModule,
    NbDialogModule.forChild(config),
    NbSpinnerModule,
    NbContextMenuModule,
    NbCheckboxModule,
    SweetAlert2Module,
    NgxDatatableModule,
  ],
  entryComponents: [ModifDialogComponent]
})
export class InventaireModule { }
