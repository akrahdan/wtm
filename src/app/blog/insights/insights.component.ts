import { Component, OnInit } from '@angular/core';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { WpApiPosts } from '../../services/wp-api-angular';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  series = [];
  heroes = [];
  rest = [];
  articleData : boolean = false;

  constructor(
    private wpApiPosts: WpApiPosts, private hero:WpApiPosts) {
    const headers = new Headers({
      'Access-Control-Allow-Headers': 'Access-Control-Request-Method, Access-Control-Request-Headers'
    });

    let urlparams = new URLSearchParams('categories=101&per_page=40&_embed');
    let restparams = new URLSearchParams('per_page=16&_embed');

    let heroparams = new URLSearchParams('categories=82&per_page=1&_embed');
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
        let content = body.filter((item)=> item.content.rendered.length > 0)
        this.series= content;
       console.log(this.series)
        
      })


      this.wpApiPosts.getList(restoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        let content = body.filter((item)=>item.content.rendered.length === 0)
        this.rest= content;
        console.log(this.rest)
       
      })

  }



  ngOnInit() {
    console.log(this.series)
  }


}
