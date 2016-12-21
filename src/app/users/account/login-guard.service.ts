import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { AlertService } from '../../services/alert/alert.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  private _output: any;
  constructor(private _tokenService: Angular2TokenService, private _route:Router, private _alertService: AlertService ) { 
    
  }

  canActivate(){
    if(this._tokenService.canActivate()){
      return true
    }
    this._output = {};
    this._output.message = "Kindly log in or sign up before continuing";
    this._alertService.output = this._output;
    this._route.navigate(['/users/sign-in']);
    return false;
       
  }

}
