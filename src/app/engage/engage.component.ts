import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-engage',
  templateUrl: './engage.component.html',
  styleUrls: ['./engage.component.css']
})
export class EngageComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
     document.querySelector('body').className = "";
     document.querySelector('body').classList.add("resources", "show");
  }

  ngOnDestroy(){
    document.querySelector('body').classList.remove("resources", "show");
  }

}
