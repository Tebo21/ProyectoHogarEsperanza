import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes-actividades',
  templateUrl: './reportes-actividades.component.html',
  styleUrls: ['./reportes-actividades.component.css']
})
export class ReportesActividadesComponent implements OnInit {
busquedaSeleccion : number;
selectBusqueda: number;
  constructor() { }

  ngOnInit(): void {
    this.validarVista;
  }

  validarVista(){
    this.selectBusqueda = this.busquedaSeleccion;
    console.log(this.selectBusqueda);
  }
}
