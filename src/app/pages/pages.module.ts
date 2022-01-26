import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbLayoutModule, NbSidebarModule, NbMenuModule, NbSidebarService,
  NbIconModule, NbUserModule, NbActionsModule, NbSpinnerModule,
  NbDialogModule, NbInputModule, NbButtonModule, NbPopoverModule, NbTabsetModule, NbCardModule, NbSelectModule, NbToggleModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CartSidebarComponent } from './products/cart-sidebar/cart-sidebar.component';
import { UserDialogComponent } from '../components/user-dialog/user-dialog.component';
import { PasswordDialogComponent } from '../components/password-dialog/password-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NotificationComponent } from './notification/notification.component';

const config = {
  autoFocus: true,
  closeOnEsc: true,
  closeOnBackdropClick: false,
};

@NgModule({
  declarations: [PagesComponent, CartSidebarComponent, UserDialogComponent, PasswordDialogComponent, NotificationComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule,
    NbUserModule,
    NbActionsModule,
    NbInputModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbDialogModule.forChild(config),
    SweetAlert2Module,
    NbPopoverModule,
    NbTabsetModule,
    NbCardModule,
    NbToggleModule,
    NbSelectModule
  ],
  providers: [NbSidebarService],
  entryComponents: [UserDialogComponent, PasswordDialogComponent]
})
export class PagesModule { }
