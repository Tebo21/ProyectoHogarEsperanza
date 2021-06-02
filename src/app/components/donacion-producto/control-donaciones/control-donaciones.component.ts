import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donaciones } from 'src/app/models/Donaciones';
import { DonaProductoService } from 'src/app/services/dona-producto.service';

@Component({
  selector: 'app-control-donaciones',
  templateUrl: './control-donaciones.component.html',
  styleUrls: ['./control-donaciones.component.css']
})
export class ControlDonacionesComponent implements OnInit {

  constructor(private donacionService: DonaProductoService, private router: Router ) { }

  listaDonaciones: Array<Donaciones> = [];

  ngOnInit(): void {
    this.obtenerDonaciones();
  }

  obtenerDonaciones(){
    this.donacionService.getDonaciones().subscribe(
      data => {
        this.listaDonaciones = data.map(
          result => {
            let donacion = new Donaciones;

            donacion.idDonacion = result.idDonacion;
            donacion.cantidad =  result.cantidad;
            donacion.categoria = result.categoria;
            donacion.cedulaPersona = result.cedulaPersona;
            donacion.descripcionDonacion = result.descripcionDonacion;
            donacion.fechaDonacion = result.fechaDonacion;
            donacion.nombreDonacion = result.nombreDonacion;
            
            return donacion;
          }
        )        
      }
    )
  }  

  navegar(){
    this.router.navigate(['/Init/registro-producto'])
  }

  eliminar(donacion: Donaciones){
    this.donacionService.deleteDonacionProd(donacion.idDonacion).subscribe(
      data => {
        if (data == true){
          alert('Produto eliminado!');
          this.listaDonaciones = [];
          this.obtenerDonaciones();
        }
      }
    )
  }

}
