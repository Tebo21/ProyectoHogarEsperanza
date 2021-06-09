import { Component, OnInit } from '@angular/core';
import { CentroMedico } from 'src/app/models/centro-medico';
import { CitasMedicas } from '../../../models/citas-medicas';
import { CitaMedicaService } from '../../../services/cita-medica.service';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Especialidad } from '../../../models/especialidad';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  cita: CitasMedicas = new CitasMedicas();
  citaMedica!: Observable<CitasMedicas[]>;
  centro: CentroMedico[] = [];
  especialidad: Especialidad[] = [];
  nombreSeCe: string;
  nombreSeEspecialidad: string;

  constructor(private citaMedicaService: CitaMedicaService,
              private serviCentro: CentroMedicoService,
              private serviceEspecialidad: EspecialidadService) { }

  // tslint:disable-next-line: typedef
  ngOnInit(): void {
    this.reloadData();
    this.listCentro();
    this.listEspecialidad();
  }


  // tslint:disable-next-line: typedef
  reloadData(): void {
    this.citaMedica = this.citaMedicaService.listCitas();
    console.log('Si lista');
    console.log(this.citaMedica);
  }



  listCentro(){
    this.serviCentro.listCentro().subscribe(data => {
        this.centro = data;
    });
  }

  listEspecialidad(){
    this.serviceEspecialidad.listEspecialidad().subscribe(data => {
        this.especialidad = data;
    });
  }

  // tslint:disable-next-line: typedef
  save() {
    this.cita.centroMedico = this.nombreSeCe;
    console.log(this.nombreSeCe);
    this.cita.especialidad = this.nombreSeEspecialidad;
    console.log(this.nombreSeEspecialidad);
    this.citaMedicaService.createCitas(this.cita)
      .subscribe( (data) => {
      if (data){
      alert('Cita Medica Registrada Correcamente');
      this.cita = new CitasMedicas();
      this.reloadData();
      this.listCentro();
      this.listEspecialidad();
        }
    });
  }


  deleteCita(cita: CitasMedicas) {
    let response = confirm(`¿Desea eliminar: ${cita.descripcionCitaMedica}?`);
    console.log("RESPONSE:")
    console.log(response);
    if (response == true) {
      this.citaMedicaService.deletCita(cita.idCitasMedicas).subscribe(data => {
          alert(`${cita.descripcionCitaMedica} fue eliminado`);
          this.reloadData(); 
      });
    }
  }
}
