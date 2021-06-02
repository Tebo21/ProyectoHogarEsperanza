import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbCalendarGregorian, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';
import { Actividades } from 'src/app/models/Actividades';

@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css'],
})
export class ActividadPersonaComponent implements OnInit {

  Person: Personas = new Personas();
  PersonAsId: Personas[]=[];
  PersonId: string;
  Actividadview: Actividades[] = [];
  values: any[] = [];

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
    this.PersonId;
  }

  mostrarActividades(): void {
    this._actividadservice.getAll().subscribe(
      (response) => {
        this.Actividadview=response;
        this.values=this.nuevosData();
        console.log(this.values)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private nuevosData(): any[] {

    const values:any[] = [];
    this.Actividadview.forEach((act) => {
      values.push([
        act.horaInicio,
        act.horaFin,
        act.tipoActividad.nombreActividad,
        act.fechaActividad,
        act.cedulaPersona.nombres,
        act.descripcionActividad
      ]);
    });
    return values;
  }

  getPersonsById(): void {
    console.log(this.PersonId);
    this.personaService.getPorCedula(this.PersonId).subscribe(
      (response) => {
        this.Person = response;
        console.log(response);
        this._actividadservice.open.emit();
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
