import { Injectable } from '@angular/core';

@Injectable()
export class SeriesService {
  public current: any;
  public post: any;
  public isLoading:boolean
  constructor() { 
    this.isLoading = false;
  }

}
