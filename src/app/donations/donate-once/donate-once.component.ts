import { Component, OnInit } from '@angular/core';
import { CustomeStripeService, StripeData } from '../../services/stripeService/custome-stripe.service';
import { Angular2TokenService, RegisterData } from 'angular2-token';
@Component({
  selector: 'app-donate-once',
  templateUrl: './donate-once.component.html',
  styleUrls: ['./donate-once.component.css']
})
export class DonateOnceComponent implements OnInit {

  private _output: any;
 

  private _stripeData: StripeData = <StripeData>{}


  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  body: any;
  message: any;


  constructor(private _stripeService: CustomeStripeService, private _tokenService : Angular2TokenService) { 
    
     this._stripeService.init({
      apiPath: 'http://localhost:3000',
      signInPath: 'auth/sign_in',
      stripeChargePath: 'users/charge',

      validateTokenPath: 'auth/validate_token',

      signInStoredUrlStorageKey: null,
      signOutFailedValidate: false,
      signOutPath: 'auth/sign_out',

      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    })
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

      if (status === 200) {
        this._stripeData.token = response.id;

        this._output = null;

        this._stripeService.submitPayments(this._stripeData).subscribe(
          res => {
            this._stripeData = <StripeData>{};
            this._output = res;
            console.log(this._output);
          },
          error => {
            this._stripeData = <StripeData>{};
            this._output = error;
             console.log(this._output);
          }
        )



      } else {
        this.message = response.error.message;
        console.log(this.message)
      }

    });
  }


  ngOnInit() {
  }

}
