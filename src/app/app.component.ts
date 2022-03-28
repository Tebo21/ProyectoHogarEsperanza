import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActividadesService } from './services/actividades.service';
import { Smsrequest } from './models/sms';
import { DatePipe } from '@angular/common';
import { timer } from 'rxjs';
import { Actividades } from './models/Actividades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true; 
  }

}
