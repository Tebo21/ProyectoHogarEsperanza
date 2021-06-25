import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
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

  cedUser: any;
  msgs: Message[];
  usuario: Usuarios = {};
  persona: Personas = {};
  personaE: Personas = {};

  usuarioConfirContrasenia: any;
  //DropDown
  tipos: any[];
  tipo: any;
  valido: boolean = false;
  //Validaciones
  drop: boolean = false;
  vistaTipo: boolean = true;
  nacionalidades: any[];
  nacio: any;
  estadocivil: any[];
  estado: any;
  generos: any[];
  genero: any;
  discap = false;
  //Campos
  edadC:number;
  usuarioContraseniaAnterior:any;
  usuarioContrasenia:any;
  displayContra: boolean = false;
  otraCategoria: boolean = false;
  displayEP: boolean = false;
  constructor(private userService: UsuarioService, private personaService: PersonasService) {  }

  ngOnInit(): void {
    this.cedUser = localStorage.getItem('cedUser')
    this.tipos = [
      { string: 'SuperAdministrador' },
      { string: 'Administrador' },
      { string: 'Voluntario Interno' },
      { string: 'Voluntario Externo' }
    ];
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
      { nop: 'Honduras' },
      { nop: 'Otro' }
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
    this.userService.getUserByCedula(this.cedUser).subscribe(data => {
      this.usuario = data;
      if(this.usuario.usuarioTipo == 1){
        this.drop = true;
        this.vistaTipo = false;
      } if (this.usuario.usuarioTipo == 2 || this.usuario.usuarioTipo == 3 || this.usuario.usuarioTipo == 4 ){
        this.drop = false;
        this.vistaTipo = true;
      }
    });
    this.personaService.getPorCedula(this.cedUser).subscribe(data2 => {
      this.persona = data2;
      this.discap = this.persona.discapacidad;
      this.genero = this.persona.genero;
    });
  }

  onChange(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.string == 'SuperAdministrador') {
        
      } else if (this.tipo.string == 'Administrador') {
        
      } else if (this.tipo.string == 'Voluntario Interno') {
        
      } else if (this.tipo.string == 'Voluntario Externo') {

      }
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

  Actualizar(){
    alert(this.genero.gop)
    alert('Funciona')
  }

}
