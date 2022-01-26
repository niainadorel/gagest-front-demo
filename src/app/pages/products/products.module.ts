import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
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
  NbCheckboxModule,
  NbTooltipModule,

} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './products.component';
import { NewProductsDialogComponent } from './new-products-dialog/new-products-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { DetailsComponent } from './details/details.component';
import { CategoriesModaleComponent } from './categories-modale/categories-modale.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxBarcodeModule } from 'ngx-barcode';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SharedModule } from 'src/app/@shared/shared.module';

const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: true,
};
@NgModule({
  declarations: [
    ProductsComponent,
    NewProductsDialogComponent,
    CategoriesComponent,
    DetailsComponent,
    CategoriesModaleComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
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
    NbTooltipModule,
    NgxBarcodeModule.forRoot(),
    AutocompleteLibModule,
    SharedModule
  ],
  entryComponents: [NewProductsDialogComponent, CategoriesModaleComponent]

})
export class ProductsModule { }
