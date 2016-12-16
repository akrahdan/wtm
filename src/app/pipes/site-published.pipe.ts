import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sitePublished'
})
export class SitePublishedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter((item)=> item.excerpt.rendered != null)
  }

}
