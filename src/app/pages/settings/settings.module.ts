import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { NbAccordionModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NbAccordionModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule
  ]
})
export class SettingsModule { }
