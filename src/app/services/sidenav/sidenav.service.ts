import { Injectable } from '@angular/core';

@Injectable()
export class SidenavService {
  public opened: boolean;
  constructor() { }
  toggle(){
   this.opened = !this.opened;
  }
}
