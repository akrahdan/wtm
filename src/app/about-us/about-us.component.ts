import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
     document.querySelector('body').className = "";
     document.querySelector('body').classList.add("resources", "show");
  }

  ngOnDestroy(){
    document.querySelector('body').classList.remove("resources", "show");
  }

}
