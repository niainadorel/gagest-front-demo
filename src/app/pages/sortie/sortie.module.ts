import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NbIconModule, NbSpinnerModule, NbDialogModule, NbCardModule, NbInputModule, NbRadioModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


import { SortieRoutingModule } from './sortie-routing.module';
import { SortieComponent } from './sortie.component';
import { NewSortieComponent } from './new-sortie/new-sortie.component';
import { ExportAsModule } from 'ngx-export-as';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
};
@NgModule({
  declarations: [SortieComponent, NewSortieComponent],
  imports: [
    CommonModule,
    SortieRoutingModule,
    NgxDatatableModule,
    NbIconModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(config),
    NbCardModule,
    NbRadioModule,
    NgxPaginationModule,
    ExportAsModule,
    AutocompleteLibModule,
  ],
  entryComponents: [NewSortieComponent]
})
export class SortieModule { }
