import { Pipe, PipeTransform } from '@angular/core';
import { URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import { WpApiPosts} from '../services/wp-api-angular';

@Pipe({
  name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform {
  private post:any
  private selected: any;
  
  constructor(private wpApiPosts: WpApiPosts) { }

  transform(value: any, args?: any): any {
    let slug: string = args[0]? args[0].toLocalLowerCase():null;

     let urlparams = new URLSearchParams('filter[tag]=' + slug + '&_embed');
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
      
        console.log(this.post);

       
      })
    
    
  }

}
