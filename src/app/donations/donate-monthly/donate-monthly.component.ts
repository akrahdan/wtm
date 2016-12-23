import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomeStripeService, StripeData, Card } from '../../services/stripeService/custome-stripe.service';
import { Angular2TokenService, RegisterData } from 'angular2-token';

@Component({
  selector: 'app-donate-monthly',
  templateUrl: './donate-monthly.component.html',
  styleUrls: ['./donate-monthly.component.css']
})
export class DonateMonthlyComponent implements OnInit {

  private _output: any;
 

  private _stripeData: StripeData = <StripeData>{}

  private _card: Card = <Card>{}

  body: any;
  message: any;


  constructor(private _stripeService: CustomeStripeService, private _tokenService : Angular2TokenService) { 
    
     this._stripeService.init({
      apiPath: 'http://localhost:3000',
      signInPath: 'auth/sign_in',
      stripeChargePath: 'subscription',

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


  getToken(form:FormGroup, event) {
    this.message = 'Loading...';
     
     event.preventDefault();

    (<any>window).Stripe.card.createToken({
      number: this._card.cardNumber,
      exp_month: this._card.expiryMonth,
      exp_year: this._card.expiryYear,
      cvc: this._card.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone

      if (status === 200) {
        console.log(response);
        this._stripeData.token = response.id;
        this._stripeData.amount = this._card.amount;
        this._stripeData.card_brand = response.card.brand;
        this._stripeData.card_exp_month = response.card.exp_month;
        this._stripeData.card_exp_year = response.card.exp_year;
        this._stripeData.card_last4 = response.card.last4;
       

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
      form.reset();
    });
  }


  ngOnInit() {
  }
}
