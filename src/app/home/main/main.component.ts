import { Component, OnInit , OnChanges, OnDestroy} from '@angular/core';

import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { WpApiPosts } from '../../services/wp-api-angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  requests = [];
  heroe = [];
  articleData : boolean = false;

  constructor(
    private wpApiPosts: WpApiPosts, private hero:WpApiPosts) {
     this.fetchPost();
  }
   
   fetchPost() {
     const headers = new Headers({
    
      'Access-Control-Allow-Headers': 'Access-Control-Request-Method, Access-Control-Request-Headers'
      
    });

    let urlparams = new URLSearchParams('per_page=12&_embed');

    let heroparams = new URLSearchParams('filter[category_name]=hero&_embed');
    let heroptions:RequestOptionsArgs = {
        url: null,
        method: null,
        search: heroparams,
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
        this.heroe = body;
        console.log(this.heroe)
      });
   
    this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.requests= body;
        this.articleData = true;
        
      })

   }

 ngOnChanges() {
   this.fetchPost()
 }
  ngOnInit() {
  }

  ngOnDestroy() {
   this.requests = [];
   this.heroe = [];
  }

}
