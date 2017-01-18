import { Component, OnInit } from '@angular/core';
import { WpApiPosts}  from '../../services/wp-api-angular';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  private resource:any;

  constructor( private wpApi: WpApiPosts) { 
    this.fetchPosts();
  }

  fetchPosts(){
    let urlparams = new URLSearchParams('per_page=4&_embed');
   
    let options: RequestOptionsArgs = {
      url: null,
      method: null,
      search: urlparams,
      body: null,
      withCredentials: false

    }

    this.wpApi.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.resource = body;
       

      })

  }

  ngOnInit() {
    this.fetchPosts();
  }

}
