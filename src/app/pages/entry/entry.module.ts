import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NbIconModule, NbSpinnerModule, NbDialogModule, NbCardModule, NbRadioModule, NbButtonModule } from '@nebular/theme';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
};

@NgModule({
  declarations: [EntryComponent, NewEntryComponent],
  imports: [
    CommonModule,
    EntryRoutingModule,
    NgxDatatableModule,
    NbIconModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(config),
    NbCardModule,
    NbRadioModule,
    NgxPaginationModule,
    NbButtonModule

  ],
  entryComponents: [NewEntryComponent]
})
export class EntryModule { }
