import { Component, OnInit, Output } from '@angular/core';
import { TipoActividad } from '../../../models/TipoActividad';
import { Router } from '@angular/router';
import { ActividadesService } from '../../../services/actividades.service';
import { Actividades } from '../../../models/Actividades';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './pipe/filter.pipe';
import pdfMake from 'pdfmake/build/pdfmake';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-reportes-actividades',
  templateUrl: './reportes-actividades.component.html',
  styleUrls: ['./reportes-actividades.component.css']
})

export class ReportesActividadesComponent implements PipeTransform,OnInit {

  filterpost: any ={cedula:"",nombre:"",apellido:"",correo:"",fecha:"",hinicio:"",hfin:"",actividad:"",Tactividad:""};
  filterpost1: any ={cedula:"",nombre:"",apellido:"",correo:"",fecha:"",hinicio:"",hfin:"",actividad:"",Tactividad:""};

  Actividadview: Actividades[] = [];

  Actividadview1: Actividades[] = [];
  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
    public datapipe: DatePipe
  ) {


  }
  ngOnInit(): void {
    this.mostrarTipoActividades();
    this.ComprobarLogin();
  }
  tipoUser: any;

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == '1' || this.tipoUser == 2) {
    } else if (this.tipoUser == '3' || this.tipoUser == '4') {
      this.showExitoso();
      this.router.navigateByUrl('inicio-super-admin');
    }
  }

  showExitoso() {
    Swal.fire({
      icon: 'warning',
      title: 'No tienes permisos de administrador'
    });
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAll().subscribe(
      (response) => {
        this.Actividadview=response

    this.Actividadview.forEach(res=>{
      this.Actividadview1.push(res)
    })
      }
  );
  }

  updateFilters(): void {
    this.filterpost = Object.assign({}, this.filterpost1);
    this.Actividadview1=this.transform(this.Actividadview,this.filterpost1);
    }

  transform(members: any, filters: any): any {
    return members.filter(item => {
    return (item.cedulaPersona.cedula.toLowerCase().indexOf(filters.cedula.toLowerCase()) >= 0 && item.cedulaPersona.nombres.toLowerCase().indexOf(filters.nombre.toLowerCase()) >= 0  && item.cedulaPersona.apellidos.toLowerCase().indexOf(filters.apellido.toLowerCase()) >= 0 && item.cedulaPersona.correo.toLowerCase().indexOf(filters.correo.toLowerCase()) >= 0 && item.fechaActividad.toLowerCase().indexOf(filters.fecha.toLowerCase()) >= 0 && item.horaInicio.toLowerCase().indexOf(filters.hinicio.toLowerCase()) >= 0 && item.horaFin.toLowerCase().indexOf(filters.hfin.toLowerCase()) >= 0  && item.descripcionActividad.toLowerCase().indexOf(filters.actividad.toLowerCase()) >= 0 && item.tipoActividad.nombreActividad.toLowerCase().indexOf(filters.Tactividad.toLowerCase()) >= 0);
    });
  }

  showConfirmacionPDF(){
    Swal.fire({
      title: '¿Estas seguro de descargar este reporte?',
      text: "Se abrira una visualizacion de su reporte",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, descargar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.genereport();
        Swal.fire(
          'Descargado!',
          'El registro ha sido descargado',
          'success'
        )
      }
    })
  }
  genereport(action = 'open') {
    var testImageDataUrl = this._actividadservice.img;
    let docDefinition = {

    pageSize : 'LETTER',
    pageMargins : [25, 25, 25, 35],

    defaultStyle : {
      fontSize  : 12,
      columnGap : 20
    },
      content: [
        {
          columns: [
            {
              image: testImageDataUrl,
              width: 100,
              margin: [0, 0, 0, 0],
            },
            {
              text: 'REPORTES',
              fontSize: 16,
              margin: [125, 0, 0, 0],
              color: '#047886',
            },
          ],
        },
        {
          text: 'Actividades Reportes',
          style: 'sectionHeader',
        },
        {
          columns: [
            [
              {
                text:''
              },
            ],
            [
              {
                text: `Fecha: ${new Date().toLocaleString()}`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: '',
          style: 'sectionother',
        },
        {
          table: {
            headerRows: 1,
            body: [
              [
                'Cédula',
                'Nombre',
                'Apellido',
                'Fecha',
                'Hora Inicio',
                'Hora Fin',
                'Observaciones',
                'Actividad Realizada',
              ],
              ...this.Actividadview1.map((row) => [
                row.cedulaPersona.cedula,
                row.cedulaPersona.nombres,
                row.cedulaPersona.apellidos,
                row.fechaActividad,
                row.horaInicio,
                row.horaFin,
                row.descripcionActividad,
                row.tipoActividad.nombreActividad,
              ]),
            ],
          },
          alignment: 'center',
          fontSize: 9.5,
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        sectionother: {
          bold: true,
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }
}
