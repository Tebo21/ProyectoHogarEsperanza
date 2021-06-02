import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitasMedicas } from '../../../models/citas-medicas';
import { CitaMedicaService } from '../../../services/cita-medica.service';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.component.html',
  styleUrls: ['./listar-cita.component.css']
})
export class ListarCitaComponent implements OnInit {

  citaMedica!: Observable<CitasMedicas[]>;

  //cita: CitasMedicas[] = [];

  constructor(
    private citaMedicaS: CitaMedicaService,
    private router: Router
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit(): void {
    console.log('Si funciona hasta aqui');
    this.reloadData();
  }

  // tslint:disable-next-line: typedef
  reloadData(): void {
    this.citaMedica = this.citaMedicaS.listCentro();
    console.log('Si lista');
    console.log(this.citaMedica);
    // tslint:disable-next-line: deprecation
    /*this.citaMedicaS.listCentro().subscribe(data => {
      this.cita = data.data;
      console.log('DATA');
      console.log(data);
      console.log('CENTROM2');
      console.log(this.cita);
    });*/
  }

}
