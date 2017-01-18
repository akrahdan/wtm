import { InsightsDetailComponent } from '../../blog/insights/insights-detail/insights-detail.component';
import { SeriesDetailComponent } from '../../blog/insights/series-detail/series-detail.component';
import { Routes } from '@angular/router';

export const carouselRoutes: Routes = [
  { path: 'series/:slug', component: InsightsDetailComponent },
  { path: 'series/:tag/:slug', component: SeriesDetailComponent }
];
  