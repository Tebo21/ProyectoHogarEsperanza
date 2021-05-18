import { Component, OnInit } from '@angular/core';
import { Actividades } from 'src/app/models/Actividades';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

  public actividadCreate: Actividades = new Actividades(0,"","","","");
  constructor(public _actividadservice: ActividadesService) { }

  ngOnInit(): void {
  }

  addActividad(): void {
    this._actividadservice.createActividad(this.actividadCreate).subscribe(res=> {
      console.log(res);
    }, err=> {
      console.log(err);
    })
  }

}
