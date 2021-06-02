import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
  listaUsusarios:Usuarios[];
  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }


  

  listarUsuarios(){
    this.usuarioService.getAll().subscribe( data => {
      this.listaUsusarios= data;
    })

  }
 
}
