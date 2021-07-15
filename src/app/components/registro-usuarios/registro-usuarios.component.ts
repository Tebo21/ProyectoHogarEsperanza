import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { Personas } from 'src/app/models/personas';
import { Usuarios } from 'src/app/models/usuarios';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { empty, timer } from 'rxjs';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
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
  displayV: boolean;
  tipoUsuario: number;
  //ModalBeneficiario
  displayB: boolean;
  adultoMayor: boolean;
  viveOtros: boolean;
  discap = false;
  estadoDiscapacidad: boolean;
  adminActivar: boolean;
  //Validacion de Logeo
  tipoUser: any;
  msgs: Message[];
  cb: boolean = false;
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
    private usuarioservice: UsuarioService) {

    this.listadoTipo = [
      { top: 'Administrador' },
      { top: 'Voluntario' }
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
    this.displayV = false;
    this.displayB = false;
    this.adminActivar = true;
    this.usuarioFechaCreacion = new Date;
  }

  onChangeT(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.top == 'Voluntario') {
        this.adminActivar = true;
        this.displayV = true;
      } else if (this.tipo.top == 'Administrador') {
        this.adminActivar = false;
        this.displayV = true;
        this.tipoUsuario = 2;
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
      alert('No tiene permisos para registrar beneficiarios')
      this.router.navigateByUrl('inicio-super-admin');
    }
  }

  Validacion() {
    if (this.cedula == '' || this.cedula == undefined || this.cedula == null ||
      this.nombres == '' || this.nombres == undefined || this.nombres == null ||
      this.apellidos == '' || this.apellidos == undefined || this.apellidos == null ||
      this.direccion == '' || this.direccion == undefined || this.direccion == null ||
      this.celular == '' || this.celular == undefined || this.celular == null ||
      this.correo == '' || this.correo == undefined || this.correo == null ||
      this.persona.fechaNacimiento == undefined || this.validoG == false || 
      this.validoN == false || this.validoE == false || this.valido == false) {
      this.cb = false;
      this.addMultiple('error', 'Error', 'Todos los campos deben ser llenados');
      const contador = timer(2000);
      contador.subscribe((n) => {
        this.clear();
      })
    } else {
      this.cb = true;
    }
  }

  calcularedad(event: any) {
    let fecha = new Date(event.target.value);
    let fechactual = new Date();
    var f1 = fechactual.getFullYear() - fecha.getFullYear();
    this.edadC = f1
  }


  ValidacionesExtra() {
    this.Validacion();
    this.usuarioservice.getUserByCedula(this.cedula).subscribe(dat => {
      this.usuarioValidarCedula = dat;
      if (this.usuarioValidarCedula.usuarioCedula == null) {
        this.personaservice.getPorCorreo(this.correo).subscribe(da => {
          this.usuarioValidarCorreo = da;
          if (this.usuarioValidarCorreo.cedula == null) {
            this.GuardarUsuario();
          } else {
            alert('Esta dirección de correo electrónico ya está en uso')
          }
        })
      } else {
        alert('El número de cédula ya está en uso')
      }
    })
  }


  GuardarUsuario() {
    if (this.usuarioNombre != '' || this.usuarioContrasenia != '') {
      if (this.usuarioContrasenia == this.usuarioConfirContrasenia) {
        const nuevaPersona: Personas = {
          apellidos: this.apellidos,
          cedula: this.cedula,
          celular: this.celular,
          correo: this.correo,
          direccion: this.direccion,
          discapacidad: this.discap,
          estado_civil: this.estado.eop,
          fechaNacimiento: this.persona.fechaNacimiento,
          edad: this.edadC,
          genero: this.genero.gop,
          nacionalidad: this.nacio.nop,
          nombres: this.nombres,
          beneficiario: false,
          estadoActivo: true
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
        });
        this.usuarioservice.addUser(nuevoUsuario).subscribe(data => {
          this.usuarioCreado = data;
          this.addMultiple('success', 'Exito', 'Usuario guardado correctamente')
          const contador = timer(1000);
          contador.subscribe((n) => {
            this.clear();
            window.location.reload();
          })
        });
        this.displayV = false
      } else {
        this.addMultiple('error', 'Error', 'Las contraseñas no coinciden');
        const contador = timer(2000);
        contador.subscribe((n) => {
          this.clear();
        })
      }
    } else {
      this.addMultiple('error', 'Error', 'Todos los campos deben ser llenados');
      const contador = timer(2000);
      contador.subscribe((n) => {
        this.clear();
      })
    }
  }

  addMultiple(severity1: string, sumary1: string, detail1: string) {
    this.msgs =
      [{ severity: severity1, summary: sumary1, detail: detail1 }];
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    (async () => {
      await delay(2000);
      window.location.reload();
    });

  }

  clear() {
    this.msgs = [];
  }

}
