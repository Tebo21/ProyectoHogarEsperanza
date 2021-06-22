import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Img, ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ConfirmationService } from 'primeng/api';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios.service';
type TableRow = [string, string, string, string];

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  providers: [ConfirmationService]
})
export class ListadoUsuariosComponent implements OnInit {
  listaUsuarios: Usuarios[];
  selected: Usuarios[];
  selectedUsers: Usuarios2[];
  selectedUsersE: Usuarios2[];
  usuario: Usuarios = {};
  usuarioA: Usuarios = {};
  nuevoUser: Usuarios = {};
  nuevoUserE: Usuarios = {};
  nuevoUserSelected: Usuarios2 = {};
  displayEditar: boolean = false;
  usuarioEdit: Usuarios = {};
  listadoTipo: any[];
  tipo: any;
  valido: boolean;
  usuarioT: number;
  usuarioFechaCreacion: Date = new Date;
  value: any;

  constructor(private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,) {
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
        this.nuevoUser = this.listaUsuarios[i];
        const usuarioImprimir: Usuarios2 = {
          ID: this.nuevoUser.idUsuario,
          Cédula: this.nuevoUser.usuarioCedula,
          FechaCreacion: this.nuevoUser.usuarioFechaCreacion,
          NombreDeUsuario: this.nuevoUser.usuarioNombre,
          Tipo: this.tipoUsuario(this.nuevoUser.usuarioTipo).toString()
        }
        this.selectedUsers.push(usuarioImprimir);
      }
    })
  }

  //Editar
  showDialogEditar(usu: Usuarios) {
    this.displayEditar = true;
    this.usuarioA = usu;
  }

  actualizarUsuario() {
    const nu: Usuarios = {
      idUsuario: this.usuarioA.idUsuario,
      usuarioCedula: this.usuarioA.usuarioCedula,
      usuarioContrasenia: this.usuarioA.usuarioContrasenia,
      usuarioNombre: this.usuarioA.usuarioNombre,
      usuarioTipo: this.usuarioT,
      usuarioEstado: true,
      usuarioFechaCreacion: this.usuarioA.usuarioFechaCreacion
    }
    this.usuarioService.updateUser(nu).subscribe(data => {
      this.usuarioEdit = data;
      alert('Se ha actualizado exitosamente')
      window.location.reload();
    });
  }

  eliminarUsuario(id: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Está seguro de eliminar este usuario?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.deleteUser(id).subscribe(data => {
          this.usuario = data;
          window.location.reload();
        });
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
      pdf.info({
        title: 'Reporte de productos disponibles',
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
    pdf.info({
      title: 'Reporte de productos disponibles',
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
    pdf.add(this.creaTabla(this.listaUsuarios));
    pdf.create().open();
  }

  creaTabla(data: Usuarios[]): ITable {
    [{}];
    return new Table([
      ['Cédula', 'Nombre de usuario', 'Tipo', 'Fecha de creación'],
      ...this.extraerDatos(data),
    ])
      .widths('*')
      .heights((rowIndex) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? '#CCCCCC' : '';
        },
      }).end;
  }

  extraerDatos(data: Usuarios[]): TableRow[] {
    return data.map((row) => [
      row.usuarioCedula,
      row.usuarioNombre,
      this.tipoUsuario(row.usuarioTipo),
      row.usuarioFechaCreacion,
    ]);

  }

  exportSelectedX() {
    if (this.selected.length < 1) {
      alert('Por favor seleccione al menos un usuario')
    } else {
      for (let i = 0; i < this.selected.length; i++) {
        this.nuevoUserE = this.selected[i];
        const usuarioImprimirSelected: Usuarios2 = {
          ID: this.nuevoUserE.idUsuario,
          Cédula: this.nuevoUserE.usuarioCedula,
          FechaCreacion: this.nuevoUserE.usuarioFechaCreacion,
          NombreDeUsuario: this.nuevoUserE.usuarioNombre,
          Tipo: this.tipoUsuario(this.nuevoUserE.usuarioTipo).toString()
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
  }

}

export class Usuarios2 {

  ID?: number;
  Cédula?: string;
  NombreDeUsuario?: string;
  Tipo?: string;
  FechaCreacion?: string;

}