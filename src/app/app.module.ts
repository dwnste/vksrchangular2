import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YaCoreModule }  from 'angular2-yandex-maps';

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
