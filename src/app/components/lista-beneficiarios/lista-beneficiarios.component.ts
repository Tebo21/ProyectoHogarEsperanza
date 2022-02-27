import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Img, Txt, Table, ITable } from 'pdfmake-wrapper';
import { FichaSocioeconomica } from '../../models/ficha-socioeconomica';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { FichaSocioeconomicaService } from '../../services/ficha-socioeconomica.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import * as FileSaver from 'file-saver';
import { ConfirmationService } from 'primeng/api';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { Perregficdto } from 'src/app/models/perregficdto';
type TableRow = [string, string, string, string, string, string, string, number, string, string, number, string];

@Component({
  selector: 'app-lista-beneficiarios',
  templateUrl: './lista-beneficiarios.component.html',
  styleUrls: ['./lista-beneficiarios.component.css'],
  providers: [ConfirmationService]
})
export class ListaBeneficiariosComponent implements OnInit {
  ficha: FichaSocioeconomica = new FichaSocioeconomica();
  familia: RegistroFamiliares = new RegistroFamiliares();
  persona: Personas = new Personas();
  info: Perregficdto = {};
  public datos: any = [];
  public personaArray: any = [];
  public cedulaArray: any = [];
  public familiaArray: any = [];
  public fichaArray: any = [];
  public arraySelected: any = [];
  public arrayExcel: any = []
  //Codigo 
  ListadoPersonas: Personas[];
  ListadoRegistroFam: RegistroFamiliares[];
  ListadoFichas: FichaSocioeconomica[];
  ListadoFinal: PersonaInfo[]
  selected: PersonaInfo[]
  fechaCreacionReporte: Date = new Date;
  constructor(private personaService: PersonasService, private fichaService: FichaSocioeconomicaService, 
    private registrofamservice: RegistroFamiliaresService, private router: Router) { }

  ngOnInit(): void {
    this.personaArray = []
    this.ListadoPersonas = []
    this.ListadoFichas = []
    this.ListadoRegistroFam = []
    this.ListadoFinal = []
    this.listarBeneficiarios();
  }

  listarBeneficiarios() {
    this.personaService.getUserByEstadoYTipo(true, true).subscribe(data => {
      this.ListadoPersonas = data;
      for (let index = 0; index < this.ListadoPersonas.length; index++) {
        this.personaService.getAll(this.ListadoPersonas[index].cedula).subscribe(data => {
          this.info = data;
          const personaCompleta : PersonaInfo = {
            cedula : this.info.cedula,
            nombres : this.info.nombres,
            apellidos : this.info.apellidos,
            direccion  : this.info.direccion,
            celular : this.info.celular,
            correo : this.info.correo,
            genero : this.info.genero,
            fechaNacimiento : this.info.fechaNacimiento,
            edad : this.info.edad,
            nacionalidad : this.info.nacionalidad,
            estado_civil : this.info.estado_civil,
            faltas : this.info.faltas,
            pareja : this.convertirBooleanos(this.info.pareja),
            familiares : this.info.familiares,
            situacionEconomica : this.info.situacionEconomica,
            tipoVivienda : this.info.tipoVivienda,
            descripcionVivienda : this.info.descripcionVivienda,
            seguro : this.convertirBooleanos(this.info.seguro),
            salario : this.info.salario,
            fechaRegistro : this.info.fechaRegistro,
            adultoMayor : this.convertirBooleanos(this.info.adultoMayor),
            viveConOtros : this.convertirBooleanos(this.info.viveConOtros),
            recibebono : this.convertirBooleanos(this.info.recibebono),
            cantidadbono : this.info.cantidadbono,
            discapacidad : this.convertirBooleanos(this.info.discapacidad),
            tipo_discapacidad : this.info.tipo_discapacidad,
            porc_disc_mental : this.info.porc_disc_mental,
            porc_disc_fisica : this.info.porc_disc_fisica,
            enfermedades : this.info.enfermedades
          };
        this.ListadoFinal.push(personaCompleta)        
        })
        
      }
    })
  }

  convertirBooleanos(bool : boolean) : string{
    if(bool == true){
      return 'Si'
    } else if (bool == false){
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
    pdf.pageMargins([ 10, 10 ]);
    pdf.add(this.creaTabla(this.ListadoFinal));
    pdf.create().open();
  }

  async exportSelected() {
    if (this.selected.length < 1) {
      alert('Por favor seleccione al menos un beneficiario')
    } else {
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
        new Txt('Fecha de reporte: ' + ((this.fechaCreacionReporte.getDate() < 10) ? '0' : '') + this.fechaCreacionReporte.getDate() + "-" 
          + (((this.fechaCreacionReporte.getMonth() + 1) < 10) ? '0' : '') + (this.fechaCreacionReporte.getMonth() + 1) + "-" 
          + this.fechaCreacionReporte.getFullYear() + ' Hora: ' + this.fechaCreacionReporte.getHours() + ":" 
          + this.fechaCreacionReporte.getMinutes()).alignment('right').end
      );
      pdf.add(new Txt('   ').end);
      pdf.add(
        new Txt('Lista de beneficiarios registrados').alignment('center').bold().fontSize(16).end
      );
      pdf.add(new Txt('   ').end);
      pdf.pageMargins([ 10, 10 ]);
      pdf.add(this.creaTabla(this.selected));
      pdf.create().open();
    }
  }

  creaTabla(data: PersonaInfo[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Nombres', 'Dirección', 'Celular', 'Correo', 'Genero',
        'Fecha de nacimiento', 'Edad', 'Nacionalidad', 'Estado civil', 'Faltas', 'Pareja'],
      ...this.extraerDatos(data),
    ])
      .widths([52, 100, 100, 52, 80, 45, 50, 28, 55, 50, 30, 30])
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
    return data.map((row) => [
      row.cedula,
      row.nombres+' '+row.apellidos,
      row.direccion,
      row.celular,
      row.correo,
      row.genero,
      row.fechaNacimiento,
      row.edad,
      row.nacionalidad,
      row.estado_civil,
      row.faltas,
      row.pareja
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
    location.reload();
  }
  //basura
  editarBeneficiario(cedula: string){
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigate(['/editar-beneficiarios']);
  }
  
  eliminarPersonaBeneficiario(i) {
    this.personaService.getUserByCedula(i).subscribe(data => {
      this.persona = data
      //INICIO
      var elimianar
      Swal.fire({
        title: 'Esta seguro de eliminar al beneficiario',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Beneficiario eliminado',
            'success'
          )
          elimianar = true;
          var verificacion = elimianar
          if (verificacion == true) {
            this.persona.beneficiario = false;
            this.persona.estadoActivo = false;
            this.personaService.updatePersona(this.persona).subscribe(data => {
            })
            var index2 = this.datos.indexOf(this.datos.find(x => x.cedula == i));
            this.datos.splice(index2, 1);
            this.personaArray = []
            this.cedulaArray = []
            this.familiaArray = []
            this.fichaArray = []
          }
        }
      });
    })
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
  familiares?: RegistroFamiliares[];
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
  porc_disc_fisica?: number;
  enfermedades?: string[];
}
