import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  
  @Input() loading:boolean;
  
  constructor(private _client:ClientService) { }

  ngOnInit() {
    document.querySelector('body').style.backgroundColor="#eee";
  }

}
