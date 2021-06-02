import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { LoginService } from 'src/app/services/login.service';

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
  userRecibido: Usuarios={}
  //Modals
  display: boolean;
  displayF: boolean;
  alerta:string;
  //DropDown
  tipos: any[];
  tipo: any;
  valido: boolean = false;

  constructor(private loginservce:LoginService, private router: Router) { }

  ngOnInit(): void {
    this.display = false;
    this.displayF = false;
    this.tipos = [
      { string: 'SuperAdministrador' },
      { string: 'Administrador' },
      { string: 'Voluntario' }
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
      } else if (this.tipo.string == 'Voluntario') {
        this.user.usuarioTipo = 3;
      } 
    }
  }

  Logearse() {
    if(this.user.usuarioCedula != '' || this.user.usuarioContrasenia != '' ||  this.valido == false ){
      this.loginservce.getLogin(this.user.usuarioCedula, this.user.usuarioContrasenia, this.user.usuarioTipo).subscribe(data => {
        this.userRecibido = data;
        if(this.userRecibido != null){
          this.display = true;
          this.router.navigateByUrl['actividades']
        } else {
          this.alerta = 'Datos errnóneos'
          this.displayF = true;
        }
      });
    } else {
      this.alerta = 'Rellene todos los campos y seleccione un tipo de usuario por favor'
      this.displayF = true;
    }
  }
}