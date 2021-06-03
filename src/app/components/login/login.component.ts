import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Comprobacion de Logeo
  user: Usuarios = {
    usuarioCedula: '',
    usuarioContrasenia: '',
    usuarioTipo: 0
  };
  userRecibido: Usuarios = {}
  //Modals
  display: boolean;
  displayF: boolean;
  alerta: string;
  //DropDown
  tipos: any[];
  tipo: any;
  valido: boolean = false;

  constructor(private loginservce: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.display = false;
    this.tipos = [
      { string: 'SuperAdministrador' },
      { string: 'Administrador' },
      { string: 'Voluntario Interno' },
      { string: 'Voluntario Externo' }
    ];
  }

  onChange(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.string == 'SuperAdministrador') {
        this.user.usuarioTipo = 1;
      } else if (this.tipo.string == 'Administrador') {
        this.user.usuarioTipo = 2;
      } else if (this.tipo.string == 'Voluntario Interno') {
        this.user.usuarioTipo = 3;
      } else if (this.tipo.string == 'Voluntario Externo') {
        this.user.usuarioTipo = 4;
      }
    }
  }

  Validar() {
    if (this.user.usuarioCedula != '' || this.user.usuarioContrasenia != '' ||
      this.user.usuarioCedula != undefined || this.user.usuarioContrasenia != undefined || this.valido == false) {
      this.Logearse();
    } else {
      this.alerta = 'Rellene todos los campos y seleccione un tipo de usuario por favor'
      this.display = true;
    }
  }



  Logearse() {
    this.loginservce.getLogin(this.user.usuarioCedula, this.user.usuarioContrasenia, this.user.usuarioTipo).subscribe(data => {
      this.userRecibido = data;
      if (this.userRecibido.usuarioCedula != null) {
        this.alerta = 'Bienvendo ' + this.userRecibido.usuarioNombre
        localStorage.setItem('usuarioA', this.userRecibido.usuarioNombre);
        this.display = true;
        this.redireccion();
      } else {
        this.alerta = 'Datos erróneos'
        this.display = true;
      }
    });
  }

  redireccion() {
    if (this.tipo.string == 'SuperAdministrador') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(2000);
        this.router.navigateByUrl('registro-usuario');
      })();
    } else if (this.tipo.string == 'Administrador') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(2000);
        this.router.navigateByUrl('dashboard');
      })();
    } else if (this.tipo.string == 'Voluntario Interno') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(2000);
        this.router.navigateByUrl('actividades');
      })();
    } else if (this.tipo.string == 'Voluntario Externo') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(2000);
        this.router.navigateByUrl('actividades');
      })();
    }

  }
}