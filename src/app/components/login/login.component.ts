import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { Smsrequest } from 'src/app/models/sms';
import { Usuarios } from 'src/app/models/usuarios';
import { ActividadesService } from 'src/app/services/actividades.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',]
})
export class LoginComponent implements OnInit {

  //Comprobacion de Logeo
  user: Usuarios = {};
  userRecibido: Usuarios = {};
  perRecu: Personas = {};
  userRec: Usuarios = {};
  //Modals
  display: boolean;
  alerta: string;
  displayPass: boolean = true;
  //DropDown
  tipos: any[];
  tipo: any;
  valido: boolean = false;
  correo: any;
  //Enviar mensajes de wpp 
  sms: Smsrequest = new Smsrequest("", "");
  tempass: string;

  constructor(private userservice: UsuarioService, private router: Router, private persser: PersonasService,
    private actividadesService: ActividadesService) { }

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
    this.userservice.getLogin(this.user.usuarioCedula, this.user.usuarioContrasenia, this.user.usuarioTipo).subscribe(data => {
      this.userRecibido = data;
      if (this.userRecibido.usuarioCedula != null) {
        this.alerta = 'Bienvendo ' + this.userRecibido.usuarioNombre
        localStorage.setItem('usuarioA', this.userRecibido.usuarioNombre);
        localStorage.setItem('rolUser', this.userRecibido.usuarioTipo.toString());
        localStorage.setItem('cedUser', this.userRecibido.usuarioCedula.toString());
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
        await delay(900);
        this.router.navigateByUrl('registro-usuario');
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

  generaRandom(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  Recuperar(correo: string) {
    this.tempass = this.generaRandom();
    this.persser.getPorCorreo(correo).subscribe(data => {
      this.perRecu = data;
      if (this.perRecu.cedula != null) {
        this.userservice.getUserByCedula(this.perRecu.cedula).subscribe(dat => {
          this.userRec = dat;
          const NuevoUser: Usuarios = {
            idUsuario: this.userRec.idUsuario,
            usuarioCedula: this.userRec.usuarioCedula,
            usuarioContrasenia: this.tempass.toString(),
            usuarioNombre: this.userRec.usuarioNombre,
            usuarioTipo: this.userRec.usuarioTipo,
            usuarioEstado: this.userRec.usuarioEstado,
            usuarioFechaCreacion: this.userRec.usuarioFechaCreacion
          }
          this.userservice.updateUser(NuevoUser).subscribe(() => { });
          if (this.perRecu.celular.length == 10) {
            let numbersend = this.perRecu.celular.slice(1);
            let numbernew = "593" + numbersend
            this.sms.number = numbernew;
            this.sms.message = 'Hola ' + this.perRecu.nombres + ' \n' + 'Soy tu asistente de recuperación de cuenta, tu contraseña temporal es ' + this.tempass + ' \n' + 'por favor cambiala una vez ingreses a su cuenta dirigiendote a tu perfil' + ' \n' + '*Este mensaje no debe ser repondido ya que se genera de forma automática  :)*';
          }
          this.actividadesService.sendSmS(this.sms).subscribe((res) => {
          }, err => {
            console.log(err)
          })
        })
      } else {
        alert('Dirección de correo electrónico no registrado')
      }
    })
  }
}