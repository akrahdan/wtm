import { Component, AfterContentInit } from '@angular/core';
import { AlertService } from './services/alert/alert.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  private 
  constructor(private _alertService: AlertService, private _tokenService: Angular2TokenService) { 
    this._tokenService.init({
      apiPath: 'http://localhost:3000',

      signInPath: 'auth/sign_in',
      signInRedirect: null,
      signInStoredUrlStorageKey: null,

      signOutPath: 'auth/sign_out',
      validateTokenPath: 'auth/validate_token',
      signOutFailedValidate: false,

      registerAccountPath: 'auth',
      deleteAccountPath: 'auth',
      registerAccountCallback: window.location.href,

      updatePasswordPath: 'auth',
      resetPasswordPath: 'auth/password',
      resetPasswordCallback: window.location.href,

      oAuthPaths: {
        github: 'auth/github'
      },
      oAuthCallbackPath: 'oauth_callback',
      oAuthWindowType: 'newWindow',

      userTypes: null,

      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    });
  }

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
