import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { access } from 'node:fs';
import { PrimeNGConfig } from 'primeng/api';
import { ActividadesService } from './services/actividades.service';
import { Smsrequest } from './models/sms';
import { async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { timer } from 'rxjs';
import { Actividades } from './models/Actividades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  Actividadview: Actividades[] = [];

  constructor(private primengConfig: PrimeNGConfig, public actividadesService: ActividadesService,public datapipe: DatePipe) { 
  }
  sms: Smsrequest= new Smsrequest("","");

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.observableTimer();

  }

  observableTimer() {
    this.actividadesService.getAll().subscribe((res) =>{
      res.forEach(x => {
        const f=x.fechaActividad+"T"+x.horaInicio+":00";
        const prueba=new Date(f);
        prueba.setHours(prueba.getHours() - 2)
        let fecha2= this.datapipe.transform(prueba, 'yyyy-MM-dd-hh-mm');
        const source = timer(1000, 1000);
        const abc = source.subscribe(val => {
          let fecha3= this.datapipe.transform(new Date(), 'yyyy-MM-dd-hh-mm');
      // eventos que ocurren cada segundo
      
      if (fecha2==fecha3) {
        let numebersize= x.cedulaPersona.celular;
        if (numebersize.length == 10) {
            let numbersend=numebersize.slice(1); 
            let numbernew="593"+numbersend
            this.sms.number=numbernew;
            this.sms.message='Tienes una actividad pendiente en la Fundacion HOGAR ESPERANZA'+' \n'+'La actividad esta asignada para dentro de dos horas'+' \n'+'Actividad a realizar: '+ x.descripcionActividad+' \n'+'Hora de Inicio: '+ x.horaInicio +' \n'+'Hora de Finalizacion: '+ x.horaFin+' \n'+'"Este mensaje no debe ser repondido ya que se genera de forma automatica  :) "';
        }
       this.actividadesService.sendSmS(this.sms).subscribe((res)=>{ 
       }, err =>{
         console.log(err)
       })
        fecha2="";
      }
  });
       
      });
      
      
    })
      
    
  }


}
