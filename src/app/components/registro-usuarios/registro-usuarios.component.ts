import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { Personas } from 'src/app/models/personas';
import { Usuarios } from 'src/app/models/usuarios';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  blockSpecial: RegExp = /^[^< >*!]+$/
  //Comprobacion
  nombredeUsuario: any;
  //Modelos
  persona: Personas = {};
  usuario: Usuarios = {};
  //Variables
  ficha: FichaSocioeconomica = {};
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

  constructor(private router: Router, private personaservice: PersonasService, private usuarioservice: UsuarioService, private fichaServicio: FichaSocioeconomicaService) {

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

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == '1') {
    } else if (this.tipoUser == '3' || this.tipoUser == '4' || this.tipoUser == 2) {
      alert('No tiene permisos para registrar beneficiarios')
      this.router.navigateByUrl('inicio-super-admin');
    }
  }

  Validacion() {
    if (this.persona.cedula == "") {

    }
  }

  GurdarPersona() {
    const nuevaPersona: Personas = {
      apellidos: this.persona.apellidos,
      cedula: this.persona.cedula,
      celular: this.persona.celular,
      correo: this.persona.correo,
      direccion: this.persona.direccion,
      discapacidad: this.discap,
      estado_civil: this.estado.eop,
      fechaNacimiento: this.persona.fechaNacimiento,
      genero: this.genero.gop,
      nacionalidad: this.nacio.nop,
      nombres: this.persona.nombres
    }
    console.log(nuevaPersona)
    this.personaservice.postPersona(nuevaPersona).subscribe(data2 => {
      this.personaCreada = data2;
    });
  }

  GuardarUsuario() {
    const nuevoUsuario: Usuarios = {
      usuarioCedula: this.persona.cedula,
      usuarioContrasenia: this.usuario.usuarioContrasenia,
      usuarioNombre: this.usuario.usuarioNombre,
      usuarioTipo: this.tipoUsuario
    }
    this.usuarioservice.addUser(nuevoUsuario).subscribe(data => {
      this.usuarioCreado = data;
      this.GurdarPersona();
      alert("Se ha registrado a :" + this.usuario.usuarioNombre)
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(2000);
        window.location.reload();
      });
    });
  }

}
