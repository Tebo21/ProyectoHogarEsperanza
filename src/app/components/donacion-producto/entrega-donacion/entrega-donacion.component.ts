import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-entrega-donacion',
  templateUrl: './entrega-donacion.component.html',
  styleUrls: ['./entrega-donacion.component.css']
})
export class EntregaDonacionComponent implements OnInit {
  donacionProd: FichaSocioeconomica={};

  cedulaPersona: string = '';

  nombreBeneficiado: string = '';
  correoBeneficiado: string = '';
  telefonoBeneficiado: string = '';

  constructor(private personaService: PersonasService, fichaSer:FichaSocioeconomicaService) { }

  ngOnInit(): void {
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
          this.nombreBeneficiado = data.nombres + ' ' + data.apellidos;
          this.correoBeneficiado = data.correo;
          this.telefonoBeneficiado = data.celular;
        }) 
      
    }
  

}
