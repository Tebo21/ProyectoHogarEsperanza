import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { CentroMedico } from '../../../models/centro-medico';
import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


interface DataResponse {
  idEspecialidad: number;
  nombreEspecialidad: string;
  centroMedico: string;
}
type TableRow = [number, string, string];


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  esp: Array<Especialidad>;
  espFiltradas: Array<Especialidad> = [];
  loading: boolean = true;
  centro: CentroMedico[] = [];
  selectedEspecialidad: Especialidad = new Especialidad();
  nombreSeCe: any;

  response_condicion: boolean = false;
  response_msg: String;

  tipoUser : any;

  constructor(
    private service: EspecialidadService,
    private serviceCentro: CentroMedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ComprobarLogin()
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1 || this.tipoUser == 2) {
      this.obtenerEspecialidad();
      this.listCentro();
    } else if (this.tipoUser == 3 || this.tipoUser == 4) {
      Swal.fire({
        title: 'No tiene permisos para registrar especialidades',
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

  onFilter(event, dt) {
    this.espFiltradas = [];
    this.espFiltradas = event.filteredValue;
  }

  listCentro() {
    this.serviceCentro.listCentro().subscribe((data) => {
      this.centro = data;
    });
  }

  obtenerEspecialidad() {
    this.service.listEspecialidad().subscribe((data) => {
      this.esp = data.map((result) => {
        let e = new Especialidad();
        e.idEspecialidad = result.idEspecialidad;
        e.nombreEspecialidad = result.nombreEspecialidad;
        e.centroMedico = result.centroMedico;

        return e;
      });
      this.loading = false;
    });
  }

  openForEdit(espe: Especialidad) {
    this.selectedEspecialidad = espe;
    this.nombreSeCe = espe.centroMedico;
  }

  addOrEdit() {
    if (this.selectedEspecialidad.idEspecialidad) {
      if (this.validar_datos(this.selectedEspecialidad) == true) {
        this.selectedEspecialidad.centroMedico = this.nombreSeCe.nombreCentroMedico;
        this.service
          .updateEspecialidad(
            this.selectedEspecialidad.idEspecialidad,
            this.selectedEspecialidad
          )
          .subscribe((data) => {
            if (data) {
              alert('Especialidad editada');
              this.obtenerEspecialidad();
              this.selectedEspecialidad = new Especialidad();
            }
          });
      }
    } else {
      this.selectedEspecialidad.centroMedico = this.nombreSeCe.nombreCentroMedico;
      if (this.validar_datos(this.selectedEspecialidad) == true) {
        this.service
          .createEspecialidad(this.selectedEspecialidad)
          .subscribe((data) => {
            if (data) {
              alert('Especialidad agregada');
              this.selectedEspecialidad = new Especialidad();
              this.show_response('');
              this.obtenerEspecialidad();
            }
          });
      }
    }
  }

  deleteEspecialidad(esp: Especialidad) {
    let response = confirm(`¿Desea eliminar: ${esp.nombreEspecialidad}?`);
    if (response == true) {
      this.service.deleteEspecialidad(esp.idEspecialidad).subscribe((data) => {
        this.obtenerEspecialidad();
        alert(`${esp.nombreEspecialidad} fue eliminado`);
      });
    }
  }

  /*VALIDACION DE CAMPOS */

  validar_datos(esp: Especialidad): boolean {
    if (this.validar_nombre(esp.nombreEspecialidad) == false) {
      return false;
    }

    return true;
  }

  validar_nombre(nombre: String) {
    if (Boolean(nombre) && nombre.length > 0) {
      return true;
    } else {
      this.show_response('Campo nombre vacío');
      return false;
    }
  }

  show_response(msg: String) {
    this.response_condicion = true;
    this.response_msg = msg;
  }


  /* GENERAR REPORTE EN PDF */
  async crearReporte() {
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    pdf.info({
      title: 'Reporte de Especialidades',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());   
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de especialidades').alignment('center').bold().fontSize(16).end
    );
    pdf.add(new Txt('   ').end);
    if(this.espFiltradas.length > 0){
      pdf.add(this.creaTabla(this.espFiltradas));
    }else{
      pdf.add(this.creaTabla(this.esp));
    }
    
    pdf.create().open();
  }

  creaTabla(data: DataResponse[]): ITable {
    [{}];
    return new Table([
      ['ID', 'Especialidad', 'Centro médico'],
      ...this.extraerDatos(data),
    ])
      .widths('*')
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        /**% 2 */
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos(data: DataResponse[]): TableRow[] {
    return data.map((row) => [
      row.idEspecialidad,
      row.nombreEspecialidad,
      row.centroMedico,
    ]);
  }

}
