import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { WpApiPosts, WpApiTerms } from '../../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';


@Component({
  selector: 'app-insights-detail',
  templateUrl: './insights-detail.component.html',
  styleUrls: ['./insights-detail.component.css']
})
export class InsightsDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  private post: any;
  private posts: any;
  private tagList = [];
  private list = [];
  private selected: any;
  private current: any;


  constructor(private wpApiPosts: WpApiPosts, private _tags: WpApiTerms, private route: ActivatedRoute) { }

  fetchTag(options) {
    this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post = body;
        for (let item of this.post) {
          let slug = item._embedded['wp:term'][1][0].slug;

          if (this.selected === slug) {
            this.current = item._embedded['wp:term'][1][0].slug;

          }
        }




      })
  }

  fetchPost() {
    this.sub = this.route.params.subscribe(params => {
      const taxonomy = "tags";
      let tagId: any;
      let slug = params['slug'];
      this.selected = slug;



      let taxparams = new URLSearchParams('slug=' + slug);

      let taxoptions: RequestOptionsArgs = {
        url: null,
        method: null,
        search: taxparams,
        body: null,
        withCredentials: false

      }


      let tagparams = new URLSearchParams('categories=57&per_page=75&_embed');
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

          let current = this.posts[0];
          this.current = current._embedded['wp:term'][1][0].slug;
          for (let item of this.posts) {
            let slug = item._embedded['wp:term'][1][0].slug;

            if (this.tagList.indexOf(slug) === -1) {
              this.tagList.push(slug)
              this.list.push(item)
            }

          }

        })






    })



  }
  ngOnInit() {
    this.fetchPost();
  }


  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

}
