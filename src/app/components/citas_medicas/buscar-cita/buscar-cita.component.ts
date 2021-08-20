import { Component, OnInit } from '@angular/core';
import { CitasMedicas } from 'src/app/models/citas-medicas';
import { CitaMedicaService } from 'src/app/services/cita-medica.service';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as faker from 'faker';
import { Img, ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

type TableRow = [string, string, string, string, string, string, string, string];

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
  citasFil: Array<CitasMedicas> = [];
  loading = true;

  // pdf
  selected: CitasMedicas[];

  constructor(private citaMedicaService: CitaMedicaService,
              private route: Router,
              public _actividadservice: ActividadesService) { }

  ngOnInit(): void {
    this.selected = [];
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

  onFilter(event, dt) {
    this.citasFil = [];
    this.citasFil = event.filteredValue;
  }


  /*GENERACION DE REPORTES */
  async exportSelected() {
    if (this.selected.length == 1) {
      const pdf = new PdfMakeWrapper();
      pdf.pageOrientation('landscape');
      pdf.pageSize('A4');
      pdf.info({
        title: 'Reporte de Citas Medicas Por Persona ',
      });
      pdf.add(await new Img('../../assets/img/logo.png').build());
      pdf.add(new Txt('   ').end);
      pdf.add(
        new Txt('Reporte de Citas Medicas Por Persona ').alignment('center').bold().fontSize(16).end
      );
      pdf.add(new Txt('   ').end);
      pdf.add(this.creaTabla(this.selected));
      pdf.create().open();
    } else {
      alert('Por favor seleccione solo uno');
    }
  }

  creaTabla(data: CitasMedicas[]): ITable {
    // tslint:disable-next-line: no-unused-expression
    [{}];
    return new Table([
      ['DESCRIPCION CITA', 'FEHCA DE LA CITA', 'HORA DE LA CITA', 'CEDUDLA DEL PACIENTE',
       'CEDULA DEL ACOMPAÑANTE', 'CENTRO MEDICO', 'ESPECIALIDAD', 'OBSERVACIONES'],
      ...this.extraerDatos(data),
    ])
      .widths(['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos(data: CitasMedicas[]): TableRow[] {
    return data.map((row) => [
      row.descripcionCitaMedica,
      row.fechaCitaMedica.substring(0, 10),
      row.fechaCitaMedica.substring(11),
      row.paciente,
      row.acompaniante,
      row.centroMedico,
      row.especialidad,
      row.nota
    ]);
  }


  // metodo para filtro
  async generarPdf(){
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    pdf.info({
        title: 'Reporte de Citas Medicas Por filtro ',
      });
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de citas Medicas por Busqueda').alignment('center').bold().fontSize(16).end
    );
    pdf.add(new Txt('   ').end);

    if (this.citasFil.length > 0){
      pdf.add(this.creaTabla2(this.citasFil));
    }else{
      pdf.add(this.creaTabla2(this.citas));
    }

    pdf.create().open();
  }

  creaTabla2(data: CitasMedicas[]): ITable {
    // tslint:disable-next-line: no-unused-expression
    [{}];
    return new Table([
      ['DESCRIPCION CITA', 'FEHCA DE LA CITA', 'HORA DE LA CITA', 'CEDUDLA DEL PACIENTE',
       'CEDULA DEL ACOMPAÑANTE', 'CENTRO MEDICO', 'ESPECIALIDAD', 'OBSERVACIONES'],
      ...this.extraerDatos2(data),
    ])
      .widths(['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos2(data: CitasMedicas[]): TableRow[] {
    return data.map((row) => [
      row.descripcionCitaMedica,
      row.fechaCitaMedica.substring(0, 10),
      row.fechaCitaMedica.substring(11),
      row.paciente,
      row.acompaniante,
      row.centroMedico,
      row.especialidad,
      row.nota
    ]);
  }


  buscarNombre(){
    this.citaMedicaService.getPorNombre(this.nombre).subscribe(
      data => {
        if (data != null){
          this.citaMedica = data;
          //console.log('se encontro');
          //console.log(this.citaMedica);
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
          //console.log('se encontro');
          //console.log(this.citaMedica);
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
          //console.log('se encontro');
          //console.log(this.citaMedica);
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
          //console.log('se encontro');
          //console.log(this.citaMedica);
        }else{
          alert('No hay resultados');
        }
      }
    );
  }

}
