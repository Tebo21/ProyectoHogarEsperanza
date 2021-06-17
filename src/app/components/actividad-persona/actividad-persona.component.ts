import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';
import { Actividades } from 'src/app/models/Actividades';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2/dist/sweetalert2.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-actividad-persona',
  templateUrl: './actividad-persona.component.html',
  styleUrls: ['./actividad-persona.component.css'],
})
export class ActividadPersonaComponent implements OnInit {
  catalogoId: number = 0;
  Person: Personas = new Personas();
  PersonAsId: Personas[] = [];
  PersonId: string;
  Actividadview: Actividades[] = [];
  ActividadviewActu: Actividades[] = [];
  values: any[] = [];
  fecha1: Date = new Date();
  fecha2: string = this.datapipe.transform(this.fecha1, 'yyyy-MM-dd');
  title: string = 'ACTIVIDADES';
  constructor(
    public _actividadservice: ActividadesService,
    public modalService: NgbModal,
    public personaService: PersonasService,
    public datapipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.PersonId = localStorage.getItem('carisma');
    this.getCedulaAndFecha();
  }

  async getPersonsById() {
    this.personaService.getPorCedula(this.PersonId).subscribe(
      (response) => {
        this.Person = response;
        this._actividadservice.open.emit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getCedulaAndFecha() {
    this.Actividadview = [];
    this.getPersonsById();
    this._actividadservice
      .getActividadCedulaAndFecha(this.fecha2)
      .subscribe((res) => {
        res.forEach((act) => {
          if (act.cedulaPersona.cedula == this.Person.cedula) {
            this.Actividadview.push(act);
          }
        });
      });
  }
  showExitoso() {
    Swal.fire({
      icon: 'success',
      title: 'Se elimino con exito!'
    });
  }
  trashActiv(id: number) {
    this.showExitoso();
    this._actividadservice.trahsActi(id).subscribe((res) => {
      window.location.reload();
    });
  }
  editActi(id: any) {
    this.setear();
    this.Actividadview.forEach((act) => {
      if (act.idActividadPersona == id) {
        this.ActividadviewActu.push(act);
      }
    });
  }
  setear() {
    this.ActividadviewActu = [];
  }
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
              text: 'REPORTES',
              fontSize: 16,
              margin: [125, 0, 0, 0],
              color: '#047886',
            },
          ],
        },
        {
          text: 'Actividades diarias',
          style: 'sectionHeader',
        },
        {
          columns: [
            [
              {
                text:
                  'NOMBRE: ' +
                  this.Person.nombres +
                  ' ' +
                  this.Person.apellidos,
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
                'Hora de Inicio',
                'Hora Fin',
                'Actividad Realizada',
                'Fecha',
                'Observaciones',
              ],
              ...this.Actividadview.map((row) => [
                row.horaInicio,
                row.horaFin,
                row.tipoActividad.nombreActividad,
                row.fechaActividad,
                row.descripcionActividad,
              ]),
            ],
          },
          alignment: 'center',
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
