import { Component, OnInit, OnDestroy,Input, OnChanges } from '@angular/core';
import { Angular2TokenService, SignInData } from 'angular2-token';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {

  private _signInData: SignInData = <SignInData>{};
  private _output: any;

  constructor(private _tokenService: Angular2TokenService, private route: Router, private _alertService: AlertService) {

    
  }

  // Submit Data to Backend
  onSubmit() {

    this._output = null;

    this._tokenService.signIn(this._signInData).subscribe(
      res => {
        this._signInData = <SignInData>{};

        this._output = res;
        this._output.message = "You signed in successfully";
        this._alertService.output = this._output;
        console.log(this._output);
        this.route.navigate(['donations']);
      }, error => {
        this._signInData = <SignInData>{};
        this._output = error;
        this._alertService.output = this._output;
      }
    );
  }

 
  ngOnInit() {
    document.querySelector('body').classList.add('sessions');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('sessions');
  }


}
