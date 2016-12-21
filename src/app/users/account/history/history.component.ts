import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  constructor() { }

 ngOnInit() {
    document.querySelector('body').className = "";
    document.querySelector('body').classList.add('donations', 'index');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('donations', 'index');
  }
}
