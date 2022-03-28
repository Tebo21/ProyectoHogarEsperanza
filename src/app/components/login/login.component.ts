import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',]
})

export class LoginComponent implements OnInit {

  //Comprobacion de Logeo
  user: Usuarios = {};
  userRecibido: Usuarios = {};
  //DropDown
  tipos: any[];
  tipo: any;
  valido: boolean = false;
  correo: any;

  constructor(private userservice: UsuarioService, private router: Router, private persser: PersonasService, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    localStorage.clear();
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

  validar() {
    if (this.user.usuarioCedula != '' && this.user.usuarioContrasenia != '' && this.valido == true) {
      this.logearse();
    } else {
      Swal.fire({
        title: 'Por favor rellene todos los campos y seleccione un tipo de usuario.',
        icon: 'warning',
      });
    }
  }

  logearse() {
    this.userservice.getLogin(this.user.usuarioCedula, this.user.usuarioContrasenia, this.user.usuarioTipo).subscribe(data => {
      this.userRecibido = data;
      if (this.userRecibido.usuarioCedula != null) {
        if (this.userRecibido.usuarioEstado == false) {
          Swal.fire({
            title: 'La cuenta ' + this.userRecibido.usuarioNombre + ' ha sido deshabilitada.',
            icon: 'warning',
          });
        } else {
          Swal.fire({
            title: 'Bienvendo ' + this.userRecibido.usuarioNombre,
            icon: 'success',
          });
          localStorage.setItem('usuarioA', this.userRecibido.usuarioNombre);
          localStorage.setItem('rolUser', this.userRecibido.usuarioTipo.toString());
          localStorage.setItem('cedUser', this.userRecibido.usuarioCedula.toString());
          this.redireccion();
        }
      } else {
        Swal.fire({
          title: 'Datos erroneos',
          icon: 'error',
        });
      }
    });
  }

  redireccion() {
    if (this.tipo.string == 'SuperAdministrador') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(900);
        this.router.navigateByUrl('registro-persona');
      })();
    } else if (this.tipo.string == 'Administrador') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(900);
        this.router.navigateByUrl('dashboard');
      })();
    } else if (this.tipo.string == 'Voluntario Interno') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(900);
        this.router.navigateByUrl('actividades');
      })();
    } else if (this.tipo.string == 'Voluntario Externo') {
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(900);
        this.router.navigateByUrl('actividades');
      })();
    }
  }

}