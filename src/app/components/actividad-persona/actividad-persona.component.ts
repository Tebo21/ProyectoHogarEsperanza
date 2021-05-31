import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';

@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css'],
})
export class ActividadPersonaComponent implements OnInit {
  catalogoId: number = 0;
  PersonAsId: Personas[]=[];
  PersonId: string;

  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
    public modalService: NgbModal,
    public personaService: PersonasService
  ) {}

  ngOnInit(): void {
    this.mostrarActividades();
  }

  mostrarActividades(): void {
    this._actividadservice.getAll().subscribe(
      (response) => {
        this._actividadservice.actividades = response;

        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPersonsById(): void {
    this.personaService.getPorCedula(this.PersonId).subscribe(
      (response) => {
        this.PersonAsId = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  gotoList() {
    this.router.navigate(['/crear-actividad']);
  }
}
