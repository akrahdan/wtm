import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { WpApiPosts } from '../../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';


@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

   private sub:any;
   private post:any;

  constructor(private wpApiPosts: WpApiPosts, private route: ActivatedRoute) { }

   ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
       let slug = params['slug'];

       let urlparams = new URLSearchParams('slug=' + slug + '&_embed');
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
        console.log(this.post)
      })


    })

  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }


}
