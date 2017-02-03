import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {
  public home:boolean;
  public health: boolean;
  public pageSubTitle: boolean;
  public isExplore:boolean;
  public subTitle:any;
  public bannerText: any
  constructor() { 
    this.home = false;
    this.health =false;
  }

}
