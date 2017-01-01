import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WpApiPosts } from '../../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements  OnChanges {
  @Input() post: any
  @Input() slug: any

  constructor(private wpApiPosts: WpApiPosts) { }

  fetchPost() {
    let urlparams = new URLSearchParams('tags=' + this.slug + '&_embed');
       let options:RequestOptionsArgs = {
        url: null,
        method: null,
        search: urlparams,
        body: null,
        withCredentials: false
      
       }

      this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post= body;
       })
  }


  ngOnChanges(): void {
   this.fetchPost();
  }

}
