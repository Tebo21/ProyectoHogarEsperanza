import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';


@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css']
})
export class ActividadPersonaComponent implements OnInit {

  constructor(private router: Router,public _actividadservice: ActividadesService) { }

  ngOnInit(): void {
    this.mostrarActividades();
  }


  mostrarActividades(): void {
    this._actividadservice.getAll().subscribe(
      response => {
       this._actividadservice.actividades=response;

        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
  gotoList() {
    this.router.navigate(['/crear-actividad']);
  }

}
