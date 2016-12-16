import { Component, OnInit, OnDestroy, NgZone, OnChanges, Input } from '@angular/core';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { Router } from '@angular/router';
import { paymentData } from './payments'



@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit, OnDestroy {

  private _registerData: RegisterData = <RegisterData>{};
 
  @Input() stripeurl: any;
  @Input() amount: any;



  constructor(private _tokenService: Angular2TokenService, private route: Router) {
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

  ngOnInit() {
     document.querySelector('body').className = "";
    document.querySelector('body').classList.add('donations');

  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('donations');
  }

}
