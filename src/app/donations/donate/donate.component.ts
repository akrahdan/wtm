import { Component, OnInit, OnDestroy, NgZone, OnChanges, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { Router } from '@angular/router';
import { paymentData } from './payments';
import { AlertService } from '../../services/alert/alert.service';
import { ClientService } from '../../services/client/client.service';



@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit, OnDestroy {

  private _registerData: RegisterData = <RegisterData>{};

  private active:any;
  private temp: any;
  

  @ViewChild('mobilewrapper') wrapper:ElementRef;
  @ViewChild('subnav') subnav:ElementRef;
 
  @Input() stripeurl: any;
  @Input() amount: any;



  constructor(private _tokenService: Angular2TokenService, private route: Router, private _alertService: AlertService, private renderer:Renderer, private client: ClientService) {
    

  }
  
  selected(value){
    this.temp = value;
    
  }
  activeblock(){
    return this.active? 'block': 'none';
  }

  toggleNav(){
  
  
   this.active = !this.active;
  
  }

  ngOnInit() {
     document.querySelector('body').className = "";
     document.querySelector('body').classList.add('donations');

  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('donations');
  }

}
