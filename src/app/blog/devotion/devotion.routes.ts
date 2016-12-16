import { DevotionDetailComponent } from './devotion-detail/devotion-detail.component'
import { Routes } from '@angular/router';

export const devotionRoutes: Routes = [
  { path: 'devotions/:slug', component: DevotionDetailComponent }
];
  