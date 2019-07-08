import { Component, OnInit } from '@angular/core';
import { SelectsService } from '../../servicios/selects.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { catchError,  } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-articulos',
  templateUrl: './insert-articulos.component.html',
  styleUrls: ['./insert-articulos.component.css']
})
export class InsertArticulosComponent implements OnInit {

  tipos: any;
  fabricantes: any;

  tipo:number;
  fabricante:number;
  descripcion: string;
  componentes: string;
  contenido: string;
  gramaje: number;

  constructor(private selects: SelectsService,
    private sessionstore: SesionStoreService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.traigoLosSelectsQLOS();
  }


  test(){

    
    let json = {
      descripcion: this.descripcion,
      componentes: this.componentes,
      contenido: this.contenido,
      gramaje: this.gramaje,
      tipo: {
          id: this.tipo
      },
      fabricante: {
          id: this.fabricante
      }
  }

    this.addArticulo(json).subscribe(data => {
      console.log(data);
      this.router.navigate(['home/articulos']);
      this.snackBar.open("Articulo agregado correctamente", "OK!", { duration: 3000});
    });
  
  }








  addArticulo(json: any):Observable<any>{
    const url: string = "http://localhost:8080/api/v1/articulos/";

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
          alert("Existe un problema con agregar un articulo");
        }
        
        return throwError(err.status);
      })
    );

  }

  traigoLosSelectsQLOS() {
    this.selects.articulos('tipos').toPromise().then(data =>{ 
      this.tipos = data;
    });
    this.selects.articulos('fabricantes').toPromise().then(data =>{ 
      this.fabricantes = data;
    });
  }

}
