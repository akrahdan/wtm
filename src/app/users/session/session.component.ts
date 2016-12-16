import { Component, OnInit, OnDestroy,Input, OnChanges } from '@angular/core';
import { Angular2TokenService, SignInData } from 'angular2-token';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy, OnChanges {

  private _signInData: SignInData = <SignInData>{};
  @Input() _output: any;

  constructor(private _tokenService: Angular2TokenService, private route: Router, private _alertService: AlertService) {

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

  // Submit Data to Backend
  onSubmit() {

    this._output = null;

    this._tokenService.signIn(this._signInData).subscribe(
      res => {
        this._signInData = <SignInData>{};
        this._output = res;
        this.route.navigate(['donations']);
      }, error => {
        this._signInData = <SignInData>{};
        this._output = error;
      }
    );
  }

  ngOnChanges() {
    this._alertService = this._output;
  }

  ngOnInit() {
    document.querySelector('body').classList.add('sessions');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('sessions');
  }


}
