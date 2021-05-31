import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';

@Component({
  selector: 'app-ficha-socioeconomica',
  templateUrl: './ficha-socioeconomica.component.html',
  styleUrls: ['./ficha-socioeconomica.component.css']
})
export class FichaSocioeconomicaComponent implements OnInit {
  fichasocieconomicaModel: FichaSocioeconomica = new FichaSocioeconomica();
  fechaActual = new Date();
  constructor(private fichasocioserve:FichaSocioeconomicaService) { }

  ngOnInit(): void {
    this.fecha_actual()
  }


  fecha_actual(){
    let mes = this.fechaActual.getMonth()+1
    let fechahoy = this.fechaActual.getFullYear()+"/"+mes+"/"+this.fechaActual.getDate();
    let fechaActual2 = new Date(fechahoy);
    let fecha= formatDate(fechaActual2, 'yyyy-MM-dd ', 'en-ECU', '+0593');
    this.fichasocieconomicaModel.fechaRegistro=fecha;
  }

  addFicha(){
    var cedula_persona=localStorage.getItem('cedulalocalstorage'); 
    this.fichasocieconomicaModel.cedulaPersona=cedula_persona;
    this.fichasocioserve.postFichaSocio(this.fichasocieconomicaModel).subscribe(data=>{
      console.log("ficha 1 creada")
    });
    console.log("ficha 2 creada")
    confirm("ficha creada")
  }

}
