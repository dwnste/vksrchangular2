import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';

import { ProfileService } from './profile/profile.service'
import { MapService } from './map/map.service';

import { routing, appRoutingProviders } from './app.routes';

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
  providers: [ appRoutingProviders, MapService, ProfileService ],
  declarations: [ AppComponent, ProfileComponent, MapComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
