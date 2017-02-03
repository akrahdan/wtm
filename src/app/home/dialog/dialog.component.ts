import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { WpApiPosts, WpApiTerms } from '../../services/wp-api-angular';
import { SeriesService } from '../../services/series/series.service';
import { ContentService } from '../../services/content/content.service';
import { MdIconRegistry, MdDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  private sub: any;
  private post: any;
  private posts: any;
  private tagList = [];
  private list = [];
  private category: any;
  private selected: any;
  private currentComing: any;
  private currentSeries: any;
  private upcoming: any
  private filteringSeries: boolean;
  private coming: boolean
  @Input() private current: any;


  constructor(iconRegistry: MdIconRegistry, private dialogRef: MdDialogRef<DialogComponent>, sanitizer: DomSanitizer, private wpApiPosts: WpApiPosts, private _tags: WpApiTerms, private _series: SeriesService, private content: ContentService) {
    iconRegistry.addSvgIcon(
      'arrow-back',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_arrow_back_24px.svg'));
  }

  showMobileDialog() {

  }

  loadSeries(post) {
    this.selected = post;

    this._series.current = this.selected._embedded['wp:term'][1][0].slug;
    this.dialogRef.close();
  }

  fetchPost() {
    this.filteringSeries = true;
    this.coming = false;
  }

  cancelDialog() {
    if (!this.filteringSeries && !this.coming) {
      this.dialogRef.close();
    }
    this.filteringSeries = false;
    this.coming = false;
  }
  fetchComing() {
    this.filteringSeries = false;
    this.coming = true;
  }

  fetchSeries() {
    const taxonomy = "tags";
    let tagId: any;

    let taxparams = new URLSearchParams('per_page=100');

    let taxoptions: RequestOptionsArgs = {
      url: null,
      method: null,
      search: taxparams,
      body: null,
      withCredentials: false

    }

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
        this.posts = body.filter((item) => item.content.rendered.length > 0).reverse();
        let coming = body.filter((item) => item.content.rendered.length === 0).reverse();
        this.upcoming = coming;
        let upcoming = this.upcoming[0];
        let current = this.posts[0];
        this.currentComing = upcoming;
        this.currentSeries = current;
        this.selected = current;
        this.current = current._embedded['wp:term'][1][0].slug;
        this._series.current = this.current;
        this.content.bannerText = current.title.rendered;
        console.log(this.content.bannerText);

        for (let item of this.posts) {
          let slug = item._embedded['wp:term'][1][0].slug;

          if (this.tagList.indexOf(slug) === -1) {
            this.tagList.push(slug)
            this.list.push(item)
          }

        }

      })



    this._tags.getList(taxonomy, taxoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        for (let tag of body) {
          tagId = tag.id;


        }
      })

  }
  ngOnInit() {

    if (this.content.home) {
      this.fetchSeries();
    }
    document.querySelector('body').classList.add('md-dialog-is-showing')

  }



}
