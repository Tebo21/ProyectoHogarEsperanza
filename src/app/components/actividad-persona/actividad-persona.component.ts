import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbCalendarGregorian, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';

@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css'],
})
export class ActividadPersonaComponent implements OnInit {
  catalogoId: number = 0;
  Person: Personas = new Personas();
  PersonAsId: Personas[]=[];
  PersonId: string;

   dia = new NgbCalendarGregorian().getToday().day;
   mes = new NgbCalendarGregorian().getToday().month;
   year = new NgbCalendarGregorian().getToday().year;
  fecha : string = this.dia+"/"+this.mes+"/"+this.year;
  fecha1 : string = this.fecha;

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
    console.log(this.PersonId);
    this.personaService.getPorCedula(this.PersonId).subscribe(
      (response) => {
        this.Person = response;
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
