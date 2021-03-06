import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ArticleComponent } from './blog/article/article.component';
import { DevotionComponent } from './blog/devotion/devotion.component';
import { HealthComponent } from './blog/health/health.component';
import { InsightsComponent } from './blog/insights/insights.component';
import { MainComponent } from './home/main/main.component';
import { BooksComponent } from './products/books/books.component';
import { articleRoutes } from './blog/article/article.routes';
import { devotionRoutes } from './blog/devotion/devotion.routes';
import { insightsRoutes } from './blog/insights/insights.routes';
import { donateRoutes } from './donations/donate.routes';
import { userRoutes } from './users/user/user.routes';
import { sessionRoutes } from './users/session/session.routes';
import { newPasswordRoutes } from './users/new-password/new-password.routes';
import { engageRoutes } from './engage/engage.routes';
import { changePasswordRoutes } from './users/change-password/change-password.routes';
import { logOutRoutes } from './users/log-out/logout.routes';
import { accountRoutes } from './users/account/account.routes';
import { healthRoutes } from './blog/health/health.routes';
import {AboutUsComponent } from './about-us/about-us.component';
import {NeedsComponent } from './needs/needs.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'articles',
    component: ArticleComponent

  },
  {
    path: 'devotions',
    component: DevotionComponent
  },
  {
    path: 'insights',
    component: InsightsComponent
  },

  {
    path: 'health',
    component: HealthComponent

  },
  {
    path: 'about-us',
    component: AboutUsComponent

  },

  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'needs',
    component: NeedsComponent

  },
  

  ...articleRoutes,
  ...devotionRoutes,
  ...insightsRoutes,
  ...donateRoutes,
  ...userRoutes,
  ...sessionRoutes,
  ...engageRoutes,
  ...newPasswordRoutes,
  ...changePasswordRoutes,
  ...logOutRoutes,
  ...accountRoutes,
  ...healthRoutes


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class WtmRoutingModule { }