import { Component, OnInit } from '@angular/core';

import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from '../../../models/personas';

@Component({
  selector: 'app-entrega-donaciones',
  templateUrl: './entrega-donaciones.component.html',
  styleUrls: ['./entrega-donaciones.component.css']
})
export class EntregaDonacionesComponent implements OnInit {

  buscaPersona: Personas;

  cedula: any;



    

  constructor( 
    private personaS: PersonasService, 

              ) { }

  ngOnInit(): void {
  }



}
