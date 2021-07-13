import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.css']
})
export class EditarDocumentosComponent implements OnInit {

  constructor(private root:Router) { }

  ngOnInit(): void {
  }

}
