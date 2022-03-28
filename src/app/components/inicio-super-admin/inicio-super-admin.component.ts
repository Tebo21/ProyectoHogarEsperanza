import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-super-admin',
  templateUrl: './inicio-super-admin.component.html',
  styleUrls: ['./inicio-super-admin.component.css']
})
export class InicioSuperAdminComponent implements OnInit {

  nombreUsuario:any;
  tipoUser:any

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.tipoUser = localStorage.getItem('rolUser');
      if (this.tipoUser == 1 || this.tipoUser == 2 || this.tipoUser == 3 || this.tipoUser == 4) {
        this.nombreUsuario = localStorage.getItem('usuarioA')
      } else {
        Swal.fire({
          title: 'Por favor inicie sesión primero',
          icon: 'error',
        });
        this.router.navigateByUrl('login');
      }
  
  }

}
