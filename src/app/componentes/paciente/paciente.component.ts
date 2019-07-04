import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { SelectsService } from '../../servicios/selects.service';

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
  
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Debes ingresar un valor' :
        this.email.hasError('email') ? 'Correo invalido' :
            '';
  }
  constructor(private sessionstore: SesionStoreService, private httpClient: HttpClient, private selects: SelectsService) { }
  
  ngOnInit() {
    this.traigoLosSelectsQLOS();
    setTimeout(() => {
      console.log(this.nacionalidades);
    }, 500);
    /*
    setTimeout(() => {
      console.log(this.datitos);
    }, 500);
    */
  }

  traigoLosSelectsQLOS() {
    this.selects.webService('previsiones').toPromise().then(data =>{ 
      data.forEach(element => {
        this.previsiones.push(element);
      });
    });
    this.selects.webService('sexos').toPromise().then(data =>{ 
      data.forEach(element => {
        this.sexos.push(element);
      });
    });
    this.selects.webService('carnets').toPromise().then(data =>{ 
      data.forEach(element => {
        this.carnet.push(element);
      });
    });
    this.selects.webService('regiones').toPromise().then(data =>{ 
      data.forEach(element => {
        this.regiones.push(element);
      });
    });
    this.selects.webService('comunas').toPromise().then(data =>{ 
      data.forEach(element => {
        this.comunas.push(element);
      });
    });
    this.selects.webService('nacionalidades').toPromise().then(data =>{ 
      data.forEach(element => {
        this.nacionalidades.push(element);
      });
    });




  }





}
