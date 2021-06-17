import { Component, OnInit } from '@angular/core';
import { TipoActividad } from '../../../models/TipoActividad';
import { Router } from '@angular/router';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'app-reportes-actividades',
  templateUrl: './reportes-actividades.component.html',
  styleUrls: ['./reportes-actividades.component.css']
})
export class ReportesActividadesComponent implements OnInit {
busquedaSeleccion : number ;
selectBusqueda: number ;
_tipoactividad: TipoActividad[] = [];
_tipoactividad1: TipoActividad = new TipoActividad(0, '', '');
  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
  ) {
    
   }

  ngOnInit(): void {
    this.mostrarTipoActividades();

  }

  validarVista(){
    this.selectBusqueda = this.busquedaSeleccion;
    console.log(this.busquedaSeleccion);
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAllTipos().subscribe(
      (response) => {
        this._tipoactividad = response;
        this._actividadservice.open.subscribe(
          (data) => {
          },
          (error) => console.log(error)
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
