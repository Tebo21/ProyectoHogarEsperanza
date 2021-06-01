import { Component, OnInit } from '@angular/core';
import { CitasMedicasService } from '../../../services/citas-medicas.service';

@Component({
  selector: 'app-listar-citam',
  templateUrl: './listar-citam.component.html',
  styleUrls: ['./listar-citam.component.css']
})
export class ListarCitamComponent implements OnInit {

  constructor(private citasMedicasService: CitasMedicasService) {
    citasMedicasService.getCistasM().subscribe(data => {
      console.log(data);
    });
    console.log("hola estoy aqui");
  }

  ngOnInit(): void {
  }

}
