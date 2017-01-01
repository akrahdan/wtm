import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeService {
  currentDate:any
  constructor() {
     this.currentDate = new Date();
   }

}
