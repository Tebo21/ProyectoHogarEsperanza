import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  providers: [ConfirmationService]
})
export class ListadoUsuariosComponent implements OnInit {
  listaUsusarios: Usuarios[];
  usuario: Usuarios = {};
  displayEditar: boolean = false;
  usuarioEdit: Usuarios={};
  listadoTipo: any[];
  tipo: any;

  constructor(private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,) {

    this.listadoTipo = [
      { tip: 'SuperAdministrador' },
      { tip: 'Administrador' },
      { tip: 'Voluntario Interno' },
      { tip: 'Voluntario Externo' }
    ]


  }

  //Editar
  showDialogEditar(usu: Usuarios) {
    console.log(usu);
    
     this.usuarioService.updateUser(usu).subscribe(data => {
       this.usuarioEdit=data;
       console.log(this.usuarioEdit);
       this.displayEditar = true;
     });
   }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.getAll().subscribe(data => {
      this.listaUsusarios = data;
    })
  }

  tipoUsuario(usuarioTipo: number): string {
    if (usuarioTipo == 1) {
      return 'SuperAdministrador'
    } else if (usuarioTipo == 2) {
      return 'Administrador'
    } else if (usuarioTipo == 3) {
      return 'Voluntario Interno'
    } else if (usuarioTipo == 4) {
      return 'Voluntario Externo'
    }
  }
  actualizarUsuario() {

  }

  eliminarUsuario(id: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Está seguro de eliminar este usuario?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.deleteUser(id).subscribe(data => {
          this.usuario=data;
          console.log(this.usuario);
          
          window.location.reload();
        });
      },
      reject: () => {
      }
    });
  }
}
