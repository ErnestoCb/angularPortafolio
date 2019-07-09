import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-caducar-articulo',
  templateUrl: './caducar-articulo.component.html',
  styleUrls: ['./caducar-articulo.component.css']
})
export class CaducarArticuloComponent implements OnInit {
  articulos:any;
  partidas: any[] = [];
  motivos: any[] = [];

  caducarlo: {
    "fechaDesechado": "09/07/2019",
    "cantidad": 10,
    "motivoCaducado": {
      "id":1
    },
    "partida": {
      "id": 1
    },
    "rutReceptor": "11.111.111-1"
  }

  articulo:number;
  mostrar: boolean = false;
  constructor(private apiService: ApiService,
    private sessionstore: SesionStoreService,
    private snackBar: MatSnackBar, 
    private httpClient: HttpClient,
    private router: Router ) { }

  ngOnInit() {
    this.getArticulos();
    this.traeMotivos();
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
    //this.sendCaducar(this.caducarlo);

    this.snackBar.open("Articulo Caducado correctamente", "OK!", { duration: 3000});
    this.router.navigate(['home/caducado']);
  }

  sendCaducar(json):void{

    this.sendCaduco(json).subscribe(data => {
      console.log(data);
      this.router.navigate(['home/caducado']);
    });

  }

  sendCaduco(json: any):Observable<any>{
    const url: string = "http://localhost:8080/api/v1/caducados/";

    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.sessionstore.token
      })
    };

    return this.httpClient.post<any>(url, json, httpOptions2).pipe(
      catchError((err: HttpErrorResponse)=>{
        console.log(err);

        
        if (err.status == 401) {
          alert("El usuario o contraseña ingresados son incorrectos");
        } else {
          alert("Existe un problema al caducar");
        }
        
        return throwError(err.status);
      })
    );
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

  traeMotivos() {
    this.getMotivos().subscribe((data: []) =>{
      console.log(data);
      this.motivos = data;
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

  getMotivos():Observable<any>{
    const urlLoco: string = 'http://localhost:8080/api/v1/motivo_caducados/';
  
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.sessionstore.token
      })
    };

    return this.httpClient.get(urlLoco,httpOptions2);
  }

}
