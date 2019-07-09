import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';
import { SelectsService } from '../../servicios/selects.service';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-prescripcion',
  templateUrl: './prescripcion.component.html',
  styleUrls: ['./prescripcion.component.css']
})
export class PrescripcionComponent implements OnInit {

  mostrarData: boolean = false;
  dataPaciente: any = {};
  rut: string= "19.235.415-3";
  nombre: string;
  articulos:any;

  mostrarTratamiento: boolean = false;

  detalles: any = [
    { dias: 0, 
      intervalos: 0,
      articulo: 1,
      cantidad: 0,
      permanente: false
    }
  ]

  tratLargo: any = {
    fechaUlt: "",
    fechaProx: "",
    evaluacion: false,
  }

  constructor(private sessionstore: SesionStoreService, private httpClient: HttpClient, private selects: SelectsService,
    public datepipe: DatePipe,
    private snackBar: MatSnackBar, 
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.getArticulos();
  }




  getPaciente(){
    this.traePaciente(this.rut);
    this.mostrarData = !this.mostrarData;
  }

  traePaciente(rut) {
    this.getPacienteByRut(rut).subscribe((data: {}) =>{
      console.log(data);
      this.dataPaciente = data;
      this.nombre = this.dataPaciente.nombre + ' ' + this.dataPaciente.apellidoPaterno + ' ' + this.dataPaciente.apellidoMaterno;
    });
  }


  getPacienteByRut(rut: string):Observable<any>{
    const urlLoco: string = 'http://localhost:8080/api/v1/pacientes/' + rut;
  
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.sessionstore.token
      })
    };

    return this.httpClient.get(urlLoco,httpOptions2);
  }





  send(){
    let json:any = {}
    /*
    this.detalles.forEach(element => {
      json = {
        "dias": element.dias,
        "intervalos": element.intervalos,
        "permanente": element.permanente,
        "articulo": {
          "id": element.articulo
        }
      };
      console.log(json);
      this.sendDetalle(json, element.articulo);
    });*/
    this.guardarWeas();
    console.log(this.detalles);
    this.snackBar.open("Receta creada correctamente", "OK!", { duration: 3000});
    this.router.navigate(['home/inicio']);
    
  }

  guardarWeas(){
    sessionStorage.setItem('weas', this.detalles)
  }




  sendReservas(json: any):Observable<any>{
    const url: string = "http://localhost:8080/api/v1/reservas/";

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
          alert("Existe un problema al crear la receta");
        }
        
        return throwError(err.status);
      })
    );
  }

  sendDetalle(json, id):void{

    this.sendReservas(json).subscribe(data => {
      console.log(data);

      this.router.navigate(['home/inicio']);
    });

  }



  addPartida(){
    this.detalles.push(
      { dias: 0, 
        intervalos: 0,
        articulo: 1,
        cantidad: 0,
        permanente: false
      }
    );
    console.log(this.detalles);
  }

  deletePartida(index){
    this.detalles.splice(index, 1);
    //console.log(item);
    //console.log(index);
  }

  changeDias(item, index){
    //console.log(item.srcElement.value);
    this.detalles[index].dias = item.srcElement.value;
    //console.log(this.partidas);
  }

  changeIntervalos(item, index){
    //console.log(item.srcElement.value);
    this.detalles[index].intervalos = item.srcElement.value;
    //console.log(this.partidas);
  }

  changeArticulo(item, index){
    //console.log(item.srcElement.value);
    this.detalles[index].articulo = item.value;
    console.log(this.detalles);
  }

  changeCantidad(item, index){
    //console.log(item.srcElement.value);
    this.detalles[index].cantidad = item.srcElement.value;
    console.log(this.detalles);
  }

  changePermanente(item, index){
    //console.log(item.checked);
    //console.log(item.srcElement.value);
    this.detalles[index].permanente = item.checked;
    //console.log(this.detalles);
  }

  changeFecha2(item, index){
    console.log(item.value);
    this.tratLargo.fechaProx = this.cambioFecha(item.value);
  }

  cambioFecha(fecha: Date){
    let nuevaFecha =this.datepipe.transform(fecha, 'dd/MM/yyyy');
    return nuevaFecha;
  }

  changeEvaluacion(item){
    //console.log(item.srcElement.value);
    this.tratLargo.evaluacion = item.checked;
  }

  mostrarTrata(item){
    console.log(item);
    console.log(this.mostrarTratamiento);
    this.mostrarTratamiento = item.checked;
    console.log(this.mostrarTratamiento);
  }
  


  getArticulos() {
    this.articulos = [];
    this.apiService.getArticulos().subscribe((data: [{}]) =>{
      console.log(data);
      this.articulos = data;
    });
  }


}
