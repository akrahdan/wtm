import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, ResetPasswordData } from 'angular2-token';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  private _resetPasswordData = <ResetPasswordData>{};
  private _output: any;

  constructor(private _tokenService: Angular2TokenService, private _route: Router, private _alertService: AlertService) {
    
  }


  onSubmit() {
    this._output = null;

    this._tokenService.resetPassword(this._resetPasswordData).subscribe(
      res => {
        this._resetPasswordData = <ResetPasswordData>{};
        this._output = res;
        this._output.message = "Instrucntions on how to reset your password has been sent to your email";
        this._alertService.output = this._output;
        
        this._route.navigate(['users/sign-in']);
      }, error => {
        this._resetPasswordData = <ResetPasswordData>{};
        this._output = error;
      }
    );
  }
  ngOnInit() {
    document.querySelector('body').className = "";
    document.querySelector('body').classList.add('passwords');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('passwords');
  }
}
