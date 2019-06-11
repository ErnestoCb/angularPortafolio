import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insert-articulos',
  templateUrl: './insert-articulos.component.html',
  styleUrls: ['./insert-articulos.component.css']
})
export class InsertArticulosComponent implements OnInit {

  tipos: any = [
    { "value": "1", "nombre": "Tipo1"},
    { "value": "2", "nombre": "Tipo2"},
    { "value": "3", "nombre": "Tipo3"}
  ];
  fabricantes: any = [
    { "value": "1", "nombre": "Fabricante1"},
    { "value": "2", "nombre": "Fabricante2"},
    { "value": "3", "nombre": "Fabricante3"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
