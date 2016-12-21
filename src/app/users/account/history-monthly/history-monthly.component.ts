import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-history-monthly',
  templateUrl: './history-monthly.component.html',
  styleUrls: ['./history-monthly.component.css']
})
export class HistoryMonthlyComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    document.querySelector('body').className = "";
    document.querySelector('body').classList.add('subscriptions', 'index');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('subscriptions', 'index');
  }

}
