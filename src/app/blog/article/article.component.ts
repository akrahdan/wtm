import { Component, OnInit } from '@angular/core';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { WpApiPosts } from '../../services/wp-api-angular';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  requests = [];
  heroes = [];
  rest = [];
  articleData : boolean = false;

  constructor(
    private wpApiPosts: WpApiPosts, private hero:WpApiPosts) {
    const headers = new Headers({
      'Access-Control-Allow-Headers': 'Access-Control-Request-Method, Access-Control-Request-Headers'
    });

    let urlparams = new URLSearchParams('categories=62&_embed');
    let restparams = new URLSearchParams('per_page=16&_embed');

    let heroparams = new URLSearchParams('categories=86&_embed');
    let heroptions:RequestOptionsArgs = {
        url: null,
        method: null,
        search: heroparams,
        body: null,
        withCredentials: false
      
    }

    let restoptions:RequestOptionsArgs = {
        url: null,
        method: null,
        search: restparams,
        body: null,
        withCredentials: false
      
    }

    let options:RequestOptionsArgs = {
        url: null,
        method: null,
        search: urlparams,
        body: null,
        withCredentials: false
      
    }
    
    this.hero.getList(heroptions).toPromise()
      .then(response => response.json())
      .then(body => {
        this.heroes = body;
        console.log(this.heroes)
      });
   
    this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.requests= body;
        this.articleData = true;
        
      })


      this.wpApiPosts.getList(restoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        this.rest= body;
       
      })

  }



  ngOnInit() {
    console.log(this.requests)
  }

}
