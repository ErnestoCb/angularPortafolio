import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { SelectsService } from '../../servicios/selects.service';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-nueva-partida',
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class NuevaPartidaComponent implements OnInit {

  articulos:any;
  hoy = this.cambioFecha(new Date());    
  partidas: any = [
    { cantidadLlegada: 0, 
      fechaPartida: this.hoy,
      articulo: 1
    }
  ];

  date = new FormControl(new Date('1995-12-17'));

  constructor(private sessionstore: SesionStoreService, 
    private httpClient: HttpClient, 
    private selects: SelectsService,
    private snackBar: MatSnackBar, 
    private apiService: ApiService,
    public datepipe: DatePipe,
    private router: Router) { }

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

  addPartida(){
    this.partidas.push(
      { cantidadLlegada: 0, 
        fechaPartida: this.hoy,
        articulo: 1
      }
    );
    console.log(this.partidas);
  }

  deletePartida(item, index){
    this.partidas.splice(index, 1);
    //console.log(item);
    //console.log(index);
  }

  changeCantidad(item, index){
    //console.log(item.srcElement.value);
    this.partidas[index].cantidadLlegada = item.srcElement.value;
    //console.log(this.partidas);
  }

  changeFecha(item, index){
    console.log(item.value);
    this.partidas[index].fechaPartida = this.cambioFecha(item.value);
  }

  changeArticulo(item, index){
    console.log(item.value);
    this.partidas[index].articulo = item.value;
  }

  cambioFecha(fecha: Date){
    let nuevaFecha =this.datepipe.transform(fecha, 'dd/MM/yyyy');
    return nuevaFecha;
  }

  sendPartidas(json: any):Observable<any>{
    const url: string = "http://localhost:8080/api/v1/partidas/";

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
          alert("Existe un problema al agregar las partidas");
        }
        
        return throwError(err.status);
      })
    );
  }

  sendPaciente(json, id):void{

    this.sendPartidas(json).subscribe(data => {
      console.log(data);


      let stockActual = this.apiService.getArticulosById(id).subscribe(data =>{
        console.log("articulo qyue traje");
        console.log(data.stock);
      });


    });

  }

  send(){
    let json:any = {}
    this.partidas.forEach(element => {
      json = {
        "cantidadLlegada": element.cantidadLlegada,
        "cantidadRestante": element.cantidadLlegada,
        "fechaPartida": element.fechaPartida,
        "articulo": {
          "id": element.articulo
        }
      };
      console.log(json);
      this.sendPaciente(json, element.articulo);
    });
    this.router.navigate(['home/listarPartida']);
    this.snackBar.open("Partidas agregadas correctamente", "OK!", { duration: 3000});

  }




}
