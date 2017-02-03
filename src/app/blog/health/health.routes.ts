import { HealthDetailComponent } from './health-detail/health-detail.component';
import { Routes } from '@angular/router';

export const healthRoutes: Routes = [
  { path: 'health/:tag/:slug', component: HealthDetailComponent }
];