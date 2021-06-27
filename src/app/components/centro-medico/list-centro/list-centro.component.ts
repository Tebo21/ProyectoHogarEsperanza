import { Component, OnInit } from '@angular/core';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CentroMedico } from '../../../models/centro-medico';
import { ActividadesService } from '../../../services/actividades.service';
import { DatePipe } from '@angular/common';
import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';

interface DataResponse {
  idCentroMedico: number;
  nombreCentroMedico: string;
  direccionCentroMedico: string;
  telefonoCentroMedico: string;
}
type TableRow = [number, string, string, string];

@Component({
  selector: 'app-list-centro',
  templateUrl: './list-centro.component.html',
  styleUrls: ['./list-centro.component.css'],
})
export class ListCentroComponent implements OnInit {
  centro: Array<CentroMedico> = [];
  selectedCentro: CentroMedico = new CentroMedico();
  loading: boolean = true;

  response_condicion: boolean = false;
  response_msg: String;

  constructor(
    private service: CentroMedicoService,
    public _actividadservice: ActividadesService,
    public modalService: NgbModal,
    public datapipe: DatePipe
  ){
    
  }

  ngOnInit(): void {
    this.listCentro();
  }

  listCentro() {
    this.service.listCentro().subscribe((data) => {
      this.centro = data.map((result) => {
        let c = new CentroMedico();
        c.idCentroMedico = result.idCentroMedico;
        c.nombreCentroMedico = result.nombreCentroMedico;
        c.direccionCentroMedico = result.direccionCentroMedico;
        c.telefonoCentroMedico = result.telefonoCentroMedico;

        return c;
      });
      this.loading = false;
    });
  }
  deleteCentro(centro: CentroMedico) {
    let response = confirm(`¿Desea eliminar: ${centro.nombreCentroMedico}?`);
    if (response == true) {
      this.service.deletCentro(centro.idCentroMedico).subscribe((data) => {
        alert(`${centro.nombreCentroMedico} fue eliminado`);
        this.listCentro();
      });
    }
  }

  openForEdit(centro: CentroMedico) {
    this.selectedCentro = centro;
  }

  addOrEdit() {
    if (this.selectedCentro.idCentroMedico) {
      if (this.validar_datos(this.selectedCentro) == true) {
        this.service
          .updateCentro(this.selectedCentro.idCentroMedico, this.selectedCentro)
          .subscribe((data) => {
            if (data) {
              alert('Centro médico editado');
              this.listCentro();
              this.selectedCentro = new CentroMedico();
            }
          });
      }
    } else {
      if (this.validar_datos(this.selectedCentro) == true) {
        this.service.createCentro(this.selectedCentro).subscribe((data) => {
          if (data) {
            this.listCentro();
            alert('Centro médico agregado');
            this.selectedCentro = new CentroMedico();
            this.show_response('');
            this.listCentro();
          }
        });
      }
    }
  }

  /*VALIDACION DE CAMPOS */

  validar_datos(centro: CentroMedico): boolean {
    if (this.validar_nombre(centro.nombreCentroMedico) == false) {
      return false;
    }

    if (this.validar_direccion(centro.direccionCentroMedico) == false) {
      return false;
    }

    if (this.validar_telefono(centro.telefonoCentroMedico) == false) {
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

  validar_direccion(direccion: String) {
    if (Boolean(direccion) && direccion.length > 0) {
      return true;
    } else {
      this.show_response('Campo dirección vacío');
      return false;
    }
  }

  validar_telefono(telefono: String) {
    if (Boolean(telefono) && telefono.length > 0) {
      return true;
    } else {
      this.show_response('Campo teléfono vacío');
      return false;
    }
  }

  show_response(msg: String) {
    this.response_condicion = true;
    this.response_msg = msg;
  }


  /*GENERACION DE REPORTES */
  async genereport() {
    const pdf = new PdfMakeWrapper();
    const data = await this.fetchData();

    pdf.info({
      title: 'Reporte de Centros Médicos',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());
  
    pdf.add(
      new Txt('Lista de Centros Médicos').alignment('center').bold().end
    );
    pdf.add(new Txt('   ').end);
    pdf.add(this.creaTabla(data));
    pdf.create().open();
  }
  creaTabla(data: DataResponse[]): ITable {
    [{}];
    return new Table([
      ['ID', 'Centro médico', 'Dirección', 'Teléfono'],
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
      row.idCentroMedico,
      row.nombreCentroMedico,
      row.direccionCentroMedico,
      row.telefonoCentroMedico
    ]);
  }

  async fetchData(): Promise<DataResponse[]> {
    return fetch('http://localhost:3000/centroMedico/listado').then(
      (response) => response.json()
    );
  }

}
