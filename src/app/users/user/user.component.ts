import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private registration: any;
  private _registerData: RegisterData = <RegisterData>{};
  private _output: any;

  constructor(private _tokenService: Angular2TokenService, private route:Router) {
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


  onSubmit() {

    this._output = null;

    this._tokenService.registerAccount(this._registerData).subscribe(
      res => {
        this._registerData = <RegisterData>{};
        this._output = res;
        this.route.navigate(['donations']);
      }, error => {
        this._registerData = <RegisterData>{};
        this._output = error;
      }
    );
  }

  ngOnInit() {
    console.log(this._output);
    this.registration = document.querySelector('body').classList.add('registrations');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('registrations');
  }

}
