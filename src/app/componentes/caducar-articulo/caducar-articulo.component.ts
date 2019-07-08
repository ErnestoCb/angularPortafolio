import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';

@Component({
  selector: 'app-caducar-articulo',
  templateUrl: './caducar-articulo.component.html',
  styleUrls: ['./caducar-articulo.component.css']
})
export class CaducarArticuloComponent implements OnInit {
  articulos:any;
  partidas: any[] = [];

  articulo:number;
  mostrar: boolean = false;
  constructor(private apiService: ApiService,
    private sessionstore: SesionStoreService,
    private httpClient: HttpClient, ) { }

  ngOnInit() {
    this.getArticulos();
  }


  getArticulos() {
    this.articulos = [];
    this.apiService.getArticulos().subscribe((data: [{}]) =>{
      console.log(data);
      this.articulos = data;
    });
  }

  getPartides(){
    this.traePartidas();
    (this.articulo != undefined) ? this.mostrar = true : this.mostrar = false;
  }

  caducar(esto){
    console.log(esto);
  }

  
  displayedColumns: string[] = ['id', 'fechaPartida', 'cantidadLlegada', 'cantidadRestante', 'descripcion', 'caducar'];
  dataSource = new MatTableDataSource(this.partidas);

  traePartidas() {
    this.partidas = [];
    this.getPartidas().subscribe((data: [{}]) =>{
      console.log(data);
      this.partidas = data;
      this.filtro();
    });
  }

  filtro(){
    this.partidas = this.partidas.filter(data => data.articulo.id == this.articulo);
  }


  getPartidas():Observable<any>{
    const urlLoco: string = 'http://localhost:8080/api/v1/partidas/';
  
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': this.sessionstore.token
      })
    };

    return this.httpClient.get(urlLoco,httpOptions2);
  }

}
