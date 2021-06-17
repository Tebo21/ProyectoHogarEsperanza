import { Component, OnInit } from '@angular/core';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CentroMedico } from '../../../models/centro-medico';
import { ActividadesService } from '../../../services/actividades.service';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-list-centro',
  templateUrl: './list-centro.component.html',
  styleUrls: ['./list-centro.component.css'],
})
export class ListCentroComponent implements OnInit {
  centro: CentroMedico[] = [];
  selectedCentro: CentroMedico = new CentroMedico();

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
      this.centro = data;
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
              alert('Centro medico editado');
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
            alert('Centro medico agregado');
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
  genereport(action = 'open') {
    var testImageDataUrl = this._actividadservice.img;
    let docDefinition = {
      content: [
        {
          columns: [
            {
              image: testImageDataUrl,
              width: 100,
              margin: [0, 0, 0, 0],
            },
            {
              text: 'CENTROS MÉDICOS',
              fontSize: 17,
              bold: true,
              margin: [100, 0, 0, 0],
              color: '#047886',
            },
          ],
        },
        {
          text: '',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 3,
            body: [
              [
                'NOMBRE',
                'DIRECCIÓN',
                'TELÉFONO',
              ],
              ...this.centro.map((row) => [
                row.nombreCentroMedico,
                row.direccionCentroMedico,
                row.telefonoCentroMedico,
              ]),
            ],
          },
          alignment: 'center',
          margin: [135, 0, 0, 0],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
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
