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
import { timer } from 'rxjs';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  blockSpecial: RegExp = /^[^<>*!@$%^_=+?`\|{}[~"'/]+$/
  noSpecial: RegExp = /^[^<>*!@$%^_=+?`\|{}[~"']+$/
  //Comprobacion
  nombredeUsuario: any;
  //Modelos
  persona: Personas = {};
  usuario: Usuarios = {};
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

  constructor(private router: Router, private personaservice: PersonasService,
    private usuarioservice: UsuarioService) {

    this.listadoTipo = [
      { top: 'Administrador' },
      { top: 'Voluntario' }
    ]
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
      ;
  }

  ngOnInit(): void {
    this.ComprobarLogin();
    this.displayV = false;
    this.displayB = false;
    this.adminActivar = true;
  }

  onChange(event: any) {
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

  onChangeEstado(event: any) {
    this.Validacion();
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == '1') {
    } else if (this.tipoUser == '3' || this.tipoUser == '4' || this.tipoUser == 2) {
      alert('No tiene permisos para registrar beneficiarios')
      this.router.navigateByUrl('inicio-super-admin');
    }
  }

  Validacion() {
    if (this.cedula != '' &&
      this.nombres != '' &&
      this.apellidos != '' &&
      this.direccion != '' &&
      this.celular != '' &&
      this.correo != '' &&
      this.genero != undefined &&
      this.nacio != undefined &&
      this.estado != undefined) {
      this.cb = true;
    } else {
      this.cb = false;
      this.addMultiple('error', 'Error', 'Todos los campos deben ser llenados');
      const contador = timer(2000);
      contador.subscribe((n) => {
        this.clear();
      })
    }
  }

  GurdarPersona() {
    const nuevaPersona: Personas = {
      apellidos: this.apellidos,
      cedula: this.cedula,
      celular: this.celular,
      correo: this.correo,
      direccion: this.direccion,
      discapacidad: this.discap,
      estado_civil: this.estado.eop,
      fechaNacimiento: this.persona.fechaNacimiento,
      genero: this.genero.gop,
      nacionalidad: this.nacio.nop,
      nombres: this.nombres
    }
    this.personaservice.postPersona(nuevaPersona).subscribe(data2 => {
      this.personaCreada = data2;
    });
  }

  GuardarUsuario() {
    if (this.usuarioNombre != '' &&
      this.usuarioContrasenia != '') {
      if (this.usuarioContrasenia == this.usuarioConfirContrasenia) {
        const nuevoUsuario: Usuarios = {
          usuarioCedula: this.cedula,
          usuarioContrasenia: this.usuarioContrasenia,
          usuarioNombre: this.usuarioNombre,
          usuarioTipo: this.tipoUsuario,
          usuarioEstado: true,
          usuarioFechaCreacion: +'Fecha:' +((this.usuarioFechaCreacion.getDate() < 10) ? '0' : '') + this.usuarioFechaCreacion.getDate() + "-" + (((this.usuarioFechaCreacion.getMonth() + 1) < 10) ? '0' : '') + (this.usuarioFechaCreacion.getMonth() + 1) + "-" + this.usuarioFechaCreacion.getFullYear() 
          + ' Hora:' + this.usuarioFechaCreacion.getHours() + ":" + this.usuarioFechaCreacion.getMinutes()
        }
        this.usuarioservice.addUser(nuevoUsuario).subscribe(data => {
          this.usuarioCreado = data;
          this.GurdarPersona();
          this.addMultiple('success', 'Exito', 'Usuario guardado correctamente')
          const contador = timer(2000);
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
