import { ArticleDetailComponent } from './article-detail/article-detail.component'
import { Routes } from '@angular/router';

export const articleRoutes: Routes = [
  { path: 'articles/:slug', component: ArticleDetailComponent }
];
  