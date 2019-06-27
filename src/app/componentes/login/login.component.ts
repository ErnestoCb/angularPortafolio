import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  constructor(private loginService : LoginService) { }

  ngOnInit() {
    this.logear();
  }

  logear(){
    this.loginService.getLogin().subscribe((data:any[]) =>{
      console.log(data);
    })
  }



}
