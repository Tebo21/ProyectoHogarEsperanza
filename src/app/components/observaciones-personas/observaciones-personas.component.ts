import { Component, OnInit } from '@angular/core';
import { ObservacionesPersonas } from 'src/app/models/observaciones-personas';
import { ObservacionesPersonasService } from 'src/app/services/observaciones-personas.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-observaciones-personas',
  templateUrl: './observaciones-personas.component.html',
  styleUrls: ['./observaciones-personas.component.css']
})
export class ObservacionesPersonasComponent implements OnInit {
  notasObservaciones: ObservacionesPersonas=new ObservacionesPersonas()
  datos:any=[];
  fechaActual = new Date();
  cedula_persona:string = localStorage.getItem('cedulalocalstorage');
  constructor(private Obserserivce:ObservacionesPersonasService) { }
  
  ngOnInit(): void {
    this.listaObservaciones();
  }


  guardarObservaciones(){
    let mes = this.fechaActual.getMonth()+1
    let fechahoy = this.fechaActual.getFullYear()+"/"+mes+"/"+this.fechaActual.getDate();
    let fechaActual2 = new Date(fechahoy);
    let fecha= formatDate(fechaActual2, 'yyyy-MM-dd ', 'en-ECU', '+0593');
    this.notasObservaciones.cedulaPersona=this.cedula_persona
    this.notasObservaciones.fechaRegistro=fecha+"";
    console.log(this.notasObservaciones)
    this.Obserserivce.postObservacion(this.notasObservaciones).subscribe(data =>{
      console.log("observaciones registradas")
    });
    this.listaObservaciones();
    this.notasObservaciones.descripcionobservacion=""
  }

  listaObservaciones(){
    this.notasObservaciones.cedulaPersona=this.cedula_persona
    console.log(this.notasObservaciones.cedulaPersona);
    this.Obserserivce.getBycedula(this.notasObservaciones.cedulaPersona).subscribe(data =>{
     console.log(data);
     console.log(this.datos)
    })
  }

}
