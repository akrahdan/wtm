import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import { AlertService } from '../../services/alert/alert.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  private _updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  private _output: any;

  constructor(private _tokenService: Angular2TokenService, private _route: Router, private _alertService: AlertService) { 
   

  }

  // Submit Data to Backend
  onSubmit(changePasswordForm:any,  event) {
     event.preventDefault();

    this._output = null;

    this._tokenService.updatePassword(this._updatePasswordData).subscribe(
      res => {
        this._updatePasswordData = <UpdatePasswordData>{};
        this._output = res;
        this._output.message = "Your password was changed successfully. You're now logged in"
        this._alertService.output = this._output;
        
        this._route.navigate(['donations']);
      }, error => {
        this._updatePasswordData = <UpdatePasswordData>{};
        this._output = error;
        console.log(this._output);
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
