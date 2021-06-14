import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbCalendarGregorian, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';
import { Actividades } from 'src/app/models/Actividades';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css'],
})
export class ActividadPersonaComponent implements OnInit {
  catalogoId: number = 0;
  Person: Personas = new Personas();
  PersonAsId: Personas[] = [];
  PersonId: string;
  Actividadview: Actividades[] = [];
  values: any[] = [];
  fecha1: Date = new Date();
  fecha2: string = this.datapipe.transform(this.fecha1, 'yyyy-MM-dd');

  constructor(
    public _actividadservice: ActividadesService,
    public modalService: NgbModal,
    public personaService: PersonasService,
    public datapipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.PersonId;
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
  getCedulaAndFecha() {
    this.getPersonsById();
    this._actividadservice
      .getActividadCedulaAndFecha(this.fecha2)
      .subscribe((res) => {
        res.forEach((act) => {
          if (act.cedulaPersona.cedula == this.Person.cedula) {
            this.Actividadview.push(act);
            console.log(this.Actividadview);
          }
        });
      });
  }

  trashActiv(id: number) {
    this._actividadservice.trahsActi(id).subscribe((res) => {
        alert(`Eliminamos correctamente #${res}`);
        window.location.reload();
    });
  }
}
