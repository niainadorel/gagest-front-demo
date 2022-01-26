import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbMenuModule, NbDialogModule, NbPopoverModule, NbDatepickerModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CoreModule } from './@core/core.module';
import {NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);


const config: SocketIoConfig = { url: 'https://gagest.karoka.io', options: {} };
// const config: SocketIoConfig = { url: 'https://bobaapi.herokuapp.com', options: {} };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxDatatableModule,
    NbThemeModule.forRoot(),
    NbEvaIconsModule,
    HttpClientModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    CoreModule.forRoot(),
    SweetAlert2Module.forRoot(),
    SocketIoModule.forRoot(config),
    NbPopoverModule,
    LoadingBarRouterModule,
    NbDatepickerModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr_FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
