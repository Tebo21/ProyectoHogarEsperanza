import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  navegar(){
    this.router.navigateByUrl('/registro-producto');
  }

}
