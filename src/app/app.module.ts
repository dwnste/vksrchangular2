import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { routing, appRoutingProviders } from './app.routes';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWS2bO7tadY3eW4uQiaU2DLjPxWVA93xM'
    }),
    InfiniteScrollModule,
    routing
  ],
  providers: [ appRoutingProviders, MapService ],
  declarations: [ AppComponent, ProfileComponent, MapComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
