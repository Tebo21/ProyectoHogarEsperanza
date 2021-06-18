import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CitasMedicas } from 'src/app/models/citas-medicas';
import { CitaMedicaService } from 'src/app/services/cita-medica.service';

@Component({
  selector: 'app-buscar-cita',
  templateUrl: './buscar-cita.component.html',
  styleUrls: ['./buscar-cita.component.css']
})
export class BuscarCitaComponent implements OnInit {

  citaMedica!: Observable<CitasMedicas[]>;

  constructor(private citaMedicaService: CitaMedicaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  // tslint:disable-next-line: typedef
  reloadData(): void {
    this.citaMedica = this.citaMedicaService.listCitas();
    console.log('Si lista');
    console.log(this.citaMedica);
  }

}
