import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { Personas } from 'src/app/models/personas';
import { Usuarios } from 'src/app/models/usuarios';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { Message } from 'primeng/api';
import { timer } from 'rxjs';
import * as moment from 'moment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})

export class RegistroUsuariosComponent implements OnInit {
  @ViewChild("Ced") Ced: ElementRef

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  noSpecial: RegExp = /^[^<>*!@$%^_=+?`\|{}[~\]"']+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  //Comprobacion
  nombredeUsuario: any;
  //Modelos
  persona: Personas = {};
  usuarioValidarCorreo: Personas = {};
  usuario: Usuarios = {};
  usuarioValidarCedula: Usuarios = {};
  //Variables
  ficha: FichaSocioeconomica[];
  personaCreada: Personas = {};
  usuarioCreado: Usuarios = {};
  listadoTipo: any[];
  tipo: any;
  nacionalidades: any[];
  nacio: any;
  estadocivil: any[];
  estado: any;
  generos: any[];
  genero: any;
  usuarios: any[];
  usv: any;
  tipoVivienda: any[];
  tipoVi: any;
  situacionEco: any[];
  sitEco: any;
  fechaNacimiento: Date;
  fechaRegistro: Date;
  //Modal
  valido: boolean;
  //ModalVoluntario
  displayV: boolean = false
  tipoUsuario: number;
  //Validacion de Logeo
  tipoUser: any;
  msgs: Message[];
  cedula: string = '';
  nombres: string = '';
  apellidos: string = '';
  direccion: string = '';
  celular: string = '';
  //Validacion Usuario
  correo: string = '';
  usuarioNombre: string = '';
  usuarioContrasenia: string = '';
  usuarioConfirContrasenia: string = '';
  usuarioFechaCreacion: Date;
  validoG: boolean;
  validoN: boolean;
  validoE: boolean;
  //Edad
  edadC: number;

  constructor(private router: Router, private personaservice: PersonasService,
    private usuarioservice: UsuarioService, private renderer: Renderer2) {

    this.listadoTipo = [
      { top: 'SuperAdministrador' },
      { top: 'Administrador' },
      { top: 'Voluntario Interno' },
      { top: 'Voluntario Externo' }
    ]
    this.nacionalidades = [
      { nop: 'Afganistán' }, { nop: 'Alemania' }, { nop: 'Arabia Saudita' }, { nop: 'Argentina' }, { nop: 'Australia' }, { nop: 'Bélgica' }, { nop: 'Bolivia' }, { nop: 'Brasil' },
      { nop: 'Camboya' }, { nop: 'Canadá' }, { nop: 'Chile' }, { nop: 'China' }, { nop: 'Colombia' }, { nop: 'Corea' }, { nop: 'Costa Rica' }, { nop: 'Cuba' }, { nop: 'Dinamarca' }, { nop: 'Ecuador' }, { nop: 'Egipto' }, { nop: 'El Salvador' },
      { nop: 'Escocia' }, { nop: 'España' }, { nop: 'Estados Unidos' }, { nop: 'Estonia' }, { nop: 'Etiopia' }, { nop: 'Filipinas' }, { nop: 'Finlandia' }, { nop: 'Francia' }, { nop: 'Gales' }, { nop: 'Grecia' }, { nop: 'Guatemala' },
      { nop: 'Haití' }, { nop: 'Holanda' }, { nop: 'Honduras' }, { nop: 'Indonesia' }, { nop: 'Inglaterra' }, { nop: 'Irak' }, { nop: 'Irán' }, { nop: 'Irlanda' }, { nop: 'Israel' }, { nop: 'Italia' }, { nop: 'Japón' }, { nop: 'Jordania' },
      { nop: 'Laos' }, { nop: 'Letonia' }, { nop: 'Lituania' }, { nop: 'Malasia' }, { nop: 'Marruecos' }, { nop: 'México' }, { nop: 'Nicaragua' }, { nop: 'Noruega' }, { nop: 'Nueva Zelanda' }, { nop: 'Panamá' }, { nop: 'Paraguay' },
      { nop: 'Perú' }, { nop: 'Polonia' }, { nop: 'Portugal' }, { nop: 'Puerto Rico' }, { nop: 'Republica Dominicana' }, { nop: 'Rumania' }, { nop: 'Rusia' }, { nop: 'Suecia' }, { nop: 'Suiza' }, { nop: 'Tailandia' }, { nop: 'Taiwán' },
      { nop: 'Turquía' }, { nop: 'Ucrania' }, { nop: 'Uruguay' }, { nop: 'Venezuela' }, { nop: 'Vietnam' }, { nop: 'Otro' }
    ]
    this.estadocivil = [
      { eop: 'Soltero' },
      { eop: 'Casado' },
      { eop: 'Unión de hecho' },
      { eop: 'Divorciado' },
      { eop: 'Viudo' }
    ]
    this.generos = [
      { gop: 'Masculino' },
      { gop: 'Femenino' },
      { gop: 'Otro' }
    ]
    this.usuarios = [
      { uop: 'Interno' },
      { uop: 'Externo' }
    ]
    this.tipoVivienda = [
      { viv: 'Propia' },
      { viv: 'Prestada' },
      { viv: 'Mediagua' },
      { viv: 'Alquilada' }
    ]
    this.situacionEco = [
      { eco: 'Alta' },
      { eco: 'Media' },
      { eco: 'Baja' },
      { eco: 'Crítica' }
    ]
  }

  ngOnInit(): void {
    this.ComprobarLogin();
    this.usuarioFechaCreacion = new Date;
  }

  onChangeT(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.top == 'SuperAdministrador') {
        this.tipoUsuario = 1;
      } else if (this.tipo.top == 'Administrador') {
        this.tipoUsuario = 2;
      } else if (this.tipo.top == 'Voluntario Interno') {
        this.tipoUsuario = 3;
      } else if (this.tipo.top == 'Voluntario Externo') {
        this.tipoUsuario = 4;
      }
    }
  }

  onChangeV(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.usv.uop == 'Interno') {
        this.tipoUsuario = 3;
      } else if (this.usv.uop == 'Externo') {
        this.tipoUsuario = 4;
      }
    }
  }

  onChangeG(event: any) {
    if (event.value == null) {
      this.validoG = false;
    } else {
      this.validoG = true;
    }
  }

  onChangeN(event: any) {
    if (event.value == null) {
      this.validoN = false;
    } else {
      this.validoN = true;
    }
  }

  onChangeEstado(event: any) {
    if (event.value == null) {
      this.validoE = false;
    } else {
      this.validoE = true;
    }
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1) {
    } else if (this.tipoUser == 2 || this.tipoUser == 3 || this.tipoUser == 4) {
      Swal.fire({
        title: 'No tiene permisos para registrar usuarios',
        icon: 'warning',
      });
      this.router.navigateByUrl('inicio-super-admin');
    } else {
      Swal.fire({
        title: 'Por favor inicie sesión primero',
        icon: 'error',
      });
      this.router.navigateByUrl('login');
    }
  }

  Validacion() {
    if (this.cedula == '' || this.cedula == undefined || this.cedula == null ||
      this.nombres == '' || this.nombres == undefined || this.nombres == null ||
      this.apellidos == '' || this.apellidos == undefined || this.apellidos == null ||
      this.persona.fechaNacimiento == undefined || this.genero == null ||
      this.nacio == null || this.estado == null || this.tipo == null) {
      this.addMultiple('error', 'Error', 'Por favor rellene los campos que tengan *');
    } else {
      this.msgs = []
      this.ValidacionesExtra();
    }
  }

  calcularedad(event: any) {
    const hoy: Date = new Date();
    var a = moment(hoy);
    var b = moment(this.persona.fechaNacimiento);

    var years = a.diff(b, 'year');
    b.add(years, 'years');

    var months = a.diff(b, 'months');
    b.add(months, 'months');

    var days = a.diff(b, 'days');

    this.edadC = years
  }

  ValidacionesExtra() {
    this.usuarioservice.getUserByCedula(this.cedula).subscribe(dat => {
      this.usuarioValidarCedula = dat;
      if (this.usuarioValidarCedula.usuarioCedula == null) {
        this.renderer.setAttribute(this.Ced.nativeElement, "disabled", "true");
        this.displayV = true
        this.addMultiple('success', 'Exito', 'Por favor complete la información solicitada debajo');
      } else {
        this.addMultiple('error', 'Error', 'El número de cédula ya está en uso por el usuario ' + this.usuarioValidarCedula.usuarioNombre)
      }
    })
  }

  GuardarUsuario() {
    if (this.usuarioNombre == '' || this.usuarioContrasenia == '' || this.usuarioNombre == null || this.usuarioContrasenia == null) {
      this.addMultiple('error', 'Error', 'Por favor rellene los campos que tengan * ')
    } else {
      if (this.usuarioContrasenia == this.usuarioConfirContrasenia) {
        const nuevaPersona: Personas = {
          apellidos: this.apellidos,
          cedula: this.cedula,
          celular: this.celular,
          correo: this.correo,
          direccion: this.direccion,
          estado_civil: this.estado.eop,
          fechaNacimiento: this.persona.fechaNacimiento,
          edad: this.edadC,
          genero: this.genero.gop,
          nacionalidad: this.nacio.nop,
          nombres: this.nombres,
          beneficiario: false,
          estadoActivo: true,
          faltas: 0
        }
        const nuevoUsuario: Usuarios = {
          usuarioCedula: this.cedula,
          usuarioContrasenia: this.usuarioContrasenia,
          usuarioNombre: this.usuarioNombre,
          usuarioTipo: this.tipoUsuario,
          usuarioEstado: true,
          usuarioFechaCreacion: 'Fecha:' + ((this.usuarioFechaCreacion.getDate() < 10) ? '0' : '') + this.usuarioFechaCreacion.getDate() + "-" + (((this.usuarioFechaCreacion.getMonth() + 1) < 10) ? '0' : '') + (this.usuarioFechaCreacion.getMonth() + 1) + "-" + this.usuarioFechaCreacion.getFullYear()
            + ' Hora:' + this.usuarioFechaCreacion.getHours() + ":" + this.usuarioFechaCreacion.getMinutes()
        }
        this.personaservice.postPersona(nuevaPersona).subscribe(data2 => {
          this.personaCreada = data2;
          if(this.personaCreada == null){
            alert('Ha ocurrido un error por favor intentelo más tarde')
          } else {
            this.usuarioservice.addUser(nuevoUsuario).subscribe(data => {
              this.usuarioCreado = data;
              this.displayV = false;
              Swal.fire({
                title: 'Usuario registrado correctamente',
                icon: 'success',
              });
              const contador = timer(2000);
              contador.subscribe((n) => {
                window.location.reload();
              })
            });
          }
        });
      } else {
        this.addMultiple('error', 'Error', 'Las contraseñas no coinciden')
      }
    }
  }

  addMultiple(severity1: string, sumary1: string, detail1: string) {
    this.msgs =
      [{ severity: severity1, summary: sumary1, detail: detail1 }];
    const contador = timer(6000);
    contador.subscribe((n) => {
      this.msgs = []
    })
  }

}