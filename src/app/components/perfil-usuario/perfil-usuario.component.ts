import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { Usuarios } from 'src/app/models/usuarios';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

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
  discap: boolean;
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
      this.usuario = data;
      if (this.usuario.usuarioTipo == 1) {
        this.drop = true;
        this.vistaTipo = false;
      } if (this.usuario.usuarioTipo == 2 || this.usuario.usuarioTipo == 3 || this.usuario.usuarioTipo == 4) {
        this.drop = false;
        this.vistaTipo = true;
      }
    });
    this.personaService.getPorCedula(this.cedUser).subscribe(data2 => {
      this.persona = data2;
      this.discap = this.persona.discapacidad;
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
    this.Actualizar();
  }

  Actualizar() {
    this.personaService.getPorCedula(this.persona.cedula).subscribe(dat => {
      this.personaValidar = dat;
    })
    this.personaService.getPorCorreo(this.persona.correo).subscribe(data => {
      this.personaValidarCorreo = data;
      if (this.personaValidarCorreo.correo == this.personaValidar.correo) { 
        const PersonaNueva: Personas = {
          apellidos: this.persona.apellidos,
          beneficiario: this.persona.beneficiario,
          cedula: this.persona.cedula,
          celular: this.persona.celular,
          correo: this.persona.correo,
          direccion: this.persona.direccion,
          discapacidad: this.discap,
          edad: this.persona.edad,
          estadoActivo: this.persona.estadoActivo,
          estado_civil: this.estadoFinal,
          fechaNacimiento: this.persona.fechaNacimiento,
          genero: this.generoFinal,
          idPersona: this.persona.idPersona,
          nacionalidad: this.nacioFinal,
          nombres: this.persona.nombres
        }
        this.personaService.updatePersona(PersonaNueva).subscribe(() => {
        });
        const UsuarioNuevo: Usuarios = {
          idUsuario: this.usuario.idUsuario,
          usuarioCedula: this.usuario.usuarioCedula,
          usuarioContrasenia: this.usuario.usuarioContrasenia,
          usuarioNombre: this.usuario.usuarioNombre,
          usuarioTipo: this.usuarioT,
          usuarioEstado: true,
          usuarioFechaCreacion: this.usuario.usuarioFechaCreacion
        }
        this.usuarioService.updateUser(UsuarioNuevo).subscribe(() => {
          alert('Se ha actualizado exitosamente')
          this.router.navigateByUrl('listado-usuarios');
        });
      } else if (this.personaValidarCorreo.cedula == null){
        const PersonaNueva: Personas = {
          apellidos: this.persona.apellidos,
          beneficiario: this.persona.beneficiario,
          cedula: this.persona.cedula,
          celular: this.persona.celular,
          correo: this.persona.correo,
          direccion: this.persona.direccion,
          discapacidad: this.discap,
          edad: this.persona.edad,
          estadoActivo: this.persona.estadoActivo,
          estado_civil: this.estadoFinal,
          fechaNacimiento: this.persona.fechaNacimiento,
          genero: this.generoFinal,
          idPersona: this.persona.idPersona,
          nacionalidad: this.nacioFinal,
          nombres: this.persona.nombres
        }
        this.personaService.updatePersona(PersonaNueva).subscribe(() => {
        });
        const UsuarioNuevo: Usuarios = {
          idUsuario: this.usuario.idUsuario,
          usuarioCedula: this.usuario.usuarioCedula,
          usuarioContrasenia: this.usuario.usuarioContrasenia,
          usuarioNombre: this.usuario.usuarioNombre,
          usuarioTipo: this.usuarioT,
          usuarioEstado: true,
          usuarioFechaCreacion: this.usuario.usuarioFechaCreacion
        }
        this.usuarioService.updateUser(UsuarioNuevo).subscribe(() => {
          alert('Se ha actualizado exitosamente')
          this.router.navigateByUrl('listado-usuarios');
        });
      } else {
        alert('Esta dirección de correo electrónico ya está en uso')
      }
    });
    
  }

  CambiarContra() {
    if (this.usuario.usuarioContrasenia != this.usuarioContraseniaAnterior) {
      alert('La contraseña anterior no es correcta')
    } else {
      if (this.usuarioContrasenia != this.usuarioConfirContrasenia) {
        alert('Las contraseñas no coinciden')
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
          alert('Se ha actualizado exitosamente su contraseña')
          this.displayContra = false;
          window.location.reload();
        });
      }
    }
  }

  Cancelar() {
    this.router.navigateByUrl('inicio-super-admin');
  }

}
