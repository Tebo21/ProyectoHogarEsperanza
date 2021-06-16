import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { of } from 'rxjs';
import { Donaciones } from 'src/app/models/Donaciones';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { DonaProductoService } from '../../../services/dona-producto.service';
import { Personas } from '../../../models/personas';

@Component({
  selector: 'app-entrega-donacion',
  templateUrl: './entrega-donacion.component.html',
  styleUrls: ['./entrega-donacion.component.css'],
})
export class EntregaDonacionComponent implements OnInit {
  total: number;

  valor: number;
  /*Array de donaciones Lista  */
  listaDonaciones: Array<Donaciones> = [];
  listaBeneficiados: Array<FichaSocioeconomica> = [];
  listadoPersonas: Array<Personas> = [];

  /**Modelo de donaciones */
  //donacionN: Donaciones = {};

  /*Atributos de la clase persona */
  cedulaPersona: string = '';
  nombreBeneficiario: string = '';
  edadBeneficiario: Number;
  direccionBeneficiario: string = '';
  estadoCivil: string = '';

  cedula: string;

  //Modals
  alerta: string;
  display: boolean;
  displayF: boolean;

  constructor(
    private personaService: PersonasService,
    private fichaSer: FichaSocioeconomicaService,
    private donacionService: DonaProductoService
  ) {}

  ngOnInit(): void {
    this.obtenerDonaciones();
  }

  buscarPersona() {
    this.fichaSer.getfichacedula(this.cedulaPersona).subscribe((data) => {
      if ( this.cedula = data.cedulaPersona) {
      //this.cedula = data.cedulaPersona;
      console.log(this.cedulaPersona);
    
        this.personaService.getPorCedula(this.cedulaPersona).subscribe((data1) => {
          this.cedulaPersona = data1.cedula;
          console.log(this.cedulaPersona);
    
            if (this.cedula === this.cedulaPersona) {
              this.nombreBeneficiario = data1.nombres + ' ' + data1.apellidos;
              this.edadBeneficiario = data1.edad;
              this.direccionBeneficiario = data1.direccion;
              this.estadoCivil = data1.estado_civil;
            } 
          });
        
      } else {
        alert('..');
        
      }


    });
  }

  /**
      this.personaService.getPorCedula(this.cedulaPersona).subscribe((data) => {
        this.nombreBeneficiario = data.nombres + ' ' + data.apellidos;
        this.edadBeneficiario = data.edad;
        this.direccionBeneficiario = data.direccion;
        this.estadoCivil = data.estado_civil;
    }); 
  */

  obtenerDonaciones() {
    this.donacionService.getDonaciones().subscribe((data) => {
      this.listaDonaciones = data.map((result) => {
        let donacion = new Donaciones();

        donacion.idDonacion = result.idDonacion;
        donacion.cantidad = result.cantidad;
        donacion.categoria = result.categoria;
        donacion.cedulaPersona = result.cedulaPersona;
        donacion.descripcionDonacion = result.descripcionDonacion;
        donacion.fechaDonacion = result.fechaDonacion;
        donacion.nombreDonacion = result.nombreDonacion;

        return donacion;
      });
    });
  }
  donar() {
    //this.alerta ="Cantidad a donar";
    //this.display = true;
    this.EntregaDonacion();
  }

  EntregaDonacion() {
    for (let cantidad of this.listaDonaciones) {
      if (cantidad.cantidad > 0) {
        this.alerta = 'Cantidad a donar';
        this.display = true;

        console.log(cantidad.cantidad - this.valor);

        this.total = cantidad.cantidad;

        /**Actualizacion de los datos */
        // const nueva: Donaciones = {
        //   cantidad: this.donacionN.cantidad
        // };
      } else {
        alert(
          'Usted no puede hacer la donacion del producto: ' +
            cantidad.nombreDonacion
        );
      }
    }
  }
  restar() {}
}
