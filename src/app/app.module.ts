import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WtmRoutingModule } from './app-routing.module';
import { WpApiModule } from './services/wp-api-angular';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NavbarComponent } from './posts/navbar/navbar.component';
import { SidebarComponent } from './posts/sidebar/sidebar.component';
import { ArticleComponent } from './blog/article/article.component';
import { DevotionComponent } from './blog/devotion/devotion.component';
import { HealthComponent } from './blog/health/health.component';
import { CdComponent } from './blog/cd/cd.component';
import { MainComponent } from './home/main/main.component';
import { BooksComponent } from './products/books/books.component';
import { DonateComponent } from './donations/donate/donate.component';
import { ArticleDetailComponent } from './blog/article/article-detail/article-detail.component';
import { DevotionDetailComponent } from './blog/devotion/devotion-detail/devotion-detail.component';
import { InsightsComponent } from './blog/insights/insights.component';
import { InsightsDetailComponent } from './blog/insights/insights-detail/insights-detail.component';
import { IsHeroPipe } from './pipes/is-hero.pipe';
import { SitePublishedPipe } from './pipes/site-published.pipe';
import { SeriesDetailComponent } from './blog/insights/series-detail/series-detail.component';
import { TagFilterPipe } from './pipes/tag-filter.pipe';
import { SeriesComponent } from './blog/insights/series/series.component';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { UserComponent } from './users/user/user.component';
import { SessionComponent } from './users/session/session.component';
import { CustomeStripeService } from './services/stripeService/custome-stripe.service';
import { DonateOnceComponent } from './donations/donate-once/donate-once.component';
import { DonateMonthlyComponent } from './donations/donate-monthly/donate-monthly.component';
import { EngageComponent } from './engage/engage.component';
import { AlertMessageComponent } from './shared/alert-message/alert-message.component';
import { AlertService } from './services/alert/alert.service';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { NewPasswordComponent } from './users/new-password/new-password.component';
import { LogOutComponent } from './users/log-out/log-out.component';
import { AccountComponent } from './users/account/account.component';
import { HistoryComponent } from './users/account/history/history.component';
import { HistoryMonthlyComponent } from './users/account/history-monthly/history-monthly.component';
import { EditAccountComponent } from './users/account/edit-account/edit-account.component';
import { LoginGuardService } from './users/account/login-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    NavbarComponent,
    SidebarComponent,
    ArticleComponent,
    DevotionComponent,
    HealthComponent,
    CdComponent,
    MainComponent,
    BooksComponent,
    DonateComponent,
    ArticleDetailComponent,
    DevotionDetailComponent,
    InsightsComponent,
    InsightsDetailComponent,
    IsHeroPipe,
    SitePublishedPipe,
    SeriesDetailComponent,
    TagFilterPipe,
    SeriesComponent,
    UserComponent,
    SessionComponent,
    DonateOnceComponent,
    DonateMonthlyComponent,
    EngageComponent,
    AlertMessageComponent,
    ChangePasswordComponent,
    NewPasswordComponent,
    LogOutComponent,
    AccountComponent,
    HistoryComponent,
    HistoryMonthlyComponent,
    EditAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WtmRoutingModule,
    A2tUiModule,
    WpApiModule.initializeApp({
      baseUrl: "https://whitethroneministries.com/wp-json/",
      namespace: '/wp/v2' // (optional, default: '/wp/v2')
    })
  ],
  providers: [ Angular2TokenService, CustomeStripeService, AlertService, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
