import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ArticleComponent } from './blog/article/article.component';
import { DevotionComponent} from './blog/devotion/devotion.component';
import { InsightsComponent} from './blog/insights/insights.component';
import { MainComponent }  from './home/main/main.component';
import { BooksComponent } from './products/books/books.component';
import { articleRoutes } from './blog/article/article.routes';
import { devotionRoutes } from './blog/devotion/devotion.routes';
import { insightsRoutes } from './blog/insights/insights.routes';
import { donateRoutes} from './donations/donate.routes';
import { userRoutes } from './users/user/user.routes';
import { sessionRoutes } from './users/session/session.routes';
import { engageRoutes } from './engage/engage.routes'

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
    path: 'products/books',
    component: BooksComponent
   
  },
  
    ...articleRoutes,
    ...devotionRoutes,
    ...insightsRoutes,
    ...donateRoutes,
    ...userRoutes,
    ...sessionRoutes,
    ...engageRoutes
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class WtmRoutingModule { }