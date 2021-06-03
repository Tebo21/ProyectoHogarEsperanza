import { Component, OnInit } from '@angular/core';
import { Donaciones } from 'src/app/models/Donaciones';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { DonaProductoService } from '../../../services/dona-producto.service';

@Component({
  selector: 'app-entrega-donacion',
  templateUrl: './entrega-donacion.component.html',
  styleUrls: ['./entrega-donacion.component.css']
})
export class EntregaDonacionComponent implements OnInit {
  donacionProd: FichaSocioeconomica={};

  listaDonaciones: Array<Donaciones> = [];

  cedulaPersona: string = '';

  nombreBeneficiario: string = '';
  edadBeneficiario: number ;
  direccionBeneficiario: string ='';
  estadoCivil: string = '';
//Modals
  alerta: string;
  display: boolean;
  displayF: boolean;


  constructor(
    private personaService: PersonasService, 
    private fichaSer:FichaSocioeconomicaService,
    private donacionService: DonaProductoService
    ) { }

  ngOnInit(): void {
    this.obtenerDonaciones();
  }
  

  /*buscarPersona(){   
    if(this.donacionProd.cedulaPersona == this.cedulaPersona ){
      this.personaService.getPorCedula(this.cedulaPersona).subscribe(
        data => {
          this.nombreBeneficiado = data.nombres + ' ' + data.apellidos;
          this.correoBeneficiado = data.correo;
          this.telefonoBeneficiado = data.celular;
        }) 
      
    }else{
      alert('Usted no es beneficiario')

    }  

  }*/
  buscarPersona(){      
      this.personaService.getPorCedula(this.cedulaPersona).subscribe(
        data => {
          this.nombreBeneficiario = data.nombres + ' ' + data.apellidos;
          this.edadBeneficiario = data.edad;
          this.direccionBeneficiario = data.direccion;
          this.estadoCivil = data.estado_civil;
        }) 
      
    }


    obtenerDonaciones(){
      this.donacionService.getDonaciones().subscribe(
        data => {
          this.listaDonaciones = data.map(
            result => {
              let donacion = new Donaciones;
  
              donacion.idDonacion = result.idDonacion;
              donacion.cantidad =  result.cantidad;
              donacion.categoria = result.categoria;
              donacion.cedulaPersona = result.cedulaPersona;
              donacion.descripcionDonacion = result.descripcionDonacion;
              donacion.fechaDonacion = result.fechaDonacion;
              donacion.nombreDonacion = result.nombreDonacion;
              
              return donacion;
            }
          )        
        }
      )
    } 
    donar(){ 
      this.alerta ="Cantidad a donar";      
      this.display = true;     

    }
  

}
