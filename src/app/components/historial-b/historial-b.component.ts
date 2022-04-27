import { Component, OnInit } from '@angular/core';
import { AsistenciaPersona } from 'src/app/models/asistenciapersona';
import { AsistenciapersonaService } from 'src/app/services/asistenciapersona.service';
import { Img, ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as FileSaver from 'file-saver';
import { Message } from 'primeng/api';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';
import Swal from 'sweetalert2';
type TableRow = [string, string, string];
@Component({
  selector: 'app-historial-b',
  templateUrl: './historial-b.component.html',
  styleUrls: ['./historial-b.component.css']
})

export class HistorialBComponent implements OnInit {

  cedulaBuscar: string = localStorage.getItem('cedulaEditar');
  asistencias: AsistenciaPersona[];
  selected: AsistenciaPersona[];
  usuarioFechaCreacion: Date = new Date;
  asistencia: AsistenciaPersona = {};
  msgs: Message[];
  fechaCreacionFicha: Date = new Date;
  persona: Personas = {};
  display: boolean = false;
  displayEliminar: boolean = false;
  idEliminar: number;
  asistenciaEditar: AsistenciaPersona = {};
  //Logeo
  tipoUser: any

  constructor(private asitenciaservice: AsistenciapersonaService, private personaservice: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.ComprobarLogin()
    this.asistencias = []
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1 || this.tipoUser == 2) {
      this.cargarDatos();
    } else if (this.tipoUser == 3 || this.tipoUser == 4) {
      Swal.fire({
        title: 'No tiene permisos para registrar asistencias',
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

  cargarDatos() {
    this.asitenciaservice.getAsistenciaByCedula(this.cedulaBuscar).subscribe(data => {
      this.asistencias = data;
    })
    this.personaservice.getUserByCedula(this.cedulaBuscar).subscribe(data => {
      this.persona = data;
    })
  }

  verificarCamposAsistencia(): boolean {
    if (this.asistencia.actividad == null || this.asistencia.actividad == '' || this.asistencia.actividad == undefined ||
      this.cedulaBuscar == null || this.cedulaBuscar == '' || this.cedulaBuscar == undefined ||
      this.asistencia.descripcion == null || this.asistencia.descripcion == '' || this.asistencia.descripcion == undefined ||
      this.asistencia.fecha == undefined) {
      return false;
    } else return true;
  }

  agregarAsistencia() {
    if (this.verificarCamposAsistencia() == false) {
      this.addMultiple('error', 'Error', 'Rellene los campos solicitados');
      this.timer();
    } else {
      let nuevaAsitencia: AsistenciaPersona = {
        actividad: this.asistencia.actividad,
        cedulaPersona: this.cedulaBuscar,
        descripcion: this.asistencia.descripcion,
        fecha: this.asistencia.fecha
      }
      this.asitenciaservice.addAsitencia(nuevaAsitencia).subscribe(data => {
        this.addMultiple('success', 'Exito', 'Se ha guardado con exito la información');
        const contador = timer(2000);
        contador.subscribe((n) => {
          window.location.reload();
        })
      })
    }
  }

  async crearReporte() {
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    pdf.info({
      title: 'Reporte de actividades: '+this.persona.nombres + ' ' + this.persona.apellidos,
    });
    pdf.defaultStyle({
      bold: false,
      fontSize: 10
    });  
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(
      new Txt('Fecha: ' + ((this.usuarioFechaCreacion.getDate() < 10) ? '0' : '') + this.usuarioFechaCreacion.getDate()
        + "-" + (((this.usuarioFechaCreacion.getMonth() + 1) < 10) ? '0' : '') + (this.usuarioFechaCreacion.getMonth() + 1)
        + "-" + this.usuarioFechaCreacion.getFullYear() + ' Hora: ' + this.usuarioFechaCreacion.getHours() + ":"
        + this.usuarioFechaCreacion.getMinutes()).alignment('right').end
    );
    pdf.add(pdf.ln(1))
    pdf.add(new Txt("Reporte de actividades").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(1))
    pdf.add(new Txt("Cédula: " + this.cedulaBuscar).italics().alignment('left').end);
    pdf.add(new Txt("Nombres: " + this.persona.nombres + ' ' + this.persona.apellidos).italics().alignment('left').end);
    pdf.add(pdf.ln(1))
    pdf.add(this.creaTabla(this.asistencias));
    pdf.create().open();
  }

  async exportSelected() {
    if (this.selected.length < 1) {
      alert('Por favor seleccione al menos un usuario')
    } else {
      const pdf = new PdfMakeWrapper();
      pdf.pageOrientation('landscape');
      pdf.pageSize('A4');
      pdf.info({
        title: 'Reporte de Usuarios',
      });
      pdf.defaultStyle({
        bold: false,
        fontSize: 10
      });  
      pdf.add(await new Img('../../assets/img/logo.png').build());
      pdf.add(
        new Txt('Fecha de reporte: ' + ((this.usuarioFechaCreacion.getDate() < 10) ? '0' : '') + this.usuarioFechaCreacion.getDate()
          + "-" + (((this.usuarioFechaCreacion.getMonth() + 1) < 10) ? '0' : '') + (this.usuarioFechaCreacion.getMonth() + 1) + "-"
          + this.usuarioFechaCreacion.getFullYear() + ' Hora: ' + this.usuarioFechaCreacion.getHours() + ":"
          + this.usuarioFechaCreacion.getMinutes()).alignment('right').end
      );
      pdf.add(new Txt('   ').end);
      pdf.add(
        new Txt('Lista de actividades realizadas').alignment('center').bold().fontSize(16).end
      );
      pdf.add(new Txt('   ').end);
      pdf.add(this.creaTabla(this.selected));
      pdf.create().open();
    }

  }
  
  creaTabla(data: AsistenciaPersona[]): ITable {
    [{}];
    return new Table([
      ['Actividad', 'Descripción', 'Fecha'],
      ...this.extraerDatos(data),
    ])
      .widths([100, 533, 100])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos(data: AsistenciaPersona[]): TableRow[] {
    return data.map((row) => [
      row.actividad,
      row.descripcion,
      row.fecha
    ]);
  }

  exportSelectedX() {
    if (this.selected.length < 1) {
      alert('Por favor seleccione al menos una actividad')
    } else {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.selected);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ActividadesRealizadas");
      });
    }

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.asistencias);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "ActividadesRealizadas");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let fechaCreacionFicha: string = ((this.fechaCreacionFicha.getDate() < 10) ? '0' : '') + this.fechaCreacionFicha.getDate()
      + "-" + (((this.fechaCreacionFicha.getMonth() + 1) < 10) ? '0' : '') + (this.fechaCreacionFicha.getMonth() + 1)
      + "-" + this.fechaCreacionFicha.getFullYear();
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + 'CI' + this.cedulaBuscar + 'F' + fechaCreacionFicha + EXCEL_EXTENSION);
    Swal.fire({
      title: 'Se ha generado el reporte exitosamente',
      icon: 'success',
    });
  }

  addMultiple(severity1: string, sumary1: string, detail1: string) {
    this.msgs =
      [{ severity: severity1, summary: sumary1, detail: detail1 }];
  }

  timer() {
    const contador = timer(6000);
    contador.subscribe((n) => {
      this.msgs = [];
    })
  }

  cancelar() {
    this.router.navigate(['/lista-beneficiarios']);
  }

  modal(asistencia: AsistenciaPersona) {
    this.display = true;
    this.asistenciaEditar = asistencia;
  }

  actualizarAsistencia() {
    if (this.asistenciaEditar.actividad == null || this.asistenciaEditar.actividad == '' || this.asistenciaEditar.actividad == undefined ||
      this.cedulaBuscar == null || this.cedulaBuscar == '' || this.cedulaBuscar == undefined ||
      this.asistenciaEditar.descripcion == null || this.asistenciaEditar.descripcion == '' || this.asistenciaEditar.descripcion == undefined ||
      this.asistenciaEditar.fecha == undefined) {
        this.addMultiple('error', 'Error', 'Por favor rellene todos los campos');
    } else {
      this.asitenciaservice.updateAsistencia(this.asistenciaEditar).subscribe(data => {
        this.addMultiple('success', 'Exito', 'Se ha actualizado con exito la información');
        const contador = timer(2000);
        contador.subscribe((n) => {
          window.location.reload();
        })
      });
    }
  }

  modalEliminar(idAsistencia: number) {
    this.displayEliminar = true;
    this.idEliminar = idAsistencia;
  }

  eliminarAsistencia() {
    this.asitenciaservice.deleteAsistencia(this.idEliminar).subscribe(data => {
      this.addMultiple('success', 'Exito', 'Se ha eliminado con exito la información');
      const contador = timer(2000);
      contador.subscribe((n) => {
        window.location.reload();
      })
    })
  }

}
