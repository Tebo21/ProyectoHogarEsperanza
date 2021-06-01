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

  user: any = {
    nombreUsuario: '',
    contrasenia: ''
  };

  constructor(private loginservce:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  Logearse() {
      this.loginservce.getLogin(this.user.nombreUsuario, this.user.contrasenia).subscribe(data => {
      this.user = data;
      if(this.user.nombreUsuario!= null || this.user.contrasenia!=null){
        alert('exito')
      } else {
        alert('Usuario o contraseña incorrectos')
      }
      
    });
  }
}

