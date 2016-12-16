import { InsightsDetailComponent } from './insights-detail/insights-detail.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { Routes } from '@angular/router';

export const insightsRoutes: Routes = [
  { path: 'series/:slug', component: InsightsDetailComponent },
  { path: 'series/:tag/:slug', component: SeriesDetailComponent }
];
  