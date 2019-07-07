import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { SelectsService } from '../../servicios/selects.service';

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
  datosPaciente:any = {
    nombre: "Ernesto",
    app: "Cabello",
    apm: "Venegas",
    rut: "123123141",
    telefono: 12345678,
    nombretutor: "Soy el tutor",
    rutTutor: "19284784",
    emailTutor: "asdasda@asda.com",
  }

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
    this.mostrarData = !this.mostrarData;
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
