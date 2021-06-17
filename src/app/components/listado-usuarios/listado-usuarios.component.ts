import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { ConfirmationService } from 'primeng/api';
import { Img, ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
type TableRow = [number, string, string, number, string];
import * as FileSaver from 'file-saver';
import { timer } from 'rxjs';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  providers: [ConfirmationService]
})
export class ListadoUsuariosComponent implements OnInit {
  listaUsusarios: Usuarios[];
  selectedUsers: Usuarios2[];
  usuario: Usuarios = {};
  usuarioA: Usuarios = {};
  nuevoUser: Usuarios = {};
  ImpUser: Usuarios2 = {};
  displayEditar: boolean = false;
  usuarioEdit: Usuarios = {};
  listadoTipo: any[];
  tipo: any;
  valido: boolean;
  usuarioT: number;
  usuarioFechaCreacion: Date;
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
      this.listaUsusarios = data;
      this.usuarioFechaCreacion = new Date;
      for (let i = 0; i < this.listaUsusarios.length; i++) {
        this.nuevoUser = this.listaUsusarios[i];
        this.ImpUser.idUsuario = this.nuevoUser.idUsuario,
        this.ImpUser.usuarioCedula = this.nuevoUser.usuarioCedula,
        this.ImpUser.usuarioFechaCreacion = this.nuevoUser.usuarioFechaCreacion,
        this.ImpUser.usuarioNombre = this.nuevoUser.usuarioNombre,
        this.ImpUser.usuarioTipo = this.nuevoUser.usuarioTipo
        this.selectedUsers.push(this.ImpUser) 
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
          console.log(this.usuario);

          window.location.reload();
        });
      },
      reject: () => {
      }
    });
  }

  async crearReporte() {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Reporte de productos disponibles',
    });
    pdf.add(await new Img('../../assets/img/logo.png').build());
    pdf.add(
      new Txt('Lista de usuarios registrados').alignment('center').bold().end
    );
    pdf.add(new Txt('   ').end);
    pdf.add(this.creaTabla(this.listaUsusarios));
    pdf.create().open();
  }


  creaTabla(data: Usuarios[]): ITable {
    [{}];
    return new Table([
      ['ID', 'Cédula', 'Nombre de usuario', 'Tipo de usuario', 'Fecha de creación'],
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
      row.idUsuario,
      row.usuarioCedula,
      row.usuarioNombre,
      row.usuarioTipo,
      row.usuarioFechaCreacion,
    ]);
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

  idUsuario?: number;
  usuarioCedula?: string;
  usuarioNombre?: string;
  usuarioTipo?: number;
  usuarioFechaCreacion?: string;

}
