import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActividadesService } from '../../services/actividades.service';
import { Router } from '@angular/router';
import { TipoActividad } from 'src/app/models/TipoActividad';

@Component({
  selector: 'app-registro-actividad-coordinador',
  templateUrl: './registro-actividad-coordinador.component.html',
  styleUrls: ['./registro-actividad-coordinador.component.css']
})
export class RegistroActividadCoordinadorComponent implements OnInit {
  tipoactividad: TipoActividad[] = [];
    
    constructor( private router: Router,public tipoactividadservice: ActividadesService,public modalService: NgbModal) {
    
   }

  ngOnInit(): void {
    
  }

  mostrarTipoActividades(): void {
    this.tipoactividadservice.getAllTipos().subscribe(
      (response) => {
        this.tipoactividad = response;
        console.log(response);
        this.tipoactividadservice.open.subscribe(
          (data) => {
            console.log('Datos cargado');
          },
          (error) => console.log('No se cargaron los datos')
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarVoluntarios(): void{

  }
}
