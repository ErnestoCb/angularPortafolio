import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';

@Component({
  selector: 'app-caducado',
  templateUrl: './caducado.component.html',
  styleUrls: ['./caducado.component.css']
})
export class CaducadoComponent implements OnInit {

  caducados: any[] = [];
  constructor(private sessionstore: SesionStoreService,
    private httpClient: HttpClient, 
    ) { }


    caducarlo: any[] = [{
      "id": "1",
      "fechaDesechado": "09/07/2019",
      "cantidad": "10",
      "motivoCaducado": "Expiracion",
      "partida": "1",
      "articulo": "Aspirina",
    }];

  
  displayedColumns: string[] = ['id', 'fechaDesechado', 'cantidad', 'motivoCaducado', 'partida', 'articulo', 'eliminar'];
  dataSource = new MatTableDataSource(this.caducarlo);

  ngOnInit() {
  }

}
