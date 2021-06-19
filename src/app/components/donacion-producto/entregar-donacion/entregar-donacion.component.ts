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

interface DataResponse {
  idEntregaDonacion: number;
  cedulaBeneficiario: string;
  productoEntregado: string;
  descripcionProducto: string;
  cantidadEntregada: number;
  fechaEntrega: Date ;
}
type TableRow = [number, string,string, string, number, Date];


@Component({
  selector: 'app-entregar-donacion',
  templateUrl: './entregar-donacion.component.html',
  styleUrls: ['./entregar-donacion.component.css']
})
export class EntregarDonacionComponent implements OnInit {

  listaDonaciones: Array<Donaciones>;
  listaEntregaDonaciones: Array<EntregaDonacion>;

  loading: boolean;

  cedulaBeneficiario: string;
  nombresBeneficiario: string;
  apellidosBeneficiario: string;
  direccionBeneficiario: string;

  valBeneficiario: boolean = false;
  today: Date;
  alerta: string;
  displayPE: boolean = false;

  entregaDonacion: EntregaDonacion;
  cantidadEntrega: number;

  displayED: boolean = false;

  productoEntrega: Donaciones;

  constructor(private donacionService: DonaProductoService, private entregarDonacionService: EntregarDonacionService, private fichaSocioeconomicaService: FichaSocioeconomicaService, 
    private personaService: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.obtenerDonaciones();
  }

  obtenerDonaciones(){
    this.listaDonaciones = [];
    this.donacionService.getDonaciones().subscribe(
      data => {
        this.listaDonaciones = data.map(
          result => {
            let donacion = new Donaciones;
            donacion.cantidad = result.cantidad;
            donacion.categoria = result.categoria;
            donacion.cedulaPersona = result.cedulaPersona;
            donacion.descripcionDonacion = result.descripcionDonacion;
            donacion.fechaDonacion = result.fechaDonacion;
            donacion.idDonacion = result.idDonacion;
            donacion.nombreDonacion = result.nombreDonacion;

            return donacion;
          }
        )
        this.loading = false;
      }
    )
  }

  buscarBeneficiario(){
    this.personaService.getPorCedula(this.cedulaBeneficiario).subscribe(
      data => {
        if (data!=null){
          this.nombresBeneficiario = data.nombres;
          this.apellidosBeneficiario = data.apellidos;
          this.direccionBeneficiario = data.direccion;

          this.fichaSocioeconomicaService.getfichacedula(data.cedula).subscribe(
            data => {
              if (data != null){
                this.displayPE = true;
                this.valBeneficiario = true;
                this.obtenerEntregas(this.cedulaBeneficiario);
              }else{
                alert('No existe Ficha Socioeconómica relacionada con esta cédula: '+this.cedulaBeneficiario);
              }
            }
          )
        }else{
          alert('Persona no encontrada en el sistema')
        }
      }
    )
  }

  obtenerEntregas(cedula: string){
    this.listaEntregaDonaciones = [];
    this.entregarDonacionService.getPorCedula(cedula).subscribe(
      data => {
        if (data!=null){
          this.listaEntregaDonaciones = data.map(
            result => {
              let entrega = new EntregaDonacion;
              entrega.cantidadEntregada = result.cantidadEntregada;
              entrega.cedulaBeneficiario = result.cedulaBeneficiario;
              entrega.descripcionProducto = result.descripcionProducto;
              entrega.fechaEntrega = result.fechaEntrega;
              entrega.idEntregaDonacion = result.idEntregaDonacion;
              entrega.productoEntregado = result.productoEntregado;

              return entrega;
            }
          )
        }else{
          this.alerta = 'No tiene entregas registradas';
        }
      }
    )
  }

  donarProducto(producto: Donaciones){
    if (this.valBeneficiario){
      this.displayED = true;

      this.productoEntrega = new Donaciones;

      this.productoEntrega.cantidad = producto.cantidad;
      this.productoEntrega.categoria = producto.categoria;
      this.productoEntrega.cedulaPersona = producto.cedulaPersona;
      this.productoEntrega.descripcionDonacion = producto.descripcionDonacion;
      this.productoEntrega.fechaDonacion = producto.fechaDonacion;
      this.productoEntrega.idDonacion = producto.idDonacion;
      this.productoEntrega.nombreDonacion = producto.nombreDonacion;

    }else{
      alert('No ha elegido un beneficiario aún!')
    }
  }

  entregarDonacion(){
    var verificacion = confirm('Seguro de donar ' + this.cantidadEntrega + ' unidades de ' + this.productoEntrega.nombreDonacion + "\n"
                                  + 'Al señor/a ' + this.nombresBeneficiario + ' ' + this.apellidosBeneficiario);
    if (verificacion){
      if (this.productoEntrega.cantidad > 0 && this.productoEntrega.cantidad > this.cantidadEntrega){
        this.entregaDonacion = new EntregaDonacion;
        this.entregaDonacion.cantidadEntregada = this.cantidadEntrega;
        this.entregaDonacion.cedulaBeneficiario = this.cedulaBeneficiario;
        this.entregaDonacion.descripcionProducto = this.productoEntrega.descripcionDonacion;
        this.entregaDonacion.fechaEntrega = this.today = new Date;
        this.entregaDonacion.productoEntregado = this.productoEntrega.nombreDonacion;

        this.entregarDonacionService.postEntrega(this.entregaDonacion).subscribe(
          data => {
            console.log(data);
            this.productoEntrega.cantidad = this.productoEntrega.cantidad - this.cantidadEntrega;
            this.donacionService.updateDonacionProd(this.productoEntrega.idDonacion, this.productoEntrega).subscribe(
              result => {
                console.log(result);
                alert('Entrega registrada!')
                this.reiniciar();
              }
            )
          }
        )
      }else{
        alert("Donacion insuficiente");
      }        
    }
  }

  registrarBeneficiario(){
    this.router.navigate(['/registro-persona'])
  }

  reiniciar(){
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
  async generaPdf() {
    const pdf = new PdfMakeWrapper();
    const data = await this.fetchData();

    pdf.info({
      title: 'Reporte de productos entregados a los beneficiarios',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de los productos entregados a los beneficiarios').alignment('center').bold()
        .end
    );
    pdf.add(new Txt('   ').end);
    pdf.add(this.creaTabla(data));
    pdf.create().open();
  }
  creaTabla(data: DataResponse[]): ITable {
    [{}];

    return new Table([
      ['#', 'Cedula Beneficiario', 'Producto Entregado', 'Descripcion del producto', 'Cantidad Entregada','Fecha Entrega'],
      ...this.extraerDatos(data),
    ])
   
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
      row.idEntregaDonacion,
      row.cedulaBeneficiario,
      row.productoEntregado,
      row.descripcionProducto,
      row.cantidadEntregada,
      row.fechaEntrega,
    ]);
  }

  async fetchData(): Promise<DataResponse[]> {
    return fetch('http://localhost:3000/entregaDonacion/lista').then(
      (response) => response.json()
    );
    
  }

}
