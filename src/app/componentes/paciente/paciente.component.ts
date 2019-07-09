import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { SelectsService } from '../../servicios/selects.service';
import { HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  previsiones = [];
  sexos = [];
  carnet = [];
  regiones = [];
  comunas = [];
  nacionalidades = [];
  //valores escogidos
  nacionalidad: number = 39;
  region: number = 7;
  comuna: number;
  sexo:number;
  prevision:number;
  carn:number;

  numero:number;
  nombre:string;
  app:string;
  apm:string;
  rut:string;
  date:string;
  ruttutor:string;
  nombretutor:string;
  
  email = new FormControl('', [Validators.required, Validators.email]);

  datite = new FormControl(new Date('1995-12-17'));

  getErrorMessage() {
    return this.email.hasError('required') ? 'Debes ingresar un valor' :
        this.email.hasError('email') ? 'Correo invalido' :
            '';
  }
  constructor(private sessionstore: SesionStoreService, 
    private httpClient: HttpClient, 
    private selects: SelectsService,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    public router: Router) { }
  
  ngOnInit() {
    this.traigoLosSelectsQLOS();
    setTimeout(() => {
      this.cambiaRegion();
    }, 500);

    
    /*
    setTimeout(() => {
      console.log(this.datitos);
    }, 500);
    */
  }

  test(){
    
    let json = {
      "nombre" : this.nombre,
      "apellidoPaterno": this.app,
      "apellidoMaterno": this.apm,
      "rut": this.rut,
      "fechaNacimiento": this.date,
      "numeroCelular": this.numero,
      "telefonoFijo": "99999998",
      "rutTutor": this.ruttutor,
      "nombreTutor": this.nombretutor,
      "emailTutor": this.email.value,
      "estadoCivil": {
                "id": 1
            },
      "sexo": {
                "id": this.sexo
            },
      "prevision": {
                "id": this.prevision
            },
      "carnet": {
                "id": this.carn
            },
      "region": {
                "id": this.region
            },
      "comuna": {
                "id": this.comuna
            },
      "nacionalidad": {
                "id": this.nacionalidad
            }
    }
    console.log(json);
    this.sendPaciente(json);
    this.snackBar.open("Paciente agregado correctamente", "OK!", { duration: 3000});
    
  }

  sendPaciente(json):void{

    this.addPaciente(json).subscribe(data => {
      console.log(data);
      this.router.navigate(['home/inicio']);
    });

  }

  cambiaRegion(){
    this.traigoLosSelectsQLOS();
    console.log(this.comunas);
    setTimeout(() => {
      this.comunas = this.comunas.filter(data => data.region.id == this.region);
    }, 1000);
    console.log(this.comunas);
  }

  addPaciente(json: any):Observable<any>{
    const url: string = "http://localhost:8080/api/v1/pacientes/";

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
          alert("Existe un problema con agregar paciente");
        }
        
        return throwError(err.status);
      })
    );

  }


  traigoLosSelectsQLOS() {
    this.selects.webService('previsiones').toPromise().then(data =>{ 
      this.previsiones = data;
    });
    this.selects.webService('sexos').toPromise().then(data =>{ 
      this.sexos = data;
    });
    this.selects.webService('carnets').toPromise().then(data =>{ 
      this.carnet = data;
    });
    this.selects.webService('regiones').toPromise().then(data =>{ 
      /*data.forEach(element => {
        this.regiones.push(element);
      });
      */
      this.regiones = data;
    });
    this.selects.webService('comunas').toPromise().then(data =>{ 
      this.comunas = data;
    });
    this.selects.webService('nacionalidades').toPromise().then(data =>{ 
      this.nacionalidades = data;
    });
  }

  cambioFecha(fecha: Date){
    let nuevaFecha =this.datepipe.transform(fecha, 'dd/MM/yyyy');
    return nuevaFecha;
  }

  changeFecha(item){
    console.log(item.value);
    this.date = this.cambioFecha(item.value);
    console.log(this.date);
  }



}
