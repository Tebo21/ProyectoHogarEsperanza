import { Component, OnInit } from '@angular/core';
import { CitasMedicas } from 'src/app/models/citas-medicas';
import { CitaMedicaService } from 'src/app/services/cita-medica.service';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as faker from 'faker';


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
  loading = true;

  constructor(private citaMedicaService: CitaMedicaService,
              private route: Router,
              public _actividadservice: ActividadesService) { }

  ngOnInit(): void {
    this.obtenerCitas();
  }


  obtenerCitas() {
    this.citaMedicaService.listCitas().subscribe((data) => {
      this.citas = data.map((result) => {
        const u = new CitasMedicas();
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
  genereport(): void {
    const DATA = document.getElementById('TABLA');
    const doc = new jsPDF('l', 'mm', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      /*  let img = this._actividadservice.img;

       // Add image Canvas to PDF
        const bufferX = 3;
        const bufferY = 3;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 1 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');*/
        doc.text('CITAS MEDICAS', 10, 10);
        return doc;
    }).then((docResult) => {
      docResult.output('dataurlnewwindow');
      docResult.save(`${new Date().toISOString()}_CITASMEDICAS.pdf`);
    });

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
