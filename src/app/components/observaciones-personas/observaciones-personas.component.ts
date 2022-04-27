import { Component, OnInit } from '@angular/core';
import { ObservacionesPersonas } from 'src/app/models/observaciones-personas';
import { ObservacionesPersonasService } from 'src/app/services/observaciones-personas.service';
import { PdfMakeWrapper, Img, Txt, Table, ITable, Columns } from 'pdfmake-wrapper';
import { PersonasService } from '../../services/personas.service';
import { Personas } from '../../models/personas';
import { Message } from 'primeng/api';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
type TableRow = [string, string];
@Component({
  selector: 'app-observaciones-personas',
  templateUrl: './observaciones-personas.component.html',
  styleUrls: ['./observaciones-personas.component.css']
})
export class ObservacionesPersonasComponent implements OnInit {

  cedula: string = localStorage.getItem('cedulaEditar');
  observacion: ObservacionesPersonas = {};
  observaciones: ObservacionesPersonas[];
  persona: Personas = {};
  fecha: Date = new Date;
  msgs: Message[];
  display: boolean = false;
  displayEliminar: boolean = false;
  observacionEditar: ObservacionesPersonas = {};
  idEliminar: number;
  fechaReporte: Date = new Date;
  //Comprobar Loggin
  tipoUser: any

  constructor(private Obserserivce: ObservacionesPersonasService, private personaservice: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.observaciones = []
    this.ComprobarLogin()
  }
  
  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1 || this.tipoUser == 2) {
      this.listaObservaciones()
    } else if (this.tipoUser == 3 || this.tipoUser == 4) {
      Swal.fire({
        title: 'No tiene permisos para registrar observaciones',
        icon: 'warning',
      });
      this.router.navigateByUrl('inicio-super-admin');
    } else {
      Swal.fire({
        title: 'Por favor inicie sesión primero',
        icon: 'error',
      });
      this.router.navigateByUrl('login');
    }
  }


  listaObservaciones() {
    this.Obserserivce.getBycedula(this.cedula).subscribe(data => {
      this.observaciones = data;
    })
    this.personaservice.getUserByCedula(this.cedula).subscribe(data => {
      this.persona = data;
    })
  }

  guardarObservaciones() {
    if (this.observacion.descripcionobservacion == null || this.observacion.descripcionobservacion == '' ||
      this.observacion.descripcionobservacion == undefined || this.cedula == null || this.cedula == '' ||
      this.cedula == undefined) {
      this.addMultiple('error', 'Error', 'Por favor complete la descripción');
    } else {
      let fechaObservacion = ((this.fecha.getDate() < 10) ? '0' : '') + this.fecha.getDate()
        + "-" + (((this.fecha.getMonth() + 1) < 10) ? '0' : '') + (this.fecha.getMonth() + 1)
        + "-" + this.fecha.getFullYear()
      let nuevaObservacion: ObservacionesPersonas = {
        cedulaPersona: this.cedula,
        descripcionobservacion: this.observacion.descripcionobservacion,
        fechaRegistro: fechaObservacion
      }
      this.Obserserivce.postObservacion(nuevaObservacion).subscribe(data => {
        this.addMultiple('success', 'Exito', 'Se ha guardado con exito la información');
        const contador = timer(2000);
        contador.subscribe((n) => {
          window.location.reload();
        })
      });
    }

  }

  async generarPDF() {
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    pdf.info({
      title: 'Reporte de observaciones: '+this.persona.nombres + ' ' + this.persona.apellidos,
    });
    pdf.defaultStyle({
      bold: false,
      fontSize: 10
    });  
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(
      new Txt('Fecha: ' + ((this.fechaReporte.getDate() < 10) ? '0' : '') + this.fechaReporte.getDate()
        + "-" + (((this.fechaReporte.getMonth() + 1) < 10) ? '0' : '') + (this.fechaReporte.getMonth() + 1)
        + "-" + this.fechaReporte.getFullYear() + ' Hora: ' + this.fechaReporte.getHours() + ":"
        + this.fechaReporte.getMinutes()).alignment('right').end
    );
    pdf.add(pdf.ln(1))
    pdf.add(new Txt("Reporte de observaciones").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(1))
    pdf.add(new Txt("Cédula: " + this.cedula).italics().alignment('left').end);
    pdf.add(new Txt("Nombres: " + this.persona.nombres + ' ' + this.persona.apellidos).italics().alignment('left').end);
    pdf.add(pdf.ln(1))
    pdf.add(this.creaTabla(this.observaciones));
    pdf.create().open();
  }

  creaTabla(data: ObservacionesPersonas[]): ITable {
    [{}];
    return new Table([
      ['Descripción', 'Fecha'],
      ...this.extraerDatos(data),
    ])
      .widths([675, 70])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos(data: ObservacionesPersonas[]): TableRow[] {
    return data.map((row) => [
      row.descripcionobservacion,
      row.fechaRegistro,
    ]);
  }

  modal(obser: ObservacionesPersonas) {
    this.display = true;
    this.observacionEditar = obser;
  }

  actualizarObservacion() {
    if (this.observacionEditar.descripcionobservacion == '') {
      this.addMultiple('error', 'Error', 'Por favor complete la descripción');
    } else {
      this.Obserserivce.updateFamiliares(this.observacionEditar).subscribe(data => {
        this.addMultiple('success', 'Exito', 'Se ha actualizado con exito la información');
        const contador = timer(2000);
        contador.subscribe((n) => {
          window.location.reload();
        })
      });
    }
  }

  modalEliminar(idObservacionesPersona: number) {
    this.displayEliminar = true;
    this.idEliminar = idObservacionesPersona;
  }

  eliminarObservacion() {
    this.Obserserivce.deleteObservacion(this.idEliminar).subscribe(data => {
      this.addMultiple('success', 'Exito', 'Se ha eliminado con exito la información');
      const contador = timer(2000);
      contador.subscribe((n) => {
        window.location.reload();
      })
    })
  }

  addMultiple(severity1: string, sumary1: string, detail1: string) {
    this.msgs =
      [{ severity: severity1, summary: sumary1, detail: detail1 }];
    const contador = timer(6000);
    contador.subscribe((n) => {
      this.msgs = [];
    })
  }

  cancelar() {
    this.router.navigate(['/lista-beneficiarios']);
  }

}
