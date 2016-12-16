import { DonateComponent } from './donate/donate.component';
import { DonateOnceComponent } from './donate-once/donate-once.component';
import { DonateMonthlyComponent } from './donate-monthly/donate-monthly.component';
import { Routes } from '@angular/router';

export const donateRoutes: Routes = [
  {
    path: 'donations', component: DonateComponent,

    children: [
      {
        path: '', component: DonateOnceComponent
      },
      {
        path: 'monthly', component: DonateMonthlyComponent
      }
    ]
  },

];
