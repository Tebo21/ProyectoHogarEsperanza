import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { Img, ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ConfirmationService } from 'primeng/api';
import { Personas } from 'src/app/models/personas';
import { Usuarios } from 'src/app/models/usuarios';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
type TableRow = [string, string, string, string, string, string];

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  providers: [ConfirmationService]
})
export class ListadoUsuariosComponent implements OnInit {
  //Usuario
  usuario: Usuarios = {};
  listaUsuarios: Usuarios[];
  //Usuarios DTO
  selected: Usuarios2[];
  selectedUsers: Usuarios2[];
  selectedUsersE: Usuarios2[];
  nuevoUserE: Usuarios2 = {};
  //Persona
  Persona: Personas = {};
  //Listas de DropDown
  listadoTipo: any[];
  tipo: any;
  valido: boolean;
  //Validacion de tipo de usuario
  usuarioT: number;
  usuarioFechaCreacion: Date = new Date;
  ListadoPersonas: Personas[];
  ListadoInactivos: Personas[] = [];
  personaEliminar: Personas = {};

  constructor(private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private personaService: PersonasService,
    private router: Router) {
    this.listadoTipo = [
      { tip: 'SuperAdministrador' },
      { tip: 'Administrador' },
      { tip: 'Voluntario Interno' },
      { tip: 'Voluntario Externo' }
    ]
  }

  ngOnInit(): void {
    this.selectedUsers = [];
    this.selected = [];
    this.selectedUsersE = [];
    this.ListadoPersonas = [];
    this.listarUsuarios();
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

  //Selector de id automatico
  onChange(event: any) {
    if (event.value == null) {
      this.valido = false;
    } else {
      this.valido = true;
      if (this.tipo.tip == 'SuperAdministrador') {
        this.usuarioT = 1;
      } else if (this.tipo.tip == 'Administrador') {
        this.usuarioT = 2;
      } else if (this.tipo.tip == 'Voluntario Interno') {
        this.usuarioT = 3;
      } else if (this.tipo.tip == 'Voluntario Externo') {
        this.usuarioT = 4;
      }
    }
  }

  listarUsuarios() {
    this.usuarioService.getAll().subscribe(data => {
      this.listaUsuarios = data;
      for (let i = 0; i < this.listaUsuarios.length; i++) {
        this.personaService.getPorCedula(this.listaUsuarios[i].usuarioCedula).subscribe(data2 => {
          this.Persona = data2
          if (this.Persona.estadoActivo == true) {
            this.ListadoPersonas.push(this.Persona)
            const usuarioImprimir: Usuarios2 = {
              cedula: this.Persona.cedula,
              nombres: this.Persona.nombres + ' ' + this.Persona.apellidos,
              direccion: this.Persona.direccion,
              telefono: this.Persona.celular,
              correo: this.Persona.correo,
              tipousuario: this.tipoUsuario(this.listaUsuarios[i].usuarioTipo).toString()
            }
            this.selectedUsers.push(usuarioImprimir);
          }
          else if (this.Persona.estadoActivo == false) {
            this.ListadoInactivos.push(this.Persona)
          }
        })
      }
    })
  }

  eliminarUsuario(cedula: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `¿Está seguro de eliminar este usuario?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.personaService.getPorCedula(cedula).subscribe(data2 => {
          this.personaEliminar = data2;
          this.personaEliminar.estadoActivo = false;
          this.personaService.updatePersona(this.personaEliminar).subscribe(data => {
          });
        })
        this.usuarioService.getUserByCedula(cedula).subscribe(data3 => {
          this.usuario = data3;
          this.usuario.usuarioEstado = false;
          this.usuarioService.updateUser(this.usuario).subscribe(data => {
            alert('Se ha eliminado a '+this.personaEliminar.nombres+' ('+this.usuario.usuarioNombre+')')
            window.location.reload();
          });
        })
      },
      reject: () => {
      }
    });
  }

  async exportSelected() {
    if (this.selected.length < 1) {
      alert('Por favor seleccione al menos un usuario')
    } else {
      const pdf = new PdfMakeWrapper();
      pdf.pageOrientation('landscape');
      pdf.pageSize('A4');
      pdf.info({
        title: 'Reporte de Usuarios',
      });
      pdf.add(await new Img('../../assets/img/logo.png').build());
      pdf.add(
        new Txt('Fecha de reporte: ' + ((this.usuarioFechaCreacion.getDate() < 10) ? '0' : '') + this.usuarioFechaCreacion.getDate() + "-" + (((this.usuarioFechaCreacion.getMonth() + 1) < 10) ? '0' : '') + (this.usuarioFechaCreacion.getMonth() + 1) + "-" + this.usuarioFechaCreacion.getFullYear()
          + ' Hora: ' + this.usuarioFechaCreacion.getHours() + ":" + this.usuarioFechaCreacion.getMinutes()).alignment('right').end
      );
      pdf.add(new Txt('   ').end);
      pdf.add(
        new Txt('Lista de usuarios registrados').alignment('center').bold().fontSize(16).end
      );
      pdf.add(new Txt('   ').end);
      pdf.add(this.creaTabla(this.selected));
      pdf.create().open();
    }

  }

  async crearReporte() {
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    pdf.info({
      title: 'Reporte de Usuarios',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(
      new Txt('Fecha de reporte: ' + ((this.usuarioFechaCreacion.getDate() < 10) ? '0' : '') + this.usuarioFechaCreacion.getDate() + "-" + (((this.usuarioFechaCreacion.getMonth() + 1) < 10) ? '0' : '') + (this.usuarioFechaCreacion.getMonth() + 1) + "-" + this.usuarioFechaCreacion.getFullYear()
        + ' Hora: ' + this.usuarioFechaCreacion.getHours() + ":" + this.usuarioFechaCreacion.getMinutes()).alignment('right').end
    );
    pdf.add(new Txt('   ').end);
    pdf.add(
      new Txt('Lista de usuarios registrados').alignment('center').bold().fontSize(16).end
    );
    pdf.add(new Txt('   ').end);
    pdf.add(this.creaTabla(this.selectedUsers));
    pdf.create().open();
  }

  creaTabla(data: Usuarios2[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Nombres', 'Dirección', 'Teléfono', 'Correo', 'Rol'],
      ...this.extraerDatos(data),
    ])
      .widths([85, 140, 130, 100, 142, 110])
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos(data: Usuarios2[]): TableRow[] {
    return data.map((row) => [
      row.cedula,
      row.nombres,
      row.direccion,
      row.telefono,
      row.correo,
      row.tipousuario
    ]);

  }

  exportSelectedX() {
    if (this.selected.length < 1) {
      alert('Por favor seleccione al menos un usuario')
    } else {
      for (let i = 0; i < this.selected.length; i++) {
        this.nuevoUserE = this.selected[i];
        const usuarioImprimirSelected: Usuarios2 = {
          cedula: this.nuevoUserE.cedula,
          nombres: this.nuevoUserE.nombres,
          direccion: this.nuevoUserE.direccion,
          telefono: this.nuevoUserE.cedula,
          correo: this.nuevoUserE.correo,
          tipousuario: this.nuevoUserE.tipousuario
        }
        this.selectedUsersE.push(usuarioImprimirSelected);
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.selectedUsersE);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Usuarios");
      });
    }

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.selectedUsers);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Usuarios");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    location.reload();
  }

  ActualizarUsuario(cedula: any) {
    localStorage.setItem('cedulaEditar', cedula);
    this.router.navigateByUrl('editar-usuario');
  }
}

export class Usuarios2 {

  cedula?: string;
  nombres?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
  tipousuario?: string;

}
