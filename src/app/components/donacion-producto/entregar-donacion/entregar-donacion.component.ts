import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donaciones } from 'src/app/models/Donaciones';
import { EntregaDonacion } from 'src/app/models/EntregaDonacion';
import { DonaProductoService } from 'src/app/services/dona-producto.service';
import { EntregarDonacionService } from 'src/app/services/entregar-donacion.service';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { PdfMakeWrapper, Txt, Img, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import Swal from 'sweetalert2';
import { Personas } from 'src/app/models/personas';
import pdfMake from 'pdfmake/build/pdfmake';

import { DatePipe, formatDate, getLocaleDateFormat } from '@angular/common';
import * as internal from 'node:stream';

type TableRow2 = [string, string, string, number, Date];


@Component({
  selector: 'app-entregar-donacion',
  templateUrl: './entregar-donacion.component.html',
  styleUrls: ['./entregar-donacion.component.css'],
})
export class EntregarDonacionComponent implements OnInit { 

  listaDonaciones: Array<Donaciones>;
  listaEntregaDonaciones: Array<EntregaDonacion>; 

  loading: boolean = true;

  cedulaBeneficiario: string;
  nombresBeneficiario: string;
  apellidosBeneficiario: string;
  direccionBeneficiario: string;

  valBeneficiario: boolean = false;
  today: Date;
  

  displayPE: boolean = false;

  entregaDonacion: EntregaDonacion;
  cantidadEntrega: number;

  displayED: boolean = false;

  productoEntrega: Donaciones;




  constructor(
    private donacionService: DonaProductoService,
    private entregarDonacionService: EntregarDonacionService,
    private fichaSocioeconomicaService: FichaSocioeconomicaService,
    private personaService: PersonasService,
    private router: Router,
    public datapipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.obtenerDonaciones();
  }

  obtenerDonaciones() {
    this.listaDonaciones = [];
    this.donacionService.getDonaciones().subscribe((data) => {
      this.listaDonaciones = data.map((result) => {
        let donacion = new Donaciones();
        donacion.cantidad = result.cantidad;
        donacion.categoria = result.categoria;
        donacion.cedulaPersona = result.cedulaPersona;
        donacion.descripcionDonacion = result.descripcionDonacion;       
        donacion.fechaDonacion = result.fechaDonacion;
        donacion.idDonacion = result.idDonacion;
        donacion.nombreDonacion = result.nombreDonacion;

        return donacion;
      });
      this.loading = false;
    });
  }

  buscarBeneficiario() {
    this.personaService
      .getPorCedula(this.cedulaBeneficiario)
      .subscribe((data) => {
        if (data != null) {
          this.nombresBeneficiario = data.nombres;
          this.apellidosBeneficiario = data.apellidos;
          this.direccionBeneficiario = data.direccion;

          this.fichaSocioeconomicaService
            .getfichacedula(data.cedula)
            .subscribe((data) => {
              if (data != null) {
                this.displayPE = true;
                this.valBeneficiario = true;
                this.obtenerEntregas(this.cedulaBeneficiario);
              } else {
                this.valBeneficiario = false;
                Swal.fire({
                  title:
                    'No hay Ficha Socioeconómica relacionada con la cédula:',
                  text: this.cedulaBeneficiario,
                  icon: 'warning',
                });
              }
            });
        } else {
          this.valBeneficiario = false;
          Swal.fire({
            title: 'Persona no registrada en el sistema!',
            icon: 'warning',
          });
        }
      });
  }

  obtenerEntregas(cedula: string) {
    
    this.listaEntregaDonaciones = [];
    this.entregarDonacionService.getPorCedula(cedula).subscribe((data) => {
      if (data != null) {
        this.listaEntregaDonaciones = data.map((result) => {
          let entrega = new EntregaDonacion();
          entrega.cantidadEntregada = result.cantidadEntregada;
          entrega.cedulaBeneficiario = result.cedulaBeneficiario;
          entrega.descripcionProducto = result.descripcionProducto;
          entrega.fechaEntrega =result.fechaEntrega;
          entrega.idEntregaDonacion = result.idEntregaDonacion;         
          entrega.productoEntregado = result.productoEntregado; 
          
          return entrega;
         

        });
      } else {
        console.log('No se encontraron donaciones');
      }
    });
  }

  donarProducto(producto: Donaciones) {
    if (this.valBeneficiario) {
      this.displayED = true;

      this.productoEntrega = new Donaciones();

      this.productoEntrega.cantidad = producto.cantidad;
      this.productoEntrega.categoria = producto.categoria;
      this.productoEntrega.cedulaPersona = producto.cedulaPersona;
      this.productoEntrega.descripcionDonacion = producto.descripcionDonacion;
      this.productoEntrega.fechaDonacion = producto.fechaDonacion;
      this.productoEntrega.idDonacion = producto.idDonacion;
      this.productoEntrega.nombreDonacion = producto.nombreDonacion;
    } else {
      Swal.fire({
        title: 'No ha elegido un beneficiario aún!',
        icon: 'warning',
      });
    }
  }

  entregarDonacion() {
    this.displayED = false;
    Swal.fire({
      title: '¿Seguro de donar?',
      text:
        'Se le hará la entrega de ' +
        this.cantidadEntrega +
        ' unidades de ' +
        this.productoEntrega.nombreDonacion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, donar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          this.productoEntrega.cantidad > 0 &&
          this.productoEntrega.cantidad > this.cantidadEntrega
        ) {
          this.entregaDonacion = new EntregaDonacion();
          this.entregaDonacion.cantidadEntregada = this.cantidadEntrega;
          this.entregaDonacion.cedulaBeneficiario = this.cedulaBeneficiario;
          this.entregaDonacion.descripcionProducto =
          this.productoEntrega.descripcionDonacion;
          this.entregaDonacion.fechaEntrega = this.today = new Date;
          this.entregaDonacion.productoEntregado =
            this.productoEntrega.nombreDonacion;

          this.entregarDonacionService
            .postEntrega(this.entregaDonacion)
            .subscribe((data) => {
              console.log(data);
              this.productoEntrega.cantidad =
                this.productoEntrega.cantidad - this.cantidadEntrega;
              this.donacionService
                .updateDonacionProd(
                  this.productoEntrega.idDonacion,
                  this.productoEntrega
                )
                .subscribe((result) => {
                  console.log(result);
                  Swal.fire({
                    title: 'Entrega registrada!',
                    icon: 'success',
                  });
                  this.reiniciar();
                });
            });
        } else {
          Swal.fire({
            title: 'Donacion insuficiente!',
            icon: 'warning',
          });
        }
      } else {
        this.displayED = true;
      }
    });
  }

  registrarBeneficiario() {
    this.router.navigate(['/registro-persona']);
  }

  reiniciar() {
    this.obtenerDonaciones();
    this.valBeneficiario = false;
    this.cedulaBeneficiario = '';
    this.nombresBeneficiario = '';
    this.apellidosBeneficiario = '';
    this.direccionBeneficiario = '';
    this.displayED = false;
    this.displayPE = false;
    this.cantidadEntrega = 0;
  }

  listaEntregaProducto() {
    this.router.navigate(['lista']);
  }  
  showConfirmacionPDF(){
    Swal.fire({
      title: '¿Estas seguro de descargar este reporte?',
      text: "Se abrira una visualizacion de su reporte",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, descargar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generaPdf();
        Swal.fire(
          'Descargado!',
          'El registro ha sido descargado',
          'success'
        )
      }
    })
  }

  async generaPdf() {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Reporte de productos entregados ',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(    
      new Txt('Usuario: ' + (this.nombresBeneficiario +' '+this.apellidosBeneficiario)).alignment('right').end
      );
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de los productos entregados ').alignment('center').bold().fontSize(16).end
    );
    pdf.add(new Txt('   ').end);
    pdf.add(this.creaTabla2(this.listaEntregaDonaciones));
    pdf.create().open();
  }
  creaTabla2(data: EntregaDonacion[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Producto Entregado', 'Descripcion','Cantidad', 'Fecha entrega'],
      ...this.extraerDatos2(data),
    ])
    
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos2(data: EntregaDonacion[]): TableRow2[] {
    return data.map((row) => [
      row.cedulaBeneficiario,
      row.productoEntregado,
      row.descripcionProducto,
      row.cantidadEntregada,     
      row.fechaEntrega,    
    ]);

  }

 
 
}
