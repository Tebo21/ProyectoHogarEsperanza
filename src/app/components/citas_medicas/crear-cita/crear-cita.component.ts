import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasMedicas } from '../../../models/citas-medicas';
import { CitaMedicaService } from '../../../services/cita-medica.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  cita: CitasMedicas = new CitasMedicas();
  submitted = false;

  constructor(private citaMedicaService: CitaMedicaService,
              private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.cita = new CitasMedicas();
  }

  // tslint:disable-next-line: typedef
  save() {
    this.citaMedicaService.createCitas(this.cita)
      .subscribe(data => console.log(data), error => console.log(error));
    this.cita = new CitasMedicas();
    this.gotoList();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    this.save();
  }

  // tslint:disable-next-line: typedef
  gotoList() {
    this.router.navigate(['/Init/listar-citaM']);
  }

}
