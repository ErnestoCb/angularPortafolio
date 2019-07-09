import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { SelectsService } from '../../servicios/selects.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent implements OnInit {
  previsiones = [];
  sexos = [];
  carnet = [];
  regiones = [];
  comunas = [];
  nacionalidades = [];

  //
  mostrarData: boolean = false;
  dataPaciente: any = {};

  rut: string;
  nacionalidad: number = 39;
  region: number = 7;
  comuna: number = 39;
  sexo:number = 1;
  prevision:number = 1;
  carn:number = 1;

  date = new FormControl(new Date());
  
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private sessionstore: SesionStoreService, private httpClient: HttpClient, private selects: SelectsService) { }

  ngOnInit() {
    this.traigoLosSelectsQLOS();
    setTimeout(() => {
      //this.cambiaRegion();
    }, 500);
  }




  getPaciente(){
    this.traePaciente(this.rut);
    this.mostrarData = !this.mostrarData;
  }



  traePaciente(rut) {
    this.getPacienteByRut(rut).subscribe((data: {}) =>{
      console.log(data);
      this.dataPaciente = data;
      
      setTimeout(() => {
        let fecha = this.dataPaciente.fechaNacimiento.replace("/","-").replace("/","-");
        console.log(fecha);
        let dato = new Date(fecha);
        this.date = new FormControl(new Date("03-26-1996"));
        console.log(this.date);
      }, 500);
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


}
