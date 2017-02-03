import { Component, OnInit } from '@angular/core';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { WpApiPosts } from '../../services/wp-api-angular';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  requests = [];
  featured = [];
  articleData: boolean = false;

 constructor(
    private wpApiPosts: WpApiPosts, private hero:WpApiPosts) {
    const headers = new Headers({
      'Access-Control-Allow-Headers': 'Access-Control-Request-Method, Access-Control-Request-Headers'
    });




    let featuredparams = new URLSearchParams('categories=104&_embed');
    let feoptions:RequestOptionsArgs = {
        url: null,
        method: null,
        search: featuredparams,
        body: null,
        withCredentials: false
      
    }
    
    this.hero.getList(feoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        this.featured = body;
        
      });
   
  }



  ngOnInit() {
   
  }


}
