import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {
  public home:boolean;
  public health: boolean;
  constructor() { 
    this.home = true;
    this.health =false;
  }

}
