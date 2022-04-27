import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { PersonasService } from 'src/app/services/personas.service';
import { RegistroFamiliaresService } from 'src/app/services/registro-familiares.service';
import { Message } from 'primeng/api';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-beneficiarios',
  templateUrl: './editar-beneficiarios.component.html',
  styleUrls: ['./editar-beneficiarios.component.css']
})

export class EditarBeneficiariosComponent implements OnInit {
  //Refactor
  msgs: Message[];
  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  noSpecial: RegExp = /^[^<>*!@$%^_=+?`\|{}[~\]"']+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  //Variables
  usuarioValidarCorreo: Personas = {};
  usuarioValidarCedula: Personas = {};
  cedulaEditar: string;
  persona: Personas = {};
  //Dropdown
  nacionalidades: any[];
  nacio: any;
  estadocivil: any[];
  estado: any;
  generos: any[];
  genero: any;
  tipodiscpa: any[];
  tipodis: any;
  viviendas: any[];
  vivienda: any;
  viviendaFinal: any;
  parentescos: any[];
  parentesco: any;
  //Variables
  discap: boolean;
  estadoDiscapacidad: boolean;
  habiMental: boolean;
  habiFisica: boolean;
  //Validacion de Logeo
  tipoUser: any;
  //Familiares
  familiares: RegistroFamiliares = {};
  familyArray: RegistroFamiliares[];
  habiRegFam: boolean = false;
  datosFami: boolean = false;
  numHijos: number;
  hijosFinal: number = 0
  //Ficha Socioeconomica
  ficha: FichaSocioeconomica = {};
  recibebono: boolean = false;
  fechaCreacionFicha: Date = new Date;
  tipodisfinal: string;
  //Validaciones
  validoG: boolean = false;
  validoE: boolean = false;
  validoN: boolean = false;
  validoV: boolean = false;
  estadoFinal: any;
  generoFinal: any;
  nacioFinal: any;
  discapFinal: any;

  constructor(private personaService: PersonasService, private familiaService: RegistroFamiliaresService,
    private fichaServices: FichaSocioeconomicaService, private router: Router) {
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
    this.tipodiscpa = [
      { dis: 'Ninguna' },
      { dis: 'Intelectual' },
      { dis: 'Fisica' },
      { dis: 'Ambas' }
    ]
    this.parentescos = [
      { par: 'Hijo' },
      { par: 'Hija' },
      { par: 'Esposo' },
      { par: 'Esposa' },
      { par: 'Padre' },
      { par: 'Madre' },
      { par: 'Sobrino' },
      { par: 'Sobrina' },
      { par: 'Tio' },
      { par: 'Tia' },
      { par: 'Otro' }
    ]
    this.viviendas = [
      { viv: 'Propia' },
      { viv: 'Arrendada' },
      { viv: 'Prestada' }
    ]
  }

  ngOnInit(): void {
    this.ComprobarLogin()
    this.cargarDatos()
    this.familyArray = []
    
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1) {
    } else if (this.tipoUser == 2 || this.tipoUser == 3 || this.tipoUser == 4) {
      Swal.fire({
        title: 'No tiene permisos para editar beneficiarios',
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

  cargarDatos() {
    this.cedulaEditar = localStorage.getItem('cedulaEditar');
    this.personaService.getUserByCedula(this.cedulaEditar).subscribe(data => {
      this.persona = data;
      this.nacio = this.persona.nacionalidad;
      this.estado = this.persona.estado_civil;
      this.genero = this.persona.genero;
    })
    this.familiaService.getFamByCedula(this.cedulaEditar).subscribe(data => {
      this.familyArray = data;
      this.familiares.celularF = '';
      this.familiares.correo = '';
      this.familyArray.forEach(element => this.hijosFinal = element.numHijos);
    })
    this.fichaServices.getfichacedula(this.cedulaEditar).subscribe(data => {
      this.ficha = data;
      this.discap = this.ficha.discapacidad;
      this.tipodisfinal = this.ficha.tipo_discapacidad;
      if (this.ficha.enfermedades == null || this.ficha.enfermedades == [] || this.ficha.enfermedades.length == 0) {
        this.ficha.enfermedades = ['Ninguna']
      }
      this.habilitarDiscap(event);
      this.habilitarCantidadBono(event);
      this.tiposDiscap();
    })

  }

  calcularedad(event: any) {
    const today: Date = new Date();
    const birthDate: Date = new Date(this.persona.fechaNacimiento);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.persona.edad = age;
    return age;
  }

  tiposDiscap() {
    if (this.ficha.tipo_discapacidad == 'Ninguna') {
      this.habiFisica = false;
      this.habiMental = false;
    } else if (this.ficha.tipo_discapacidad == 'Fisica') {
      this.habiFisica = true;
      this.habiMental = false;
    } else if (this.ficha.tipo_discapacidad == 'Intelectual') {
      this.habiFisica = false;
      this.habiMental = true;
    } else if (this.ficha.tipo_discapacidad == 'Ambas') {
      this.habiFisica = true;
      this.habiMental = true;
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

  onChangeV(event: any) {
    if (event.value == null) {
      this.validoV = false;
    } else {
      this.validoV = true;
    }
  }

  habilitarDiscap(event: any) {
    if (this.discap == true) {
      this.estadoDiscapacidad = true;
    } else if(this.discap == false){
      this.estadoDiscapacidad = false;
      this.ficha.porc_disc_fisica = 0;
      this.ficha.descrip_disc_fisica = '' 
      this.ficha.porc_disc_mental = 0;
      this.ficha.descrip_disc_mental = ''
      this.habiFisica = false;
      this.habiMental = false;
      this.tipodisfinal = 'Ninguna'
    }
  }

  habilitarTipoDiscap(event: any) {
    if (event.value == null) {
      this.ficha.porc_disc_fisica = 0;
      this.ficha.porc_disc_mental = 0;
      this.habiFisica = false
      this.habiMental = false
      this.discap = false
      this.estadoDiscapacidad = false
    } else {
      if (this.tipodis.dis == undefined || this.tipodis.dis == null || this.tipodis.dis == '') {
        this.ficha.porc_disc_fisica = 0
        this.ficha.porc_disc_mental = 0
        this.habiFisica = false
        this.habiMental = false
        this.tipodisfinal = 'Ninguna'
      } else if (this.tipodis.dis == 'Intelectual') {
        this.ficha.porc_disc_fisica = 0
        this.ficha.descrip_disc_fisica = ''
        this.habiMental = true
        this.habiFisica = false
        this.tipodisfinal = 'Intelectual'
      } else if (this.tipodis.dis == 'Fisica') {
        this.ficha.porc_disc_mental = 0
        this.ficha.descrip_disc_mental = ''
        this.habiFisica = true
        this.habiMental = false
        this.tipodisfinal = 'Fisica'
      } else if (this.tipodis.dis == 'Ambas') {
        this.habiFisica = true
        this.habiMental = true
        this.tipodisfinal = 'Ambas'
      } else if (this.tipodis.dis == 'Ninguna') {
        this.ficha.porc_disc_fisica = 0
        this.ficha.descrip_disc_fisica = ''
        this.ficha.porc_disc_mental = 0
        this.ficha.descrip_disc_mental = ''
        this.habiFisica = false
        this.habiMental = false
        this.discap = false
        this.estadoDiscapacidad = false
        this.tipodisfinal = 'Ninguna'
      }
    }
  }

  habilitarCantidadBono(event: any) {
    if (this.ficha.recibebono == true) {
      this.recibebono = true;
    } else {
      this.recibebono = false;
      this.ficha.cantidadbono = 0;
    }
  }
  //Validar campos persona
  camposVacios(): boolean {
    let comprobacion: boolean = false;
    if (this.persona.cedula == '' || this.persona.cedula == undefined || this.persona.cedula == null ||
      this.persona.nombres == '' || this.persona.nombres == undefined || this.persona.nombres == null ||
      this.persona.apellidos == '' || this.persona.apellidos == undefined || this.persona.apellidos == null ||
      this.persona.fechaNacimiento == undefined) {
      comprobacion = false;
      this.addMultiple('error', 'Error', 'Por favor rellene los campos que tengan *');
    } else {
      comprobacion = true;
    }
    return comprobacion;
  }

  //Registro de Familiares
  camposVaciosFamiliares(): boolean {
    if (this.familiares.cedulaFamiliar == '' || this.familiares.cedulaFamiliar == undefined || this.familiares.cedulaFamiliar == null ||
      this.familiares.nombreF == '' || this.familiares.nombreF == undefined || this.familiares.nombreF == null ||
      this.familiares.apellidoF == '' || this.familiares.apellidoF == undefined || this.familiares.apellidoF == null ||
      this.parentesco == null) {
      this.addMultiple('error', 'Error', 'Por favor rellene los campos que tengan *')
      return false
    } else {
      return true
    }
  }

  //Verificar FichaSocioeconomica
  CamposVaciosFicha(): boolean {
    if (this.discap == true) {
      if (this.tipodisfinal == 'Ninguna') {
        this.addMultiple('error', 'Error', 'Por favor seleccione un tipo de discapacidad y complete la información requerida');
        return false
      } else if (this.tipodisfinal == 'Intelectual') {
        if (this.ficha.porc_disc_mental == null || this.ficha.porc_disc_mental <= 0 || this.ficha.descrip_disc_mental == '' || this.ficha.descrip_disc_mental == null ) {
          this.addMultiple('error', 'Error', 'Rellene el porcentaje (mayor a 0%) y descripción de discapacidad intelectual');
          return false
        }
      } else if (this.tipodisfinal == 'Fisica') {
        if (this.ficha.porc_disc_fisica == null || this.ficha.porc_disc_fisica <= 0 || this.ficha.descrip_disc_fisica == '' || this.ficha.descrip_disc_fisica == null ) {
          this.addMultiple('error', 'Error', 'Rellene el porcentaje (mayor a 0%) y descripción de la discapacidad física');
          return false
        }
      } else if (this.tipodisfinal == 'Ambas') {
        if (this.ficha.porc_disc_fisica == null || this.ficha.descrip_disc_fisica == '' || this.ficha.porc_disc_mental == null || this.ficha.descrip_disc_mental == '') {
          this.addMultiple('error', 'Error', 'Rellene el porcentaje (mayor a 0%) y descripción de discapacidades');
          return false
        }
      }
      if (this.ficha.descripcionVivienda == '' || this.ficha.descripcionVivienda == undefined || this.ficha.descripcionVivienda == null ||
        this.ficha.situacionEconomica == '' || this.ficha.situacionEconomica == undefined || this.ficha.situacionEconomica == null) {
        this.addMultiple('error', 'Error', 'Por favor rellene los campos que tengan * ');
        return false;
      } else {
        return true;
      }
    } else if (this.discap == false) {
      if (this.ficha.descripcionVivienda == '' || this.ficha.descripcionVivienda == undefined || this.ficha.descripcionVivienda == null ||
        this.ficha.situacionEconomica == '' || this.ficha.situacionEconomica == undefined || this.ficha.situacionEconomica == null) {
        this.addMultiple('error', 'Error', 'Por favor rellene los campos que tengan *');
        return false;
      } else {
        return true;
      }
    }
  }

  agregarFamiliar() {
    if (this.camposVaciosFamiliares() == true) {
      let resultadoC = this.familyArray.find(fruta => fruta.cedulaFamiliar === this.familiares.cedulaFamiliar);
      if (this.familyArray.length <= 0) {
        this.addFamiliar();
      } else if (this.familyArray.length >= 1) {
        if (resultadoC == undefined) {
          this.addFamiliar();
        } else {
          this.addMultiple('error', 'Error', 'Este número de cédula ya está en uso');
        }
      }
    }
  }

  addFamiliar() {
    const nuevoFamiliares: RegistroFamiliares = {
      apellidoF: this.familiares.apellidoF,
      cedulaFamiliar: this.familiares.cedulaFamiliar,
      cedulaPersona: this.persona.cedula,
      celularF: this.familiares.celularF,
      correo: this.familiares.correo,
      nombreF: this.familiares.nombreF,
      parentesco: this.parentesco.par
    }
    if (nuevoFamiliares.parentesco == 'Hijo' || nuevoFamiliares.parentesco == 'Hija') {
      this.hijosFinal++;
    }
    this.familyArray.push(nuevoFamiliares);
    this.familiares.apellidoF = '';
    this.familiares.cedulaFamiliar = '';
    this.familiares.celularF = '';
    this.familiares.correo = '';
    this.familiares.nombreF = '';
  }

  eliminarFamiliar(familiar: RegistroFamiliares) {
    for (let i = 0; i < this.familyArray.length; i++) {
      if (familiar.cedulaPersona == this.familyArray[i].cedulaPersona) {
        let n: number = this.familyArray.indexOf(this.familyArray[i]);
        this.familyArray.splice(n, 1);
        if (familiar.parentesco == 'Hijo' || familiar.parentesco == 'Hija') {
          this.hijosFinal--
        }
      }
    }
  }

  validacion() {
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
    if (this.vivienda == undefined || this.vivienda == null || this.validoV == false) {
      this.viviendaFinal = this.ficha.tipoVivienda
    } else {
      this.viviendaFinal = this.vivienda.viv
    }
  }

  actualizarPersona() {
    const PersonaNueva: Personas = {
      idPersona: this.persona.idPersona,
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
      nacionalidad: this.nacioFinal,
      nombres: this.persona.nombres,
      faltas: this.persona.faltas
    }
    this.personaService.updatePersona(PersonaNueva).subscribe(data => {

    });
  }

  actualizarFamiliares() {
    this.familiaService.deleteRegistro(this.persona.cedula).subscribe(data => { })
    const contador = timer(1000);
    contador.subscribe((n) => {
      this.postFamiliares();
    })
  }

  postFamiliares() {
    for (let i = 0; i < this.familyArray.length; i++) {
      let nuevoRgistro: RegistroFamiliares = {
        apellidoF: this.familyArray[i].apellidoF,
        cedulaFamiliar: this.familyArray[i].cedulaFamiliar,
        cedulaPersona: this.familyArray[i].cedulaPersona,
        celularF: this.familyArray[i].celularF,
        correo: this.familyArray[i].correo,
        nombreF: this.familyArray[i].nombreF,
        parentesco: this.familyArray[i].parentesco,
        numHijos: this.hijosFinal
      }
      this.familiaService.postRegistFami(nuevoRgistro).subscribe(data => {

      })
    }
  }

  actualizarFicha() {
    if (this.ficha.enfermedades == null || this.ficha.enfermedades == [] || this.ficha.enfermedades.length == 0) {
      this.ficha.enfermedades = ['Ninguna']
    }
    let nuevaFicha: FichaSocioeconomica = {
      idFichaSocioeconomica: this.ficha.idFichaSocioeconomica,
      adultoMayor: this.ficha.adultoMayor,
      cantidadbono: this.ficha.cantidadbono,
      cedulaPersona: this.persona.cedula,
      descripcionVivienda: this.ficha.descripcionVivienda,
      discapacidad: this.discap,
      enfermedades: this.ficha.enfermedades,
      fechaRegistro: this.ficha.fechaRegistro,
      porc_disc_fisica: this.ficha.porc_disc_fisica,
      descrip_disc_fisica: this.ficha.descrip_disc_fisica,
      porc_disc_mental: this.ficha.porc_disc_mental,
      descrip_disc_mental: this.ficha.descrip_disc_mental,
      recibebono: this.recibebono,
      salario: this.ficha.salario,
      seguro: this.ficha.seguro,
      situacionEconomica: this.ficha.situacionEconomica,
      tipoVivienda: this.viviendaFinal,
      tipo_discapacidad: this.tipodisfinal,
      viveConOtros: this.ficha.viveConOtros,
      madreSoltera: this.ficha.madreSoltera,
      pareja: this.ficha.pareja
    }
    this.fichaServices.updateFicha(nuevaFicha).subscribe(data => {

    })
  }

  guardarTodo() {
    this.validacion();
    if (this.camposVacios() == true && this.CamposVaciosFicha() == true) {
      this.actualizarPersona();
      this.actualizarFamiliares();
      this.actualizarFicha();
      Swal.fire({
        title: 'Se ha actualizado con exito, por favor espere unos instantes',
        icon: 'success',
      });
      const contador = timer(2000);
      contador.subscribe((n) => {
        this.router.navigate(['/lista-beneficiarios']);
      })
    }
  }

  cancelar() {
    this.router.navigate(['/lista-beneficiarios']);
  }

  addMultiple(severity1: string, sumary1: string, detail1: string) {
    this.msgs =
      [{ severity: severity1, summary: sumary1, detail: detail1 }];
    const contador = timer(6000);
    contador.subscribe((n) => {
      this.msgs = [];
    })
  }

}