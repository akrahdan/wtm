import { Component, AfterContentInit } from '@angular/core';
import { AlertService } from './services/alert/alert.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  private 
  constructor(private _alertService: AlertService) { }

  ngAfterContentInit() {
    console.log((<any>window).$);
    var refTagger = {
      settings: {
        bibleVersion: 'ESV'
      }
    };
    (function (d, t) {
      var g = <HTMLSourceElement> document.createElement(t),
        s = d.getElementsByTagName(t)[0];
      g.src = '//api.reftagger.com/v2/RefTagger.js';
      g.id = 'reftagger';
      document.body.appendChild(g);
      
    } (document, 'script'));

  }
}
