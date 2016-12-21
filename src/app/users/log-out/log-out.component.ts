import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  private _output: any;

  constructor(private _tokenService: Angular2TokenService, private route: Router, private _alertService: AlertService) { 
    
  }

  // Submit Data to Backend
  onSubmit() {

    this._output = null;

    this._tokenService.signOut().subscribe(
      res => {
        this._output = res
        this._output.message = "Signed out successfully";
        this._alertService.output = this._output;
        this.route.navigate(['']);

      },
      error => {
        this._output = error
        
      }
    );
  }

  ngOnInit() {
  }

}
