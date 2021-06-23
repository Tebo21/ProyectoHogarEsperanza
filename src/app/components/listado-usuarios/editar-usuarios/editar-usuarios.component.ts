import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { Usuarios } from 'src/app/models/usuarios';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { Usuarios2 } from '../listado-usuarios.component';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {
  //Comprobacion de Usuario
  cedUser: any;
  cedulaEditar: any;
  usuarioT: number;
  //Mensajes
  msgs: Message[];
  //Modelos
  usuario: Usuarios = {};
  usuarioActual: Usuarios = {};
  usuarioA: Usuarios = {};
  usuarioEdit: Usuarios = {};
  persona: Personas = {};

  //DropDown
  tipos: any[];
  tipo: any;
  valido: boolean = false;
  //Validaciones
  vistaTipo: boolean = true;
  nacionalidades: any[];
  nacio: any;
  estadocivil: any[];
  estado: any;
  generos: any[];
  genero: any;
  discap = false;
  usuarioConfirContrasenia: any;
  tipoUser: any;
  //Campos
  edadC: number;
  usuarioContraseniaAnterior: any;
  usuarioContrasenia: any;
  displayContra: boolean = false;

  constructor(private usuarioService: UsuarioService, private personaService: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.cedUser = localStorage.getItem('cedUser')
    this.cedulaEditar = localStorage.getItem('cedulaEditar')
    this.ComprobarLogin();
    this.tipos = [
      { string: 'SuperAdministrador' },
      { string: 'Administrador' },
      { string: 'Voluntario Interno' },
      { string: 'Voluntario Externo' }
    ];
    this.nacionalidades = [
      { nop: 'Ecuatoriano' },
      { nop: 'Afganistán' },
      { nop: 'Alemania' },
      { nop: 'Canadá' },
      { nop: 'China' },
      { nop: 'Perú' },
      { nop: 'Colombia' },
      { nop: 'Venezuela' },
      { nop: 'Uruguay' },
      { nop: 'México' },
      { nop: 'Honduras' }
    ]
    this.estadocivil = [
      { eop: 'Casado' },
      { eop: 'Viudo' },
      { eop: 'Divorciado' },
      { eop: 'Soltero' }
    ]
    this.generos = [
      { gop: 'Masculino' },
      { gop: 'Femenino' },
      { gop: 'Otro' }
    ]
    this.usuarioService.getUserByCedula(this.cedUser).subscribe(data => {
      this.usuarioActual = data;
    });
    this.usuarioService.getUserByCedula(this.cedulaEditar).subscribe(data2 => {
      this.usuario = data2;
    });
    this.personaService.getPorCedula(this.cedulaEditar).subscribe(data3 => {
      this.persona = data3;
      this.discap = this.persona.discapacidad;
    });
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1) {
    } else if (this.tipoUser == 3 || this.tipoUser == 4 || this.tipoUser == 2) {
      alert('No tiene permisos para editar usuarios')
      this.router.navigateByUrl('inicio-super-admin');
    }
  }

  onChange(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.string == 'SuperAdministrador') {

      } else if (this.tipo.string == 'Administrador') {

      } else if (this.tipo.string == 'Voluntario Interno') {

      } else if (this.tipo.string == 'Voluntario Externo') {

      }
    }
  }

  calcularedad(event: any) {
    let fecha = new Date(event.target.value);
    let fechactual = new Date();
    var f1 = fechactual.getFullYear() - fecha.getFullYear();
    this.persona.edad = f1
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

  Actualizar() {
    const nu: Usuarios = {
      idUsuario: this.usuarioA.idUsuario,
      usuarioCedula: this.usuarioA.usuarioCedula,
      usuarioContrasenia: this.usuarioA.usuarioContrasenia,
      usuarioNombre: this.usuarioA.usuarioNombre,
      usuarioTipo: this.usuarioT,
      usuarioEstado: true,
      usuarioFechaCreacion: this.usuarioA.usuarioFechaCreacion
    }
    this.usuarioService.updateUser(nu).subscribe(data => {
      this.usuarioEdit = data;
      alert('Se ha actualizado exitosamente')
      window.location.reload();
    });
  }

}
