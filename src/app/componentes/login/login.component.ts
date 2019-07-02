import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = "suicideboy";
  pass: string = "12345";


  urlProvisiones: string = 'localhost:8080/api/v1/pacientes/previsiones';

  
  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGVsbGlkb3MiOiJib3lzIiwiaW5mbyBhZGljaW9uYWwiOiJIb2xhIHF1ZSB0YWwhc3VpY2lkZWJveSIsInVzZXJfbmFtZSI6InN1aWNpZGVib3kiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTYxOTQ2ODU4LCJub21icmUiOiJzdWljaWRlIiwianRpIjoiNWIwNTE1MTAtMzM4YS00MjlkLWExYzYtZWU5OTA3ODM4OTBiIiwiZW1haWwiOiJzLmJveXM2NjZAZ21haWwuY29tIiwiY2xpZW50X2lkIjoiYW5ndWxhckFwcCJ9.M9Fwej9xThQN8---ANzxfFS9QJvBi4QEJxhYaYo92hRLe6S8rc8evuET4MGo0ENZqX0qTXJZji8uwPG0igthX3vnnZcHqIuvdLW7hwmkbpA8uo6zHWrtu-5TpsfbbdS4AV8EuARvLh2Ww2t3rHVW6xRukMmRw4H_FyZu_AqHqY_zns6MXIb1CxU3gupaubFtF02Htm8cA2NkaI7k814Perg2O_qT1WWRNW72LfCQUzPRY7mc4z5UjihSnTuUMVLcufgay8dYja524qcI1yJTtc8Zjo3RMVa96H_6NIIde9mso_CXrFLcXQQEbi7Elz9YwzUNndOUT6aXlXVIANOavw'
    })
  };

  constructor(private httpClient: HttpClient, public router: Router) { }

  ngOnInit() {
    //this.login();
    //this.previsiones();
  }

  logear(usuario: string, pass: string):Observable<any>{
    const url: string = 'http://localhost:8080/oauth/token';

    interface UserPostResponse {
      success: boolean
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'basic ' + btoa('angularApp' + ':' + '12345')
      })
    };

    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario);
    params.set('password', pass)

    console.log(params.toString());
    

    return this.httpClient.post<any>(url, params.toString(), httpOptions ).pipe(
      catchError((err: HttpErrorResponse)=>{
        console.log(err);

        
        if (err.status == 401) {
          alert("El usuario o contraseña ingresados son incorrectos");
          this.clean();
        } else {
          alert("Existe un problema con la autenticacion de usuario");
        }
        
        return throwError(err.status);
      })
    );
  }

  login(usuario: string, pass: string): void{
    
    this.logear(usuario, pass).subscribe(data => {
      console.log(data);
      let datosUsuario = JSON.parse(atob(data.access_token.split(".")[1]));
      console.log(datosUsuario);
      this.router.navigate(['home/inicio']);
    });

  }

  previsiones(){
    this.httpClient.get(this.urlProvisiones,this.httpOptions2).subscribe((data)=>{
      console.log(data);
    })
  }

  clean(){
    this.usuario = "";
    this.pass = "";
  }


  
/*
  this.httpClient.get(this.url + 'regiones').subscribe((data) => {
    console.log(data);
    this.regiones = data;
  })
*/


}
