import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { WpApiPosts, WpApiTerms } from '../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import * as _ from "lodash";
import { ClientService } from '../../services/client/client.service';
import { TimeService } from '../../services/time/time.service';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { SeriesService } from '../../services/series/series.service';
import { ContentService } from '../../services/content/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private pageTitle: any;
  private pageSubTitle: any;
  private backgroundImage: any;
  private enableSearch: boolean;
  private enableScrollOpacity: boolean;
  private bodyScroll: number;
  private shareConfig: any;
  private isHomePage: boolean;
  private pageLayout: string;
  private storyPromise: any;
  private parentStoryId: any;
  private contentOverlap: any;
  private backColor: any;
  private imageLoaded: boolean;
  private showShadow: boolean;
  private hideHeaderContent: boolean;
  private isDesktopWidth: boolean;
  private imageOpacityPercentage: any
  private bottomMargin: any
  private bannerText:any
  private blockButtonsInHeaderOnScroll: boolean;
  private exploreheader:boolean;
  private post:any
  private current: any

  private oi = {
    EMPTY_STORY: "EMPTY_STORY",
    YEAR_IN_SEARCH_2015_HUB: "YEAR_IN_SEARCH_2015_HUB",
    YEAR_IN_SEARCH_2016_HUB: "YEAR_IN_SEARCH_2016_HUB",
    YEAR_IN_SEARCH_2015_STORY: "YEAR_IN_SEARCH_2015_STORY",
    OLYMPICS_2016_HUB: "OLYMPICS_2016_HUB",
    OLYMPICS_2016_STORY: "OLYMPICS_2016_STORY",
    OLYMPICS_2016_GOOBERS: "OLYMPICS_2016_GOOBERS",
    OLYMPICS_2016_FEATURED_STORIES: "OLYMPICS_2016_FEATURED_STORIES",
    ELECTIONS_2016_HUB_PRESIDENT: "ELECTIONS_2016_HUB_PRESIDENT",
    ELECTIONS_2016_HUB_VP: "ELECTIONS_2016_HUB_VP",
    ELECTIONS_2016_HUB_TICKET: "ELECTIONS_2016_HUB_TICKET",
    ELECTIONS_2016_CANDIDATE_STORY: "ELECTIONS_2016_CANDIDATE_STORY",
    ELECTIONS_2016_STATE_STORY: "ELECTIONS_2016_STATE_STORY"
  };


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.pageLayout = this.oi.YEAR_IN_SEARCH_2015_STORY;
    let host = this.header.nativeElement.offsetHeight;
    console.log(host)
    this.bodyScroll = this.getPageYOffset_();
    this.isDesktopWidth = this.getIsDesktopMode_();
    let topheight = this.topbar.nativeElement.offsetHeight;
    var header = host - (this.isDesktopWidth ? topheight : this.contentOverlap)
    host && (this.showShadow = host - topheight <= this.bodyScroll);
    this.hideHeaderContent = this.isHideHeaderContent_(this, host);
    121 >= host && host && (header = host - 9,
      this.showShadow = host - 9 <= this.bodyScroll);

    host = this.contentOverlap / header * this.bodyScroll;
    this.imageOpacityPercentage = this.bodyScroll / header;
    this.bottomMargin = host < this.contentOverlap ? host : this.contentOverlap;

   

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.client.onResize_();
  }

  @ViewChild("topbar") topbar
  @ViewChild("header") header:ElementRef

  constructor(private client: ClientService, private elRef: ElementRef, private _time: TimeService, private _sidenav:SidenavService, private _loader: SeriesService, private content: ContentService, private renderer: Renderer, private wpApiPosts: WpApiPosts, private _tags: WpApiTerms,) {
    this.imageLoaded = !1;
    this.showShadow = !1;
    this.hideHeaderContent = !1;
    this.blockButtonsInHeaderOnScroll = !0;

    _.defaults(this, {
      bodyScroll: 0,
      contentOverlap: 47,
      enableSearch: !0,
      enableScrollOpacity: !1,
      bottomMargin: 0,
      imageOpacityPercentage: 0


    })

    
  }

  fetchInitData() {
    let tagparams = new URLSearchParams('categories=57&per_page=100&_embed');
    let tagoptions: RequestOptionsArgs = {
      url: null,
      method: null,
      search: tagparams,
      body: null,
      withCredentials: false


    }


    this.wpApiPosts.getList(tagoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post = body.filter((item) => item.content.rendered.length > 0);
        this.post = this.post.reverse();
        let current = this.post[0];
       
        this.current = current;
        this.bannerText = this.current.title.rendered;
       

      })

  }




  getIsDesktopMode_() {
    return this.client.isDesktopMode
  }
  getPageYOffset_() {
    var a = (<any>window).pageYOffset;
    1 === a && (a = 0);
    return a
  }

  isHideHeaderContent_(a, b) {
    var layout = this.pageLayout;
    var d = this.oi



    return a.bodyScroll > (layout === d.YEAR_IN_SEARCH_2015_STORY || layout === d.YEAR_IN_SEARCH_2015_HUB ? b / 6 : 0)
  }
  ngOnInit() {
   
   this.fetchInitData()
    
  }

  ngOnDestroy(){
    
  }

}
