import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WpApiPosts, WpApiTerms } from '../../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnChanges {
  @Input() post: any
  @Input() slug: any

  constructor(private wpApiPosts: WpApiPosts, private _tags: WpApiTerms) { }


  fetchTag(options) {
    this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post = body;
      })
  }


  fetchPost() {

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
    this.fetchPost();
  }

}
