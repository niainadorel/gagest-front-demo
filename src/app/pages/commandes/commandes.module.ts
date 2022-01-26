import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesRoutingModule } from './commandes-routing.module';
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
import { CommandesComponent } from './commandes.component';
// import { NewCommandesDialogComponent } from './new-commandes-dialog/new-commandes-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DetailsComponent } from './details/details.component';


const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
};
@NgModule({
  declarations: [CommandesComponent, DetailsComponent],
  imports: [
    CommonModule,
    CommandesRoutingModule,
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
  entryComponents: []

})
export class CommandesModule { }
