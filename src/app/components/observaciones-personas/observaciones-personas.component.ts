import { Component, OnInit } from '@angular/core';
import { ObservacionesPersonas } from 'src/app/models/observaciones-personas';
import { ObservacionesPersonasService } from 'src/app/services/observaciones-personas.service';

@Component({
  selector: 'app-observaciones-personas',
  templateUrl: './observaciones-personas.component.html',
  styleUrls: ['./observaciones-personas.component.css']
})
export class ObservacionesPersonasComponent implements OnInit {
  notasObservaciones: ObservacionesPersonas=new ObservacionesPersonas()
  datos:any=[];
  constructor(private Obserserivce:ObservacionesPersonasService) { }
  
  ngOnInit(): void {
    this.listaObservaciones();
  }


  guardarObservaciones(){
    var  fecha =new  Date()
    console.log(fecha)
    this.notasObservaciones.cedulaPersona="0106771165"
    this.notasObservaciones.fechaRegistro="2021-02-02";
    console.log(this.notasObservaciones)
    this.Obserserivce.postObservacion(this.notasObservaciones).subscribe(data =>{
      console.log("observaciones registradas")
    });
    this.listaObservaciones();
  }

  listaObservaciones(){
    this.notasObservaciones.cedulaPersona="0106771165"
    console.log(this.notasObservaciones.cedulaPersona);
    this.Obserserivce.getBycedula(this.notasObservaciones.cedulaPersona).subscribe(data =>{
     console.log(data);
     console.log(this.datos)
    })
  }

}
