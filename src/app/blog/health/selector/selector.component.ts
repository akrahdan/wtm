import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { WpApiPosts, WpApiTerms } from '../../../services/wp-api-angular';
import { SeriesService } from '../../../services/series/series.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

   private sub: any;
  private post: any;
  private posts: any;
  private tagList = [];
  private list = [];
  private selected: any;
  @Input() private current: any;

  constructor(private wpApiPosts: WpApiPosts, private _tags: WpApiTerms, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private _series:SeriesService) {
    iconRegistry.addSvgIcon(
      'svg-filter',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_filter_list_24px.svg'));
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

    let tagparams = new URLSearchParams('categories=63&per_page=100&_embed');
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
        this.posts = body.filter((item) => item.content.rendered.length > 0);
        let current = this.posts[0];
        this.current = current._embedded['wp:term'][1][0].slug;
        this._series.current = this.current;
        
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
    this.fetchSeries();
   
  }

  

}
