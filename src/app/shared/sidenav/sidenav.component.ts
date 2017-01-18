import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry, MdSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnChanges {
  
  @ViewChild("sidenav") sidenav:MdSidenav;
  @Input() open
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'menu-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_menu_24px.svg'));
     
  }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.open){
      this.sidenav.toggle();
      console.log("Opened");
    }
  }

}
