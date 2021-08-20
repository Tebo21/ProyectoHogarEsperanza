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
  @Input() fechaT: string="";
  @Input() ActividadviewActu: Actividades[] = [];
  public fecha1 = formatDate(new Date(), 'HH:mm', 'EN');
  public fecha2 = formatDate(new Date(), 'HH:mm', 'EN');
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
  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
    public modalService: NgbModal,
    public datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.mostrarTipoActividades();
  }

  getOneTipoAct(): void {
    this._actividadservice.getOneByNameTipo('Limpiar').subscribe((response) => {
      this._tipoactividad1 = response;
    });
  }

  addActividad(): void {
    if (this.ActividadviewActu.length==0) {
    this.actividadCreate.fechaActividad= this.fechaT;
    this.actividadCreate.cedulaPersona = this.Person;
    this.actividadCreate.tipoActividad= this._tipoactividad1;
    if( this.actividadCreate.cedulaPersona.cedula != "" && this.actividadCreate.cedulaPersona.nombres != "" && this.actividadCreate.cedulaPersona.apellidos != "" &&  this.actividadCreate.tipoActividad.nombreActividad != "" && this.actividadCreate.horaFin != "" && this.actividadCreate.horaInicio != ""  && this.actividadCreate.descripcionActividad != ""){
      this._actividadservice.createActividad(this.actividadCreate).subscribe((res)=>{
        window.location.reload();
        this.showExitoso();
        this.modalService.dismissAll();
      });
    }
    else{
      this.showError();
    }
    }else{
    this.actividadCreate.fechaActividad= this.fechaT;
    this.actividadCreate.cedulaPersona = this.Person;
    this.actividadCreate.tipoActividad= this._tipoactividad1;
    let id=0;
    this.ActividadviewActu.forEach((res)=>{ id = res.idActividadPersona})
      this._actividadservice.updateUser(id,this.actividadCreate).subscribe(
        (res)=>{
          window.location.reload();
        this.showExitoso();
        this.modalService.dismissAll();
        }
      )
    }
    }

    setear(){
      this.ActividadviewActu=[];
    }


  gotoList() {
    this.router.navigate(['/actividades']);
    this._actividadservice.createActividad(this.actividadCreate).subscribe((res)=>{
      window.location.reload();
     //this.showExitoso();
      this.modalService.dismissAll();
    });

  }

  crearTipoActividad() {

    if(this.tipoActCreate.descripcionActividad != "" && this.tipoActCreate.descripcionActividad != ""){
      this._actividadservice.createTipoAct(this.tipoActCreate).subscribe((res)=>{
        window.location.reload();
        this.showExitoso();
        this.modalService.dismissAll();
      })
    }else{
     this.showError();
    }

  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAllTipos().subscribe(
      (response) => {
        this._tipoactividad = response;
        this._actividadservice.open.subscribe(
          (data) => {
          },
          (error) => console.log(error)
        );
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  editActi(){
    this._actividadservice.updateUser(this.actividadCreate.idActividadPersona,this.actividadCreate).subscribe(data =>{
      this.showActualizacion();
    })  
  }
  showActualizacion(){
    Swal.fire({
      icon: 'success',
      title: 'Datos Actualizados',
      showConfirmButton: false,
      timer: 2000
    })
  }

  trashActiv(id: number) {
    this._actividadservice.trahsTipoActi(id).subscribe((res) => {
      this.showExitoso();
      window.location.reload();
    });
  }
  showConfirmacion(id:number){
    Swal.fire({
      title: '¿Estas seguro de eliminar esta actividad?',
      text: "Si eliminas no podras revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí,eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trashActiv(id)
        Swal.fire(
          'Eliminado!',
          'La actividad ha sido eliminado',
          'success'
        )
      }
    })
  }
  showExitoso(){
    Swal.fire({
      icon: 'success',
      title: 'Se guardó con exito!',
      showConfirmButton: false,
      timer: 2000
    })
  }
  showError(){
    Swal.fire({
      icon: 'error',
      title: 'No se pueden guardar los datos',
      text: 'Existen campos vacios.'
    })
  }
}



