import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { WtmRoutingModule } from './app-routing.module';
import { WpApiPosts } from './services/wp-api-angular';
import { WpApiTerms } from './services/wp-api-angular';

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
import { FeatureInsightComponent } from './home/feature-insight/feature-insight.component';
import 'hammerjs';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { HeaderComponent } from './home/header/header.component';
import { SearchComponent } from './home/search/search.component';
import { InsightWidgetComponent } from './home/insight-widget/insight-widget.component';
import { FilterComponent } from './home/filter/filter.component';
import { ClientService } from './services/client/client.service';
import { TimeService } from './services/time/time.service';
import { SeriesService } from './services/series/series.service';
import { SidenavService } from './services/sidenav/sidenav.service';
import { ContentService } from './services/content/content.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { ResourceComponent } from './shared/resource/resource.component';
import { CollectionComponent } from './blog/health/collection/collection.component';
import { HealthDetailComponent } from './blog/health/health-detail/health-detail.component';
import { SelectorComponent } from './blog/health/selector/selector.component';
import { FeaturedComponent } from './shared/featured/featured.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NeedsComponent } from './needs/needs.component';
import { DialogComponent } from './home/dialog/dialog.component';
import { DisqusComponent } from './shared/disqus/disqus.component';



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
    EditAccountComponent,
    FeatureInsightComponent,
    HeaderComponent,
    SearchComponent,
    InsightWidgetComponent,
    FilterComponent,
    LoaderComponent,
    SidenavComponent,
    CarouselComponent,
    ResourceComponent,
    CollectionComponent,
    HealthDetailComponent,
    SelectorComponent,
    FeaturedComponent,
    ContactComponent,
    AboutUsComponent,
    NeedsComponent,
    DialogComponent,
    DisqusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WtmRoutingModule,
    A2tUiModule,
    MaterialModule.forRoot()
  ],
  providers: [WpApiPosts,WpApiTerms, Angular2TokenService, CustomeStripeService, AlertService, LoginGuardService, ClientService,
  TimeService, SeriesService, SidenavService, ContentService],
  entryComponents: [ DialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
