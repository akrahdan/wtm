import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  constructor() { }

 ngOnInit() {
    document.querySelector('body').className = "";
    document.querySelector('body').classList.add('donations', 'index');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('registrations');
  }

}
