import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentosBeneficiarios } from '../../../models/documentos-beneficiarios';
import { DocumentosService } from '../../../services/documentos.service';
import { timer } from 'rxjs';
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';
import { Message } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.css']
})
export class EditarDocumentosComponent implements OnInit {

  cedula_persona: string = localStorage.getItem('cedulaEditar');
  listaDocumentos: DocumentosBeneficiarios[]
  documentoEliminar: DocumentosBeneficiarios = {}
  tipos: any[];
  tipo: any;
  evento: any;
  displayEliminar: boolean = false;
  selectedFile: FileList;
  nombreDoc: string = '';
  archivos: [];
  persona: Personas = {}
  texto: string = "Seleccione un archivo"
  msgs: Message[];
  //Logeo
  tipoUser:any

  constructor(private documentoserver: DocumentosService, private router: Router, private personaservice: PersonasService) {
    this.tipos = [
      { tip: 'Cédula' },
      { tip: 'Carnet' },
      { tip: 'RUC' },
      { tip: 'Documentación extra' },
      { tip: 'Pasaporte' },
      { tip: 'Cédula de un familiar' },
      { tip: 'Carnet de familiar' },
      { tip: 'RUC de familiar' },
      { tip: 'Documentación extra de familiar' },
      { tip: 'Pasaporte de familair' },
      { tip: 'Otro' }
    ]
  }

  ngOnInit(): void {
    this.ComprobarLogin()
    this.archivos = []
    this.cargarDocumentos()
  }

  ComprobarLogin() {
    this.tipoUser = localStorage.getItem('rolUser');
    if (this.tipoUser == 1 || this.tipoUser == 2) {
    } else if (this.tipoUser == 3 || this.tipoUser == 4) {
      Swal.fire({
        title: 'No tiene permisos para agregar o editar documentos',
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

  cargarDocumentos() {
    this.documentoserver.getBycedula(this.cedula_persona).subscribe(data => {
      this.listaDocumentos = data;
    })
    this.personaservice.getUserByCedula(this.cedula_persona).subscribe(data => {
      this.persona = data;
    })
  }

  selectFile(event): any {
    this.evento = event;
    this.nombreDoc = this.persona.cedula+event.target.files[0].name;
    this.texto = "Archivo cargado: "+this.nombreDoc
  }

  postDocumento() {
    if(this.tipo == null  || this.nombreDoc == ''){
      this.addMultiple('error', 'Error', 'Por favor complete la información');
    } else {
      let nuevoDocumento: DocumentosBeneficiarios = {
        cedulaPersona: this.cedula_persona,
        nombreArchivo: this.nombreDoc,
        tipoDocumento: this.tipo.tip
      }
      this.documentoserver.postRegostroDocumentos(nuevoDocumento).subscribe(data => {
        this.reperarevent();
        this.addMultiple('success', 'Exito', 'Se ha guardado con exito la información');
      })
    }
  }

  reperarevent() {
    const files = this.evento.target.files;
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, this.persona.cedula+file.name);
    }
    this.documentoserver.upload(formData).subscribe(event => {
      const contador = timer(2000);
      contador.subscribe((n) => {
        window.location.reload();
      })
    });
  }

  onDownloadFile(filename: string): void {
    this.documentoserver.ver(filename).subscribe(event => {

    });
  }

  modalEliminar(doc: DocumentosBeneficiarios) {
    this.displayEliminar = true;
    this.documentoEliminar = doc;
  }

  eliminar() {
    this.documentoserver.delete(this.documentoEliminar.nombreArchivo).subscribe(data => {
    });
    this.documentoserver.deleteBase(this.documentoEliminar.idDocumentos).subscribe(data => {
    });
    const contador = timer(2000);
    contador.subscribe((n) => {
    window.location.reload();
  })
  }

  addMultiple(severity1: string, sumary1: string, detail1: string) {
    this.msgs =
      [{ severity: severity1, summary: sumary1, detail: detail1 }];
    const contador = timer(6000);
    contador.subscribe((n) => {
      this.msgs = [];
    })
  }

  cancelar() {
    this.router.navigate(['/lista-beneficiarios']);
  }

}