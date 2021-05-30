import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/models/Actividades';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { TipoActividad } from 'src/app/models/TipoActividad';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
})
export class CrearActividadComponent implements OnInit {
  @Input() modal: NgbModalWindow;
  public fecha: Date = new Date();
  public tipo: Array<string> = new Array();
  _tipoactividad: TipoActividad[] = [];
  public actividadCreate: Actividades = new Actividades(
    0,
    '',
    this.fecha,
    this.fecha,
    this.fecha,
    '',
    this.tipo
  );
  public id: number;

  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.mostrarTipoActividades();
  }
  addActividad(): void {
    var d = new Date();
    this.fecha.getUTCDate;
    this.actividadCreate.idActividadPersona = this.id;
    console.log(this.actividadCreate);
    this._actividadservice.createActividad(this.actividadCreate).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.gotoList();
  }
  gotoList() {
    this.router.navigate(['/actividades']);
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAllTipos().subscribe(
      response => {
       this._tipoactividad=response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
}
