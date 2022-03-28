import { Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Personas } from 'src/app/models/personas';
import { Usuarios } from 'src/app/models/usuarios';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  //Comprobacion de Usuario
  cedUser: any;
  msgs: Message[];
  usuario: Usuarios = {};
  persona: Personas = {};
  personaValidarCorreo: Personas = {};
  personaValidar: Personas = {};
  usuarioT: any;
  //DropDown
  tipos: any[];
  tipo: any;
  valido: boolean = false;
  validoG: boolean = false;
  validoN: boolean = false;
  validoE: boolean = false;
  //Validaciones
  drop: boolean = false;
  vistaTipo: boolean = true;
  nacionalidades: any[];
  nacio: any;
  estadocivil: any[];
  estado: any;
  generos: any[];
  genero: any;
  usuarioContraseniaAnterior: any;
  usuarioContrasenia: any;
  usuarioConfirContrasenia: any;
  //Campos
  edadC: number;
  displayContra: boolean = false;
  otraCategoria: boolean = false;
  displayEP: boolean = false;
  //Validaciones
  estadoFinal: any;
  generoFinal: any;
  nacioFinal: any;
  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  noSpecial: RegExp = /^[^<>*!@$%^_=+?`\|{}[~\]"']+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/

  constructor(private usuarioService: UsuarioService, private personaService: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.cedUser = localStorage.getItem('cedUser')
    this.tipos = [
      { string: 'SuperAdministrador' },
      { string: 'Administrador' },
      { string: 'Voluntario Interno' },
      { string: 'Voluntario Externo' }
    ];
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
    this.usuarioService.getUserByCedula(this.cedUser).subscribe(data => {
      this.usuario = data;
      if (this.usuario.usuarioTipo == 1) {
        this.drop = true;
        this.vistaTipo = false;
      } if (this.usuario.usuarioTipo == 2 || this.usuario.usuarioTipo == 3 || this.usuario.usuarioTipo == 4) {
        this.drop = false;
        this.vistaTipo = true;
      }
    });
    this.personaService.getUserByCedula(this.cedUser).subscribe(data2 => {
      this.persona = data2;
      this.genero = this.persona.genero;
      this.nacio = this.persona.nacionalidad;
      this.estado = this.persona.estado_civil;
    });
  }

  onChange(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.string == 'SuperAdministrador') {
        this.usuarioT = 1;
      } else if (this.tipo.string == 'Administrador') {
        this.usuarioT = 2;
      } else if (this.tipo.string == 'Voluntario Interno') {
        this.usuarioT = 3;
      } else if (this.tipo.string == 'Voluntario Externo') {
        this.usuarioT = 4;
      }
    }
  }

  onChangeE(event: any) {
    if (event.value == null) {
      this.validoE = false;
    } else {
      this.validoE = true;
    }
  }
  onChangeN(event: any) {
    if (event.value == null) {
      this.validoN = false;
    } else {
      this.validoN = true;
    }
  }
  onChangeG(event: any) {
    if (event.value == null) {
      this.validoG = false;
    } else {
      this.validoG = true;
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
    
    this.persona.edad = years
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

  Validacion() {
    if (this.estado == undefined || this.estado == null || this.validoE == false) {
      this.estadoFinal = this.persona.estado_civil
    } else {
      this.estadoFinal = this.estado.eop
    }
    if (this.nacio == undefined || this.nacio == null || this.validoN == false) {
      this.nacioFinal = this.persona.nacionalidad
    } else {
      this.nacioFinal = this.nacio.nop
    }
    if (this.genero == undefined || this.genero == null || this.validoG == false) {
      this.generoFinal = this.persona.genero
    } else {
      this.generoFinal = this.genero.gop
    }
    if (this.usuarioT == undefined || this.usuarioT == null) {
      this.usuarioT = this.usuario.usuarioTipo;
    } else {
      this.usuarioT = this.usuarioT;
    }
    if (this.persona.cedula == '' || this.persona.cedula == undefined || this.persona.cedula == null ||
      this.persona.nombres == '' || this.persona.nombres == undefined || this.persona.nombres == null ||
      this.persona.apellidos == '' || this.persona.apellidos == undefined || this.persona.apellidos == null ||
      this.persona.fechaNacimiento == undefined) {
      this.addMultiple('error', 'Error', 'Por favor rellene los campos que tengan *');
    } else {
      this.msgs = []
      this.Actualizar();
    }
  }

  Actualizar() {
    const PersonaNueva: Personas = {
      apellidos: this.persona.apellidos,
      beneficiario: this.persona.beneficiario,
      cedula: this.persona.cedula,
      celular: this.persona.celular,
      correo: this.persona.correo,
      direccion: this.persona.direccion,
      edad: this.persona.edad,
      estadoActivo: this.persona.estadoActivo,
      estado_civil: this.estadoFinal,
      fechaNacimiento: this.persona.fechaNacimiento,
      genero: this.generoFinal,
      idPersona: this.persona.idPersona,
      nacionalidad: this.nacioFinal,
      nombres: this.persona.nombres,
      faltas: this.persona.faltas
    }
    const UsuarioNuevo: Usuarios = {
      idUsuario: this.usuario.idUsuario,
      usuarioCedula: this.usuario.usuarioCedula,
      usuarioContrasenia: this.usuario.usuarioContrasenia,
      usuarioNombre: this.usuario.usuarioNombre,
      usuarioTipo: this.usuarioT,
      usuarioEstado: true,
      usuarioFechaCreacion: this.usuario.usuarioFechaCreacion
    }
    this.personaService.updatePersona(PersonaNueva).subscribe(() => {
    });
    this.usuarioService.updateUser(UsuarioNuevo).subscribe(() => {
    Swal.fire({
      title: 'Se ha actualizado la información correctamente',
      icon: 'success',
    });
      this.router.navigateByUrl('listado-usuarios');
    });
  }

  CambiarContra() {
    if (this.usuario.usuarioContrasenia != this.usuarioContraseniaAnterior) {
      this.addMultiple('error', 'Error', 'La contraseña anterior es incorrecta')
    } else {
      if (this.usuarioContrasenia != this.usuarioConfirContrasenia) {
      this.addMultiple('error', 'Error', 'Las contraseñas no coinciden')
      } else {
        const UsuarioNuevo: Usuarios = {
          idUsuario: this.usuario.idUsuario,
          usuarioCedula: this.usuario.usuarioCedula,
          usuarioContrasenia: this.usuarioContrasenia,
          usuarioNombre: this.usuario.usuarioNombre,
          usuarioTipo: this.usuario.usuarioTipo,
          usuarioEstado: true,
          usuarioFechaCreacion: this.usuario.usuarioFechaCreacion
        }
        this.usuarioService.updateUser(UsuarioNuevo).subscribe(() => {
          this.addMultiple('success', 'Exito', 'Actualización exitosa')
          this.displayContra = false;
          window.location.reload();
        });
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

  Cancelar() {
    this.router.navigateByUrl('inicio-super-admin');
  }

}
