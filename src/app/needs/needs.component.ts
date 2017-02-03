import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.css']
})
export class NeedsComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    document.querySelector('body').className = "";
    document.querySelector('body').classList.add("resources", "show");
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove("resources", "show");
  }

}
