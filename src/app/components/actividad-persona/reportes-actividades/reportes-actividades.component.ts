import { Component, Input, OnInit, Output } from '@angular/core';
import { TipoActividad } from '../../../models/TipoActividad';
import { Router } from '@angular/router';
import { ActividadesService } from '../../../services/actividades.service';
import { Actividades } from '../../../models/Actividades';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './pipe/filter.pipe';
import pdfMake from 'pdfmake/build/pdfmake';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Personas } from 'src/app/models/personas';
import { timer } from 'rxjs';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-reportes-actividades',
  templateUrl: './reportes-actividades.component.html',
  styleUrls: ['./reportes-actividades.component.css'],
})
export class ReportesActividadesComponent implements PipeTransform, OnInit {
  @Input() Person: Personas = new Personas();
  filterpost: any = {
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    fecha: '',
    hinicio: '',
    hfin: '',
    actividad: '',
    Tactividad: '',
  };
  filterpost1: any = {
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    fecha: '',
    hinicio: '',
    hfin: '',
    actividad: '',
    Tactividad: '',
  };
  //Usuarios DTO
  selected: Actividades[];
  personaValidar: Personas = {};

  Actividadview: Actividades[] = [];

  Actividadview1: Actividades[] = [];

  constructor(
    private router: Router,
    public _actividadservice: ActividadesService,
    public datapipe: DatePipe,
    public personaservice: PersonasService
  ) { }
  ngOnInit(): void {
    this.mostrarTipoActividades();
    this.ComprobarLogin();
    this.selected = [];
  }
  tipoUser: any;

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == '1' || this.tipoUser == 2) {
    } else if (this.tipoUser == '3' || this.tipoUser == '4') {
      this.showExitoso();
      this.router.navigateByUrl('inicio-super-admin');
    } else {
      Swal.fire({
        title: 'Por favor inicie sesión primero',
        icon: 'error',
      });
      this.router.navigateByUrl('login');
    }
  }

  showExitoso() {
    Swal.fire({
      icon: 'warning',
      title: 'No tienes permisos de administrador',
    });
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAll().subscribe((response) => {
      this.Actividadview = response;

      this.Actividadview.forEach((res) => {
        this.Actividadview1.push(res);
      });
    });
  }

  updateFilters(): void {
    this.filterpost = Object.assign({}, this.filterpost1);
    this.Actividadview1 = this.transform(this.Actividadview, this.filterpost1);
  }

  transform(members: any, filters: any): any {
    return members.filter((item) => {
      return (
        item.cedulaPersona.cedula
          .toLowerCase()
          .indexOf(filters.cedula.toLowerCase()) >= 0 &&
        item.cedulaPersona.nombres
          .toLowerCase()
          .indexOf(filters.nombre.toLowerCase()) >= 0 &&
        item.cedulaPersona.apellidos
          .toLowerCase()
          .indexOf(filters.apellido.toLowerCase()) >= 0 &&
        item.cedulaPersona.correo
          .toLowerCase()
          .indexOf(filters.correo.toLowerCase()) >= 0 &&
        item.fechaActividad
          .toLowerCase()
          .indexOf(filters.fecha.toLowerCase()) >= 0 &&
        item.horaInicio.toLowerCase().indexOf(filters.hinicio.toLowerCase()) >=
        0 &&
        item.horaFin.toLowerCase().indexOf(filters.hfin.toLowerCase()) >= 0 &&
        item.descripcionActividad
          .toLowerCase()
          .indexOf(filters.actividad.toLowerCase()) >= 0 &&
        item.tipoActividad.nombreActividad
          .toLowerCase()
          .indexOf(filters.Tactividad.toLowerCase()) >= 0
      );
    });
  }

  showConfirmacionPDF() {
    Swal.fire({
      title: '¿Estas seguro de descargar este reporte?',
      text: 'Se abrira una visualizacion de su reporte',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, descargar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.genereport();
        Swal.fire('Descargado!', 'El registro ha sido descargado', 'success');
      }
    });
  }
  genereport(action = 'open') {
    var testImageDataUrl = this._actividadservice.img;
    let docDefinition = {
      pageSize: 'LETTER',
      pageMargins: [25, 25, 25, 35],

      defaultStyle: {
        fontSize: 12,
        columnGap: 20,
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
                text: '',
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

  cambiarEstadoDeAsistencia(idActividad: number, Actividad: Actividades) {
    let nuevaAsistencia: boolean;
    if (Actividad.asistencia == true) {
      nuevaAsistencia = false;
    } else if (Actividad.asistencia == false) {
      nuevaAsistencia = true;
    }
    const ActividadActualizada: Actividades = {
      cedulaPersona: Actividad.cedulaPersona,
      idActividadPersona: idActividad,
      fechaActividad: Actividad.fechaActividad,
      horaInicio: Actividad.horaInicio,
      horaFin: Actividad.horaFin,
      descripcionActividad: Actividad.descripcionActividad,
      tipoActividad: Actividad.tipoActividad,
      asistencia: nuevaAsistencia,
    };
    this._actividadservice.updateUser(idActividad, ActividadActualizada).subscribe(() => {
    });
    this.actualizarPersona(Actividad.cedulaPersona.cedula, nuevaAsistencia);
  }

  actualizarPersona(cedula: string, nuevaAsistencia: boolean) {
    this.personaservice.getUserByCedula(cedula).subscribe(dat => {
      this.personaValidar = dat;
      if (nuevaAsistencia == false) {
        if (this.personaValidar.faltas == 0) {
          const PersonaNueva: Personas = {
            apellidos: this.personaValidar.apellidos,
            beneficiario: this.personaValidar.beneficiario,
            cedula: this.personaValidar.cedula,
            celular: this.personaValidar.celular,
            correo: this.personaValidar.correo,
            direccion: this.personaValidar.direccion,
            edad: this.personaValidar.edad,
            estadoActivo: this.personaValidar.estadoActivo,
            estado_civil: this.personaValidar.estado_civil,
            fechaNacimiento: this.personaValidar.fechaNacimiento,
            genero: this.personaValidar.genero,
            idPersona: this.personaValidar.idPersona,
            nacionalidad: this.personaValidar.genero,
            nombres: this.personaValidar.nombres,
            faltas: 1
          }
          this.personaservice.updatePersona(PersonaNueva).subscribe(() => {
          });
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        } else {
          const PersonaNueva: Personas = {
            apellidos: this.personaValidar.apellidos,
            beneficiario: this.personaValidar.beneficiario,
            cedula: this.personaValidar.cedula,
            celular: this.personaValidar.celular,
            correo: this.personaValidar.correo,
            direccion: this.personaValidar.direccion,
            edad: this.personaValidar.edad,
            estadoActivo: this.personaValidar.estadoActivo,
            estado_civil: this.personaValidar.estado_civil,
            fechaNacimiento: this.personaValidar.fechaNacimiento,
            genero: this.personaValidar.genero,
            idPersona: this.personaValidar.idPersona,
            nacionalidad: this.personaValidar.genero,
            nombres: this.personaValidar.nombres,
            faltas: this.personaValidar.faltas + 1
          }
          this.personaservice.updatePersona(PersonaNueva).subscribe(() => {
          });
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        }

      } else if (nuevaAsistencia == true) {
        if(this.personaValidar.faltas<=0){
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        } else if(this.personaValidar.faltas>0) {
          const PersonaNueva: Personas = {
            apellidos: this.personaValidar.apellidos,
            beneficiario: this.personaValidar.beneficiario,
            cedula: this.personaValidar.cedula,
            celular: this.personaValidar.celular,
            correo: this.personaValidar.correo,
            direccion: this.personaValidar.direccion,
            edad: this.personaValidar.edad,
            estadoActivo: this.personaValidar.estadoActivo,
            estado_civil: this.personaValidar.estado_civil,
            fechaNacimiento: this.personaValidar.fechaNacimiento,
            genero: this.personaValidar.genero,
            idPersona: this.personaValidar.idPersona,
            nacionalidad: this.personaValidar.genero,
            nombres: this.personaValidar.nombres,
            faltas: this.personaValidar.faltas - 1
          }
          this.personaservice.updatePersona(PersonaNueva).subscribe(() => {
          });
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con exito!',
          });
          const contador = timer(2000);
          contador.subscribe((n) => {
            window.location.reload();
          });
        }
        
      
      }
    });
  }
}
