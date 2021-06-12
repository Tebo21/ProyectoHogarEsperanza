import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/models/Actividades';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { TipoActividad } from 'src/app/models/TipoActividad';
import { Personas } from '../../../models/personas';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
})
export class CrearActividadComponent implements OnInit {
  @Input() public modal: NgbModalWindow;
  @Input() Person: Personas = new Personas();
  public fecha: Date = new Date();
  public fecha1: Date = new Date();
  public tipo: string;
  _tipoactividadCreate: TipoActividad = new TipoActividad(0, '', '');
  _tipoactividad: TipoActividad[] = [];
  _tipoactividad1: TipoActividad = new TipoActividad(0, '', '');
  public actividadCreate: Actividades = new Actividades(
    0,
    this.Person,
    this.fecha,
    this.fecha,
    this.fecha1,
    '',
    this._tipoactividadCreate
  );
  public id: number;

  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
    public modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.mostrarTipoActividades();
    console.log(this._actividadservice.actividades);
    console.log(this.Person);
    //this.getOneTipoAct();
    console.log(this.tipo);

  }

  getOneTipoAct(): void {
    this._actividadservice.getOneByNameTipo('Limpiar').subscribe((response) => {
      this._tipoactividad1 = response;
      console.log('esta es la actividad' + response);
    });
  }

  addActividad(): void {
    var d = new Date();
    this.fecha.getUTCDate;
    this.actividadCreate.cedulaPersona = this.Person;
    this.actividadCreate.tipoActividad= this._tipoactividad1;
    console.log(this._tipoactividadCreate);
    console.log(this.actividadCreate);
    console.log(this._tipoactividad1);

    if(this._tipoactividad1 != null || this.actividadCreate.horaFin != null || this.actividadCreate.horaInicio || this.actividadCreate.fechaActividad){
      this._actividadservice.createActividad(this.actividadCreate).subscribe((res)=>{
        window.location.reload();
        alert("Guardado satisfactoriamente");
        this.modalService.dismissAll();
      });
    }
    else{
      alert("Existen campos vacios");
    }
    }

   
  gotoList() {
    this.router.navigate(['/actividades']);
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAllTipos().subscribe(
      (response) => {
        this._tipoactividad = response;
        console.log(response);
        this._actividadservice.open.subscribe(
          (data) => {
            console.log('Datos cargado');
          },
          (error) => console.log('No se cargaron los daros')
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
