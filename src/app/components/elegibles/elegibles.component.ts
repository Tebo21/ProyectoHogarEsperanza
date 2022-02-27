import { Component, OnInit } from '@angular/core';
import { Actividades } from 'src/app/models/Actividades';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-elegibles',
  templateUrl: './elegibles.component.html',
  styleUrls: ['./elegibles.component.css']
})
export class ElegiblesComponent implements OnInit {

  constructor(public _actividadservice: ActividadesService) { }

  Actividadview: Actividades[] = [];
  Actividadview1: Actividades[] = [];
  
  ngOnInit(): void {
    this.mostrarTipoActividades();
  }

  mostrarTipoActividades(): void {
    this._actividadservice.getAll().subscribe(
      (response) => {
        this.Actividadview=response

    this.Actividadview.forEach(res=>{
      this.Actividadview1.push(res)
    })
    console.log(this.Actividadview1.length);
      }
  );
  }

}
