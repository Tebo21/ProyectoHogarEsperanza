import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Img, Txt, Table, ITable } from 'pdfmake-wrapper';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { Router } from '@angular/router';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import * as FileSaver from 'file-saver';
import { ConfirmationService } from 'primeng/api';
import { Perregficdto } from 'src/app/models/perregficdto';
import Swal from 'sweetalert2';
type TableRow = [string, string, string, string, string, string, string, number, string, string, string, string];
@Component({
  selector: 'app-lista-beneficiarios',
  templateUrl: './lista-beneficiarios.component.html',
  styleUrls: ['./lista-beneficiarios.component.css'],
  providers: [ConfirmationService]
})

export class ListaBeneficiariosComponent implements OnInit {
  ficha: FichaSocioeconomica = {};
  persona: Personas = {};
  info: Perregficdto = {};
  //Codigo 
  ListadoPersonas: Personas[];
  ListadoRegistroFam: RegistroFamiliares[];
  ListadoFichas: FichaSocioeconomica[];
  ListadoFinal: PersonaInfo[]
  selected: PersonaInfo[]
  fechaCreacionReporte: Date = new Date;
  loading: boolean
  //Logeo
  tipoUser:any

  constructor(private personaService: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.ListadoFichas = []
    this.ListadoRegistroFam = []
    this.ListadoFinal = []
    this.selected = []
    this.ComprobarLogin()
    localStorage.setItem('cedulaEditar', '')
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1 || this.tipoUser == 2 || this.tipoUser == 3 || this.tipoUser == 4) {
      this.listarBeneficiarios()
    } else {
      Swal.fire({
        title: 'Por favor inicie sesión primero',
        icon: 'error',
      });
      this.router.navigateByUrl('login');
    }
  }
  
  listarBeneficiarios() {
    this.loading = true
    this.personaService.getUserByEstadoYTipo(true, true).subscribe(data => {
      this.ListadoPersonas = data;
      for (let index = 0; index < this.ListadoPersonas.length; index++) {
        this.personaService.getAll(this.ListadoPersonas[index].cedula).subscribe(data => {
          this.info = data;
          if (this.info.enfermedades == null || this.info.enfermedades == []) {
            this.info.enfermedades = ['Ninguna'];
          }
          let nHijos;
          this.info.familiares.forEach(e => nHijos = e.numHijos)
          const personaCompleta: PersonaInfo = {
            cedula: this.info.cedula,
            nombres: this.info.nombres,
            apellidos: this.info.apellidos,
            direccion: this.info.direccion,
            celular: this.info.celular,
            correo: this.info.correo,
            genero: this.info.genero,
            fechaNacimiento: this.info.fechaNacimiento,
            edad: this.info.edad,
            nacionalidad: this.info.nacionalidad,
            estado_civil: this.info.estado_civil,
            faltas: this.info.faltas,
            pareja: this.convertirBooleanos(this.info.pareja),
            familiares: this.info.familiares.length,
            numHijos: nHijos,
            situacionEconomica: this.info.situacionEconomica,
            tipoVivienda: this.info.tipoVivienda,
            descripcionVivienda: this.info.descripcionVivienda,
            seguro: this.convertirBooleanos(this.info.seguro),
            salario: this.info.salario,
            fechaRegistro: this.info.fechaRegistro,
            adultoMayor: this.convertirBooleanos(this.info.adultoMayor),
            viveConOtros: this.convertirBooleanos(this.info.viveConOtros),
            recibebono: this.convertirBooleanos(this.info.recibebono),
            cantidadbono: this.info.cantidadbono,
            discapacidad: this.convertirBooleanos(this.info.discapacidad),
            tipo_discapacidad: this.info.tipo_discapacidad,
            porc_disc_mental: this.info.porc_disc_mental,
            descrip_disc_mental: this.info.descrip_disc_mental,
            porc_disc_fisica: this.info.porc_disc_fisica,
            descrip_disc_fisica: this.info.descrip_disc_fisica,
            madreSoltera: this.convertirBooleanos(this.info.madreSoltera),
            enfermedades: this.info.enfermedades.toString(),
            asistencias: this.info.asistencias.length
          };
          this.ListadoFinal.push(personaCompleta)
        })
      }
      this.loading = false
    });
    
  }

  convertirBooleanos(bool: boolean): string {
    if (bool == true) {
      return 'Si'
    } else if (bool == false) {
      return 'No'
    }
  }

  async generarPDF() {
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      bold: false,
      fontSize: 9
    });
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    pdf.info({
      title: 'Reporte de Beneficiarios',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(
      new Txt('Fecha de reporte: ' + ((this.fechaCreacionReporte.getDate() < 10) ? '0' : '') + this.fechaCreacionReporte.getDate()
        + "-" + (((this.fechaCreacionReporte.getMonth() + 1) < 10) ? '0' : '') + (this.fechaCreacionReporte.getMonth() + 1) + "-"
        + this.fechaCreacionReporte.getFullYear() + ' Hora: ' + this.fechaCreacionReporte.getHours() + ":"
        + this.fechaCreacionReporte.getMinutes()).alignment('right').end
    );
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de beneficiarios registrados').alignment('center').bold().fontSize(16).end
    );
    pdf.add(new Txt('   ').end);
    pdf.pageMargins([10, 10]);
    pdf.add(this.creaTabla(this.ListadoFinal));
    pdf.create().open();
  }

  creaTabla(data: PersonaInfo[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Nombres', 'Dirección', 'Celular', 'Correo', 'Genero',
        'Fecha de nacimiento', 'Edad', 'Nacionalidad', 'Estado civil', 'Pareja', 'Enfermedades'],
      ...this.extraerDatos(data),
    ])
      .widths([55, 100, 105, 52, 95, 45, 50, 28, 55, 50, 30, 45])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos(data: PersonaInfo[]): TableRow[] {
    Swal.fire({
      title: 'Se ha generado el reporte exitosamente',
      icon: 'success',
    });
    return data.map((row) => [
      row.cedula,
      row.nombres + ' ' + row.apellidos,
      row.direccion,
      row.celular,
      row.correo,
      row.genero,
      row.fechaNacimiento,
      row.edad,
      row.nacionalidad,
      row.estado_civil,
      row.pareja,
      row.enfermedades
    ]);
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ListadoFinal);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Beneficiarios");
    });
  }

  exportSelectedX() {
    if (this.selected.length < 1) {
      alert('Por favor seleccione al menos un usuario')
    } else {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.selected);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Beneficiarios");
      });
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    Swal.fire({
      title: 'Se ha generado el reporte exitosamente',
      icon: 'success',
    });
  }

  /*eliminarPersonaBeneficiario(i) {
    this.personaService.getUserByCedula(i).subscribe(data => {
      this.persona = data
      this.persona.estadoActivo = false;
      Swal.fire({
        title: 'Esta seguro de eliminar al beneficiario',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.personaService.updatePersona(this.persona).subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Beneficiario eliminado',
              'success'
            )
            const contador = timer(3000);
            contador.subscribe((n) => {
            window.location.reload();
        })
          })
        }
      });
    })
  }*/

  editarBeneficiario(cedula: string) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/editar-beneficiarios']);
  }

  verFicha(cedula: string) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/vista-ficha']);
  }

  verHistorial(cedula: string) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/historial']);
  }

  verObservaciones(cedula: string) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/observaciones-personas']);
  }

  verDocumentos(cedula: string) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/editar-documentos']);
  }

  verDonaciones(cedula: string) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/dar-donacion']);
  }

  verHistorialCompleto(cedula: string) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/historial-completo']);
  }

}
export class PersonaInfo {
  //Persona
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  direccion?: string;
  celular?: string;
  correo?: string;
  genero?: string;
  fechaNacimiento?: string;
  edad?: number;
  nacionalidad?: string;
  estado_civil?: string;
  faltas?: number;
  pareja?: string;
  //Registro Familiares
  familiares?: number;
  numHijos?: number;
  //Ficha
  situacionEconomica?: string;
  tipoVivienda?: string;
  descripcionVivienda?: string;
  seguro?: string;
  salario?: number;
  fechaRegistro?: string;
  adultoMayor?: string;
  viveConOtros?: string;
  recibebono?: string;
  cantidadbono?: number;
  discapacidad?: string;
  tipo_discapacidad?: string;
  porc_disc_mental?: number;
  descrip_disc_mental?: string;
  porc_disc_fisica?: number;
  descrip_disc_fisica?: string;
  madreSoltera?: string;
  enfermedades?: string;
  //Asistencias
  asistencias?: number;
}