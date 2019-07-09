import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
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
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {

  mostrarData: boolean = false;
  dataPaciente: any = {};
  reservas: any = [];
  
  rut: string= "19.235.415-3";
  nombre: string;

  detalles: any = [
    { id: 1,
      dias: 1, 
      intervalos: 8,
      articulo: "Abrazolam",
      cantidad: 3,
      permanente: false
    },
    { id: 2,
      dias: 3, 
      intervalos: 8,
      articulo: "Aspirina",
      cantidad: 10,
      permanente: false
    }
  ]
  constructor(private sessionstore: SesionStoreService, private httpClient: HttpClient, private selects: SelectsService,
    public datepipe: DatePipe,
    private snackBar: MatSnackBar, 
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    
  }


  displayedColumns: string[] = ['id', 'articulo', 'cantidad', 'entregado'];
  dataSource = new MatTableDataSource(this.detalles);



  send(){
    this.snackBar.open("Articulos entregados al paciente", "OK!", { duration: 3000});
    this.router.navigate(['home/inicio']);
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
        'Authorization': this.sessionstore.token
      })
    };

    return this.httpClient.get(urlLoco,httpOptions2);
  }



  getReservas(id):Observable<any>{
    const urlLoco: string = 'http://localhost:8080/api/v1/reservas/' + id;
  
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': this.sessionstore.token
      })
    };

    return this.httpClient.get(urlLoco,httpOptions2);
  }

}
