import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Personas } from '../../models/personas';
import { PersonasService } from '../../services/personas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RegistroFamiliaresService } from '../../services/registro-familiares.service';
import { FichaSocioeconomicaService } from 'src/app/services/ficha-socioeconomica.service';
import { Message } from 'primeng/api';
import { FichaSocioeconomica } from 'src/app/models/ficha-socioeconomica';
import { timer } from 'rxjs';
import { RegistroFamiliares } from 'src/app/models/registro-familiares';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css']
})
export class RegistroPersonaComponent implements OnInit {
  @ViewChild("Ced") Ced: ElementRef;
  //Refactor
  msgs: Message[];
  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  noSpecial: RegExp = /^[^<>*!@$%^_=+?`\|{}[~\]"']+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  //Modelos
  persona: Personas = {};
  personaCreada: Personas = {};
  usuarioValidarCorreo: Personas = {};
  usuarioValidarCedula: Personas = {};
  //Dropdown
  nacionalidades: any[];
  nacio: any;
  estadocivil: any[];
  estado: any;
  generos: any[];
  genero: any;
  tipodiscpa:  any[];
  tipodis: any;
  viviendas: any[];
  vivienda: any;
  parentescos:  any[];
  parentesco: any;
  enfermedades: string[];
  //Variables
  discap: boolean = false;
  estadoDiscapacidad: boolean = false;
  bono: boolean = false;
  habiMental: boolean;
  habiFisica: boolean;
  //Validacion de Logeo
  tipoUser: any;
  //Calculo de edad
  edadC: number;
  //Familiares
  familiares: RegistroFamiliares = {};
  familyArray: RegistroFamiliares[];
  habiRegFam: boolean = false;
  datosFami: boolean = false;
  numHijos:  number;
  hijosFinal : number = 0
  //Ficha Socioeconomica
  ficha: FichaSocioeconomica = {};
  recibebono: boolean = false;
  datosFich: boolean = false;
  fechaCreacionFicha: Date = new Date;
  tipodisfinal : string = 'Ninguna'

  constructor(private renderer: Renderer2, private regfamiser:RegistroFamiliaresService, private fichaser:FichaSocioeconomicaService, 
              private PersonasService: PersonasService, private router: Router) {
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
      { par: 'Hijo'},
      { par: 'Hija'},
      { par: 'Esposo'},
      { par: 'Esposa'},
      { par: 'Padre'},
      { par: 'Madre'},
      { par: 'Sobrino'},
      { par: 'Sobrina'},
      { par: 'Tio'},
      { par: 'Tia'},
    ]
    this.viviendas = [
      { viv: 'Propia'},
      { viv: 'Arrendada'},
      { viv: 'Prestada'}
    ]
  }
  
  ngOnInit(): void {
    this.comprobarLogin();
    this.familyArray = [];
    this.ficha.pareja = false;
    this.ficha.cantidadbono = 0;
    this.ficha.salario = 0;
    this.ficha.tipo_discapacidad = this.tipodisfinal;
    this.familiares.celularF = '';
    this.familiares.correo = '';
  }

  comprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == '1' || this.tipoUser == 2) {
    } else if (this.tipoUser == '3' || this.tipoUser == '4') {
      Swal.fire({
        title: 'No tiene permisos para registrar beneficiarios',
        icon: 'warning',
      });
      this.router.navigateByUrl('inicio-super-admin');
    }
  } 
 
  calcularedad(event: any) {
   const today: Date = new Date();
    const birthDate: Date = new Date(this.persona.fechaNacimiento);
    let age : number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    this.edadC = age;
    return age;
  }

  habilitarDiscap(event: any) {
    if(this.discap==true){
      this.estadoDiscapacidad = true;
    } else {
      this.estadoDiscapacidad = false;
      this.ficha.porc_disc_fisica = 0;
      this.ficha.porc_disc_mental = 0;
      this.habiFisica = false;
      this.habiMental = false;
      this.tipodisfinal = 'Ninguna'
    }
  }

  habilitarTipoDiscap(event: any) {
    if(event.value == null){
      this.ficha.porc_disc_fisica = 0;
      this.ficha.porc_disc_mental = 0;
      this.habiFisica = false
      this.habiMental = false
      this.discap = false
      this.estadoDiscapacidad = false
      
    } else {
      if(this.tipodis.dis == undefined || this.tipodis.dis == null || this.tipodis.dis == '') {
        this.ficha.porc_disc_fisica = 0;
        this.ficha.porc_disc_mental = 0;
        this.habiFisica = false
        this.habiMental = false
      } else if(this.tipodis.dis == 'Intelectual'){
        this.ficha.porc_disc_fisica = 0;
        this.habiMental = true
        this.habiFisica = false
        this.tipodisfinal = 'Intelectual'
      } else if (this.tipodis.dis == 'Fisica'){
        this.ficha.porc_disc_mental = 0;
        this.habiFisica = true
        this.habiMental = false
        this.tipodisfinal = 'Fisica'
      } else if (this.tipodis.dis == 'Ambas'){
        this.habiFisica = true
        this.habiMental = true
        this.tipodisfinal = 'Ambas'
      } else if (this.tipodis.dis == 'Ninguna'){
        this.habiFisica = false
        this.habiMental = false
        this.ficha.porc_disc_mental = 0;
        this.ficha.porc_disc_fisica = 0;
        this.estadoDiscapacidad = false
        this.discap = false;
        this.tipodisfinal = 'Ninguna'
      }
    }
  }

  habilitarCantidadBono(event: any) {
    if(this.ficha.recibebono == true){
      this.recibebono = true;
    } else {
      this.recibebono = false;
      this.ficha.cantidadbono = 0;
    }
  }

  //Registro de Persona
  camposVacios(): boolean{
    let comprobacion: boolean = false;
    if (this.persona.cedula == '' || this.persona.cedula == undefined || this.persona.cedula == null ||
      this.persona.nombres == '' || this.persona.nombres == undefined || this.persona.nombres == null ||
      this.persona.apellidos == '' || this.persona.apellidos == undefined || this.persona.apellidos == null ||
      this.persona.direccion == '' || this.persona.direccion == undefined || this.persona.direccion == null ||
      this.persona.celular == '' || this.persona.celular == undefined || this.persona.celular == null ||
      this.persona.fechaNacimiento == undefined || this.genero == null || this.nacio == null ||
      this.estado == null) {
        comprobacion = false;
        this.addMultiple('error', 'Error', 'Todos los campos deben ser llenados');
        this.timer();
    } else {
      comprobacion = true;
    }
    return comprobacion;
  }

  ValidarDatos() {
    if(this.camposVacios()==true){
      this.PersonasService.getUserByCedula(this.persona.cedula).subscribe(dat => {
        this.usuarioValidarCedula = dat;
        if (this.usuarioValidarCedula.cedula == null) {
          this.PersonasService.getPorCorreo(this.persona.correo).subscribe(da => {
            this.usuarioValidarCorreo = da;
            if (this.usuarioValidarCorreo.cedula == null) {
              this.habiRegFam = true;
              this.renderer.setAttribute(this.Ced.nativeElement, "disabled", "true");
              this.addMultiple('success', 'Exito', 'Por favor complete la información solicitada debajo');
              this.timer();
            } else {
              this.addMultiple('error', 'Error', 'Esta dirección de correo electrónico ya está en uso');
              this.timer();
            }
          })
        } else {
          this.addMultiple('error', 'Error', 'El número de cédula ya está en uso');
          this.timer();
        }
      })
    }
  }

  //Registro de Familiares
  camposVaciosFamiliares() : boolean{
    if (this.familiares.cedulaFamiliar == '' || this.familiares.cedulaFamiliar == undefined || this.familiares.cedulaFamiliar == null ||
      this.familiares.nombreF == '' || this.familiares.nombreF == undefined || this.familiares.nombreF == null ||
      this.familiares.apellidoF == '' || this.familiares.apellidoF == undefined || this.familiares.apellidoF == null ||
      this.parentesco == null) {
        this.datosFami = false
        this.addMultiple('error', 'Error', 'Todos los campos deben ser llenados');
        this.timer();
    } else {
      this.datosFami = true;
    }
    return this.datosFami;
  }

  agregarFamiliar(){
    if(this.camposVaciosFamiliares()==true){
      let resultadoC = this.familyArray.find( fruta => fruta.cedulaFamiliar === this.familiares.cedulaFamiliar );
      if(this.familyArray.length <= 0){
        this.addFamiliar();
      } else if(this.familyArray.length >= 1) {
          if(resultadoC == undefined){
            this.addFamiliar();
          } else {
            this.addMultiple('error', 'Error', 'Este número de cédula ya está en uso');
            this.timer();
          }
      }
    }
  }

  addFamiliar(){
    const nuevoFamiliares: RegistroFamiliares = {
      apellidoF: this.familiares.apellidoF,
      cedulaFamiliar: this.familiares.cedulaFamiliar,
      cedulaPersona: this.persona.cedula,
      celularF: this.familiares.celularF,
      correo: this.familiares.correo,
      nombreF: this.familiares.nombreF,
      parentesco: this.parentesco.par
    }
    if(nuevoFamiliares.parentesco == 'Hijo' || nuevoFamiliares.parentesco == 'Hija'){
      this.hijosFinal++;
    }
    this.familyArray.push(nuevoFamiliares);
    this.familiares.apellidoF = '';
    this.familiares.cedulaFamiliar = '';
    this.familiares.celularF = '';
    this.familiares.correo = '';
    this.familiares.nombreF = '';
  }

  eliminarFamiliar(familiar: RegistroFamiliares){
    for(let i = 0; i<this.familyArray.length; i++){
      if(familiar.cedulaPersona == this.familyArray[i].cedulaPersona){
        let n : number = this.familyArray.indexOf(this.familyArray[i]);
        this.familyArray.splice(n, 1);
        if(familiar.parentesco == 'Hijo' || familiar.parentesco == 'Hija'){
          this.hijosFinal--
        }
      }
    }
  }

  //Registro de Ficha
  CamposVaciosFicha()  :boolean{
    if (this.ficha.descripcionVivienda == '' || this.ficha.descripcionVivienda == undefined || this.ficha.descripcionVivienda == null ||
      this.vivienda == null) {
        this.datosFich = false
        this.addMultiple('error', 'Error', 'Rellene los campos solicitados');
        this.timer();
    } else {
      this.datosFich = true;
    }
    return this.datosFich;
  }

  //Guardar informacion
  guardarPersona(){
    let nuevaPersona: Personas = {
      cedula: this.persona.cedula,
      nombres: this.persona.nombres,
      apellidos: this.persona.apellidos,
      direccion: this.persona.direccion,
      celular: this.persona.celular,
      correo: this.persona.correo,
      genero: this.genero.gop,
      fechaNacimiento: this.persona.fechaNacimiento,
      edad: this.edadC,
      nacionalidad: this.nacio.nop,
      estado_civil: this.estado.eop,
      beneficiario: true,
      estadoActivo: true,
      faltas: 0
    }
    console.log(nuevaPersona);
    this.PersonasService.postPersona(nuevaPersona).subscribe(data => {

    })
  }

  guardarFamiliares(){
    for(let i = 0; i<this.familyArray.length; i++){
      let nuevoFamiliares: RegistroFamiliares = {
        apellidoF: this.familyArray[i].apellidoF,
        cedulaFamiliar: this.familyArray[i].cedulaFamiliar,
        cedulaPersona: this.persona.cedula,
        celularF: this.familyArray[i].celularF,
        correo: this.familyArray[i].correo,
        nombreF: this.familyArray[i].nombreF,
        parentesco: this.familyArray[i].parentesco,  
        numHijos: this.hijosFinal
      }
      console.log(nuevoFamiliares)
      this.regfamiser.postRegistFami(nuevoFamiliares).subscribe(data => {

      })
    }
  }

  guardarFicha(){
    if(this.CamposVaciosFicha()==true){
      let fechaCreacionFicha = ((this.fechaCreacionFicha.getDate() < 10) ? '0' : '') + this.fechaCreacionFicha.getDate() 
      + "-" + (((this.fechaCreacionFicha.getMonth() + 1) < 10) ? '0' : '') + (this.fechaCreacionFicha.getMonth() + 1) 
      + "-" + this.fechaCreacionFicha.getFullYear()
      + ' / ' + this.fechaCreacionFicha.getHours() + ":" + this.fechaCreacionFicha.getMinutes();
      let nuevaFicha : FichaSocioeconomica = {
        adultoMayor: this.ficha.adultoMayor,
        cantidadbono: this.ficha.cantidadbono,
        cedulaPersona: this.persona.cedula,
        descripcionVivienda: this.ficha.descripcionVivienda,
        discapacidad: this.discap,
        enfermedades: this.enfermedades,
        fechaRegistro: fechaCreacionFicha,
        porc_disc_fisica: this.ficha.porc_disc_fisica,
        porc_disc_mental: this.ficha.porc_disc_mental,
        recibebono: this.recibebono,
        salario: this.ficha.salario,
        seguro: this.ficha.seguro,
        situacionEconomica: this.ficha.situacionEconomica,
        tipoVivienda: this.vivienda.viv,
        tipo_discapacidad: this.tipodisfinal,
        viveConOtros: this.ficha.viveConOtros,
        pareja: this.ficha.pareja
      }
      console.log(nuevaFicha);
      this.fichaser.postFichaSocio(nuevaFicha).subscribe(data => {
        
      })
    }
  }

  guardarTodo(){
    let lastVerification: Personas= {};
    this.PersonasService.getUserByCedula(this.persona.cedula).subscribe(dat => {
      lastVerification = dat;
      if (this.usuarioValidarCedula.cedula == null) {
        if(this.camposVacios()==true && this.CamposVaciosFicha()==true){
          this.guardarPersona();
          this.guardarFamiliares();
          this.guardarFicha();
          const contador = timer(3000);
              contador.subscribe((n) => {
              window.location.reload();
          })
        }
      }
    })

    
  }

  cancelar(){
    window.location.reload();
  }

  addMultiple(severity1: string, sumary1: string, detail1: string) {
    this.msgs =
      [{ severity: severity1, summary: sumary1, detail: detail1 }];
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    (async () => {
      await delay(6000);
      window.location.reload();
    });
  }

  timer(){
    const contador = timer(6000);
    contador.subscribe((n) => {
      this.msgs = [];
    })
  }

}