import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';

@Component({
  selector: 'app-lista-partidas',
  templateUrl: './lista-partidas.component.html',
  styleUrls: ['./lista-partidas.component.css']
})
export class ListaPartidasComponent implements OnInit {

  partidas: any[] = [];
  constructor(private sessionstore: SesionStoreService,
    private httpClient: HttpClient, 
    ) { }

  ngOnInit() {
    this.traePartidas();
  }



  displayedColumns: string[] = ['id', 'fechaPartida', 'cantidadLlegada', 'cantidadRestante', 'descripcion'];
  dataSource = new MatTableDataSource(this.partidas);

  traePartidas() {
    this.partidas = [];
    this.getPartidas().subscribe((data: [{}]) =>{
      console.log(data);
      this.partidas = data;
    });
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
