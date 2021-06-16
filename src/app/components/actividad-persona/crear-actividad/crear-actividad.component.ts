import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/models/Actividades';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { TipoActividad } from 'src/app/models/TipoActividad';
import { Personas } from '../../../models/personas';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
})
export class CrearActividadComponent implements OnInit {
  @Input() public modal: NgbModalWindow;
  @Input() Person: Personas = new Personas();
  public fecha: Date = new Date();
  @Input() fechaT: string="";

  public fecha1 = formatDate(new Date(), 'HH:mm', 'EN');
  public fecha2 = formatDate(new Date(), 'HH:mm', 'EN');
  public tipo: string;
  public descripcionAc : string;
  _tipoactividadCreate: TipoActividad = new TipoActividad(0, '', '');
  _tipoactividad: TipoActividad[] = [];
  _tipoactividad1: TipoActividad = new TipoActividad(0, '', '');
  public tipoActCreate: TipoActividad = new TipoActividad(0, '', '');
  public actividadCreate: Actividades = new Actividades(
    0,
    this.Person,
    this.fechaT,
    this.fecha1,
    this.fecha2,
    '',
    this._tipoactividadCreate
  );
  public id: number;
  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
    public modalService: NgbModal,
    public datePipe: DatePipe
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
    this.actividadCreate.fechaActividad= this.fechaT;
    this.actividadCreate.cedulaPersona = this.Person;
    this.actividadCreate.tipoActividad= this._tipoactividad1;
   
    console.log(this.actividadCreate);

    if( this.actividadCreate.cedulaPersona.cedula != "" && this.actividadCreate.cedulaPersona.nombres != "" && this.actividadCreate.cedulaPersona.apellidos != "" &&  this.actividadCreate.tipoActividad.nombreActividad != "" && this.actividadCreate.horaFin != "" && this.actividadCreate.horaInicio != ""  && this.actividadCreate.descripcionActividad != ""){
      this._actividadservice.createActividad(this.actividadCreate).subscribe((res)=>{
        window.location.reload();
        alert("Guardado satisfactoriamente");
        this.modalService.dismissAll();
      });
    }
    else{
      console.log("Existen campos vacios");
    }
    }

   
  gotoList() {
    this.router.navigate(['/actividades']);
    this._actividadservice.createActividad(this.actividadCreate).subscribe((res)=>{
      window.location.reload();
      alert("Guardado satisfactoriamente");
      this.modalService.dismissAll();
    });

  }

  crearTipoActividad() {
    console.log(this.tipoActCreate)

    if(this.tipoActCreate.descripcionActividad != "" && this.tipoActCreate.descripcionActividad != ""){
      this._actividadservice.createTipoAct(this.tipoActCreate).subscribe((res)=>{
        window.location.reload();
        alert("Guardado satisfactoriamente");
        this.modalService.dismissAll();
      })
    }else{
      console.log("Existen campos vacios");
    }
   
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
          (error) => console.log('No se cargaron los datos')
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showExitoso(){
    Swal.fire({
      icon: 'success',
      title: 'Se guardó con exito',
      showConfirmButton: false,
      timer: 2000
    })
  }

}


