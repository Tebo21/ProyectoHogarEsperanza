import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/models/Actividades';
import { TipoActividad } from 'src/app/models/TipoActividad';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

  public fecha: Date =  new Date();
  public tipo:Array<string> =  new Array();
  public actividadCreate: Actividades = new Actividades(0,"",this.fecha,"",this.tipo);
  public id : number;

  constructor(private router: Router, public _actividadservice: ActividadesService) { }

  ngOnInit(): void {
  }

  addActividad(): void {
    var d = new Date();
    this.fecha.getUTCDate;
    this.id=(d.getDate()*d.getDay()*d.getFullYear()*d.getHours()*d.getSeconds());
    console.log(this.id);
    this.actividadCreate.idActividadPersona =this.id;
    console.log(this.actividadCreate)
    this._actividadservice.createActividad(this.actividadCreate).subscribe(res=> {
      console.log(res);
    }, err=> {
      console.log(err);
    })
    this.gotoList();
  }
  gotoList() {
    this.router.navigate(['/actividades']);
  }





}
