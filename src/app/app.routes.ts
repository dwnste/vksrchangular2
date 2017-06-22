import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component'
import { ProfileComponent } from './profile/profile.component';


export const APP_ROUTES: Routes = [
  {
    path: '',
    component: MapComponent
  },
  { path: 'profile',
    component: ProfileComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
