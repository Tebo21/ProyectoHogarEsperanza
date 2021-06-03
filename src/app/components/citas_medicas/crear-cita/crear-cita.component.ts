import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentroMedico } from 'src/app/models/centro-medico';
import { CitasMedicas } from '../../../models/citas-medicas';
import { CitaMedicaService } from '../../../services/cita-medica.service';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Especialidad } from '../../../models/especialidad';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  cita: CitasMedicas = new CitasMedicas();
  centro: CentroMedico[] = [];
  especialidad: Especialidad[] = [];
  nombreSeCe: number;
  nombreSeEspecialidad: string;

  constructor(private citaMedicaService: CitaMedicaService,
              private serviCentro: CentroMedicoService,
              private router: Router,
              private serviceEspecialidad: EspecialidadService) { }

  // tslint:disable-next-line: typedef
  ngOnInit(): void {
    this.listCentro();
    this.listEspecialidad();
  }

  // tslint:disable-next-line: typedef
  save() {
   /* this.cita.idCentroMedico = this.nombreSeCe.toString();
    this.cita.especialidad = this.nombreSeEspecialidad;
    console.log(this.cita.idCentroMedico);
    console.log(this.centro);*/
    this.citaMedicaService.createCitas(this.cita)
      .subscribe(data => console.log(data), error => console.log(error));
    this.cita = new CitasMedicas();
    this.gotoList();
  }

  listCentro(){
    this.serviCentro.listCentro().subscribe(data => {
        this.centro = data;
    })
  }

  listEspecialidad(){
    this.serviceEspecialidad.listEspecialidad().subscribe(data => {
        this.especialidad = data;
        console.log(data);
    })
  }


  // tslint:disable-next-line: typedef
  gotoList() {
    this.router.navigate(['listar-citaM']);
  }

}
