import { Component, OnInit } from '@angular/core';
import { CitasMedicas } from 'src/app/models/citas-medicas';
import { CitaMedicaService } from 'src/app/services/cita-medica.service';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-buscar-cita',
  templateUrl: './buscar-cita.component.html',
  styleUrls: ['./buscar-cita.component.css']
})
export class BuscarCitaComponent implements OnInit {

  citaMedica: any;
  
  // centro medico
  nombre: string;

  // personas
  cedula: string;

  // filtrar
  u: CitasMedicas = new CitasMedicas();
  citas: Array<CitasMedicas> = [];
  loading: boolean = true;

  constructor(private citaMedicaService: CitaMedicaService,
              private route: Router,
              public _actividadservice: ActividadesService) { }

  ngOnInit(): void {
    this.obtenerCitas();
  }


  obtenerCitas() {
    this.citaMedicaService.listCitas().subscribe((data) => {
      this.citas = data.map((result) => {
        let u = new CitasMedicas();
        u.descripcionCitaMedica = result.descripcionCitaMedica;
        u.fechaRegistro = result.fechaRegistro;
        u.fechaCitaMedica = result.fechaCitaMedica;
        u.paciente = result.paciente;
        u.acompaniante = result.acompaniante;
        u.mensaje = result.mensaje;
        u.trabajadorFundacion = result.trabajadorFundacion;
        u.centroMedico = result.centroMedico;
        u.especialidad = result.especialidad;
        u.nota = result.nota;

        return u;
      });
      this.loading = false;
    });
  }

  // btn para alerts
  registrar(){
    this.route.navigate(['/crear-citaM']);
  }

  /*GENERACION DE REPORTES */
  genereport(action = 'open') {
    var testImageDataUrl = this._actividadservice.img;
    let docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 40, 60, 40, 60 ],
      content: [
        {
          columns: [
            {
              image: testImageDataUrl,
              width: 100,
              margin: [0, 0, 0, 0],
            },
            {
              text: 'CITAS MEDICAS',
              fontSize: 27,
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
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            body: [
              [
                'DESCRIPCION',
                'CEDULA DEL PACIENTE',
                'CEDULA DEL ACOMPAÑANTE',
                'CORREO DEL MENSAJE',
                'CEDULA DEL DE LA FUNDACIÓN',
                'CENTRO MEDICO',
                'ESPECIALIDAD',
                'OBSERVACIONES',

              ],
              ...this.citas.map((row) => [
                row.descripcionCitaMedica,
                row.paciente,
                row.acompaniante,
                row.mensaje,
                row.trabajadorFundacion,
                row.centroMedico,
                row.especialidad,
                row.nota,
              ]),
            ],
          },
          alignment: 'center',
          margin: [20, 0, 0, 0],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
          pageOrientation: 'landscape',
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

  buscarNombre(){
    this.citaMedicaService.getPorNombre(this.nombre).subscribe(
      data => {
        if (data != null){
          this.citaMedica = data;
          console.log('se encontro');
          console.log(this.citaMedica);
        }else{
          alert('No hay resultados');
        }
      }
    );
  }

  buscarCedulaPa(){
    this.citaMedicaService.getPorCedulaPa(this.cedula).subscribe(
      data => {
        if (data != null){
          this.citaMedica = data;
          console.log('se encontro');
          console.log(this.citaMedica);
        }else{
          alert('No hay resultados');
        }
      }
    );
  }

  buscarCedulaAcom(){
    this.citaMedicaService.getPorCedulaAco(this.cedula).subscribe(
      data => {
        if (data != null){
          this.citaMedica = data;
          console.log('se encontro');
          console.log(this.citaMedica);
        }else{
          alert('No hay resultados');
        }
      }
    );
  }

  buscarCedulaPaTra(){
    this.citaMedicaService.getPorCedulaTra(this.cedula).subscribe(
      data => {
        if (data != null){
          this.citaMedica = data;
          console.log('se encontro');
          console.log(this.citaMedica);
        }else{
          alert('No hay resultados');
        }
      }
    );
  }

}
