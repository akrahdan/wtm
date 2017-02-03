import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import { AlertService } from '../../../services/alert/alert.service';
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit, OnDestroy {
  private _updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  private _output: any;


  constructor(private _tokenService: Angular2TokenService, private _alertService: AlertService) { }
  
  onSubmit(){
    this._output = null;

    this._tokenService.updatePassword(this._updatePasswordData).subscribe(
      res => {
        this._updatePasswordData = <UpdatePasswordData>{};
        this._output = res;
        this._output.message = "Your updates were successful"
        this._alertService.output = this._output;
        
       
      }, error => {
        this._updatePasswordData = <UpdatePasswordData>{};
        this._output = error;
        console.log(this._output);
      }
    );
  }


  ngOnInit() {
    document.querySelector('body').className = "";
    document.querySelector('body').classList.add('registrations', 'edit');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('registrations', 'edit');
  }

}
