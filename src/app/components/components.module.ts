import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

@NgModule({
  declarations: [AutocompleteDirective, AutocompleteComponent, UserDialogComponent, PasswordDialogComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
