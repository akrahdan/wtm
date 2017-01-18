import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WpApiPosts, WpApiTerms } from '../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { ClientService } from '../../services/client/client.service';
import { SeriesService } from '../../services/series/series.service';
@Component({
  selector: 'app-feature-insight',
  templateUrl: './feature-insight.component.html',
  styleUrls: ['./feature-insight.component.css']
})
export class FeatureInsightComponent implements OnChanges {
  @Input() post: any
  @Input() slug: any

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private _client: ClientService, private wpApiPosts: WpApiPosts, private _tags: WpApiTerms, private _series:SeriesService) { 
    iconRegistry.addSvgIcon(
      'arrow-next',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_arrow_forward_24px.svg'));
      this._series.isLoading = false;
  }

  fetchTag(options) {
    this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post = body;
        this._series.isLoading =false;
        console.log(this._series.isLoading)
      })
  }


  fetchPost() {
    if(this.slug){
      this._series.isLoading = true;
      console.log(this._series.isLoading)
    }
    
    const taxonomy = "tags";
    let tagId: any;

    let taxparams = new URLSearchParams('slug=' + this.slug);

    let taxoptions: RequestOptionsArgs = {
      url: null,
      method: null,
      search: taxparams,
      body: null,
      withCredentials: false

    }

    this._tags.getList(taxonomy, taxoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        for (let tag of body) {
          tagId = tag.id;

        }
        let urlparams = new URLSearchParams('tags=' + tagId + '&_embed');
        let options: RequestOptionsArgs = {
          url: null,
          method: null,
          search: urlparams,
          body: null,
          withCredentials: false

        }

        if (tagId) {
          this.fetchTag(options)
        }

      })





  }


  ngOnChanges(): void {
    console.log("I am changed")
    this.fetchPost();
  }


}
