import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/models/personas';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { RegistroFamiliares } from '../../models/registro-familiares';
import { Router } from '@angular/router';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-registro-familiares',
  templateUrl: './registro-familiares.component.html',
  styleUrls: ['./registro-familiares.component.css']
})
export class RegistroFamiliaresComponent implements OnInit {

 
  constructor(private famipersonaserve:RegistroFamiliaresService, private personaService:PersonasService, private router:Router) { }

  ngOnInit(): void {
   
  }

}