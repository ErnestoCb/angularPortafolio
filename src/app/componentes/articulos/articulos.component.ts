import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: any[];
  displayedColumns: string[] = ['descripcion', 'id_tipo', 'id_fabricante', 'componentes', 'contenido', 'gramaje', 'stock'];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.articulos = [];
    this.apiService.getArticulos().subscribe((data: [{}]) =>{
      console.log(data);
      this.articulos = data;
    });
  }

  
}
