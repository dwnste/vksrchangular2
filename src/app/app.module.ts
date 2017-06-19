import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YaCoreModule } from 'angular2-yandex-maps/src/core/core.module.js';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, YaCoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
