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
export class InsightsDetailComponent implements OnInit, OnDestroy{

   private sub:any;
   private post:any;
   private posts:any;
   private tagList = [];
   private list =[];
   private selected:any;
   private current:any;

  constructor(private wpApiPosts: WpApiPosts, private tags: WpApiTerms, private route: ActivatedRoute) { }
   
   fetchPost() {
     this.sub = this.route.params.subscribe(params =>{
       let slug = params['slug'];
       this.selected = slug;
       
       let urlparams = new URLSearchParams('filter[tag]=' + slug + '&_embed');
       let options:RequestOptionsArgs = {
        url: null,
        method: null,
        search: urlparams,
        body: null,
        withCredentials: false
      
       }

       
      let tagparams = new URLSearchParams('filter[category_name]=insights&per_page=75&_embed');
      let tagoptions:RequestOptionsArgs = {
        url: null,
        method: null,
        search: tagparams,
        body: null,
        withCredentials: false
      
      }

      this.wpApiPosts.getList(options).toPromise()
      .then(response => response.json())
      .then(body => {
        this.post= body;
        for (let item of this.post){
           let slug = item._embedded['wp:term'][1][0].slug;
          
          if (this.selected === slug){
            this.current = item._embedded['wp:term'][1][0].slug;
            
          }
        }

        console.log(this.post);

       
      })


      this.wpApiPosts.getList(tagoptions).toPromise()
      .then(response => response.json())
      .then(body => {
        this.posts= body.filter((item)=>item.content.rendered.length >0);
        

        for (let item of this.posts){
           let slug = item._embedded['wp:term'][1][0].slug;
           
          if(this.tagList.indexOf(slug)=== -1){
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
