import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isHero'
})
export class IsHeroPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter((item)=> item._embedded['wp:term'][0][0].name !='HERO' )
  }

}
