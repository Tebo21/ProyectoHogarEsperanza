import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';


@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css']
})
export class ActividadPersonaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoList() {
    this.router.navigate(['/crear-actividad']);
  }

}
