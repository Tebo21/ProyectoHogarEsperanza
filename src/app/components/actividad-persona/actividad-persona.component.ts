import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  PersonAsId: Personas[]=[];
  PersonId: string;
  Actividadview: Actividades[] = [];
  values: any[] = [];
  fecha1 : Date= new Date();
  fecha2: string=this.datapipe.transform(this.fecha1,'yyyy-MM-dd');
  Actividadview1: Actividades[] = [];

  constructor(
    public _actividadservice: ActividadesService,
    public modalService: NgbModal,
    public personaService: PersonasService,
    public datapipe: DatePipe
  ) {}

  ngOnInit(): void {
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
  getCedulaAndFecha(){
    this.getPersonsById();
    const values:any[]=[];
    this._actividadservice.getActividadCedulaAndFecha(this.fecha2).subscribe(
      (res)=> {
        res.forEach((act)=> {
          if (act.cedulaPersona.cedula==this.Person.cedula) {
            values.push([
              act.horaInicio,
              act.horaFin,
              act.tipoActividad.nombreActividad,
              act.fechaActividad,
              act.cedulaPersona.nombres,
              act.descripcionActividad
            ]);
          }
        });
        this.values=values;
      }
    )
    console.log("uno"+values);
    console.log("dos"+this.values)
  }
}
