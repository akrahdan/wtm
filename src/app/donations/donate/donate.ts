import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { Router } from '@angular/router';
import { paymentData } from './payments'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit, OnDestroy {

  private _registerData: RegisterData = <RegisterData>{};
  private _output: any;
  private url = "http://localhost:3000/users/";
  private _paymentData: paymentData = <paymentData>{};

  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  amount: any;
  body: any

  message: string;



  constructor(private _tokenService: Angular2TokenService, private route: Router, private _zone: NgZone, private http:Http) {
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


  getToken() {
    this.message = 'Loading...';

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message =response.card.id;
          console.log(this.message)
          var url = this.url + this.amount + "/" + this.message;
          console.log(url);

          this.donate(url)
          console.log('hello World')
        
        } else {
          this.message = response.error.message;
          console.log(this.message)
        }
      });
    });
  }

  donate(url) {
    return this.http.get(url)
            .map((res:Response) => 
            {
              var body = res.json()
              console.log(body);
               
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
          
  }
  ngOnInit() {
    document.querySelector('body').classList.add('donations');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('donations');
  }

}
