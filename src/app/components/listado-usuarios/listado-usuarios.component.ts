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
  usuarioA: Usuarios = {};
  nuevoUser: Usuarios = {};

  displayEditar: boolean = false;
  usuarioEdit: Usuarios = {};
  listadoTipo: any[];
  tipo: any;
  valido: boolean;
  usuarioT: number;

  constructor(private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,) {
    this.listadoTipo = [
      { tip: 'SuperAdministrador' },
      { tip: 'Administrador' },
      { tip: 'Voluntario Interno' },
      { tip: 'Voluntario Externo' }
    ]
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

  //Selector de id automatico
  onChange(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.tip == 'SuperAdministrador') {
        this.usuarioT = 1;
      } else if (this.tipo.tip == 'Administrador') {
        this.usuarioT = 2;
      } else if (this.tipo.tip == 'Voluntario Interno') {
        this.usuarioT = 3;
      } else if (this.tipo.tip == 'Voluntario Externo') {
        this.usuarioT = 4;
      }
    }
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.getAll().subscribe(data => {
      this.listaUsusarios = data;
    })
  }

  //Editar
  showDialogEditar(usu: Usuarios) {
    this.displayEditar = true;
    this.usuarioA = usu;
  }

  actualizarUsuario() {
    const nu : Usuarios = {
      idUsuario: this.usuarioA.idUsuario,
      usuarioCedula: this.usuarioA.usuarioCedula,
      usuarioContrasenia: this.usuarioA.usuarioContrasenia,
      usuarioNombre: this.usuarioA.usuarioNombre,
      usuarioTipo: this.usuarioT
    }
    this.usuarioService.updateUser(nu).subscribe(data => {
      this.usuarioEdit = data;
      alert('Se ha actualizado exitosamente')
      window.location.reload();
    });
  }


  eliminarUsuario(id: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Está seguro de eliminar este usuario?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.deleteUser(id).subscribe(data => {
          this.usuario = data;
          console.log(this.usuario);

          window.location.reload();
        });
      },
      reject: () => {
      }
    });
  }
}
