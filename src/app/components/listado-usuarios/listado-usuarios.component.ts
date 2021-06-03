import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
  
  // Listado de Usuario
  listaUsusarios:Usuarios[];
  // 
  totalUsuarios:any;

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.usuarioService.getAll().subscribe( data => {
      this.listaUsusarios= data;
      console.log(this.listaUsusarios)
    })
  }

  tipoUsuario(usuarioTipo: number): string{
    if(usuarioTipo == 1){
      return 'SuperAdministrador'
    } else if (usuarioTipo == 2) {
      return 'Administrador'
    } else if (usuarioTipo == 3) {
      return 'Voluntario Interno'
    } else if (usuarioTipo == 4) {
      return 'Voluntario Externo'
    }
  }

  calcularUsuarios() {
    let total = 0;
    for(let user of this.listaUsusarios) {
     //   total += user.;
    }

    //this.thisYearTotal = total;
}
 
}
