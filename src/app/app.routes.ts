import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


export const APP_ROUTES: Routes = [
  { path: '', component: AppComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(APP_ROUTES);
