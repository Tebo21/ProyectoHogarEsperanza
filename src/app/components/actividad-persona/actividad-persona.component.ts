import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbCalendarGregorian, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';
import { Actividades } from '../../models/Actividades';
import { TipoActividad } from '../../models/TipoActividad';

@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css'],
})
export class ActividadPersonaComponent implements OnInit {
  catalogoId: number = 0;

  @Input()Person: Personas = new Personas();

  PersonAsId: Personas[]=[];

  PersonId: string;
   public fecha: Date = new Date();
  public tipo: Array<string> = new Array();
  _tipoactividadCreate: TipoActividad= new TipoActividad(0,"","");
  _tipoactividad: TipoActividad[] = [];
  public actividadCreate: Actividades = new Actividades(0,this.Person,this.fecha,this.fecha,this.fecha,"",this._tipoactividadCreate);

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
        if (response== null || response as undefined || response.length==0) {
          console.log("Sin actidades");
          this.actividadCreate = response;
          console.log(response);
        }else{
          this._actividadservice.actividades = response;

          console.log(response);
        }
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
