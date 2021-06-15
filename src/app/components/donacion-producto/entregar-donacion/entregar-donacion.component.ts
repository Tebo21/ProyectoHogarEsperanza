import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donaciones } from 'src/app/models/Donaciones';
import { EntregaDonacion } from 'src/app/models/EntregaDonacion';
import { DonaProductoService } from 'src/app/services/dona-producto.service';
import { EntregarDonacionService } from 'src/app/services/entregar-donacion.service';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-entregar-donacion',
  templateUrl: './entregar-donacion.component.html',
  styleUrls: ['./entregar-donacion.component.css']
})
export class EntregarDonacionComponent implements OnInit {

  listaDonaciones: Array<Donaciones>;
  listaEntregaDonaciones: Array<EntregaDonacion>;

  cedulaBeneficiario: string;
  nombresBeneficiario: string;
  apellidosBeneficiario: string;

  constructor(private donacionService: DonaProductoService, private entregarDonacionService: EntregarDonacionService, private fichaSocioeconomicaService: FichaSocioeconomicaService, 
    private personaService: PersonasService, private router: Router) { }

  ngOnInit(): void {
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
      }
    )
  }

  buscarBeneficiario(){
    this.personaService.getPorCedula(this.cedulaBeneficiario).subscribe(
      data => {
        if (data!=null){
          this.nombresBeneficiario = data.nombres;
          this.apellidosBeneficiario = data.apellidos;

          this.fichaSocioeconomicaService.getfichacedula(data.cedula).subscribe(
            data => {
              if (data != null){
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
          alert("No se le ha donado aún");
        }
      }
    )
  }
}
