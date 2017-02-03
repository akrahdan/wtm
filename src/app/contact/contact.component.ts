import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
     document.querySelector('body').className = "";
     document.querySelector('body').classList.add("resources", "show");
  }

  ngOnDestroy(){
    document.querySelector('body').classList.remove("resources", "show");
  }

}
