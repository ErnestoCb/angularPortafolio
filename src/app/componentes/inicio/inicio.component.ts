import { Component, OnInit } from '@angular/core';
import { SesionStoreService } from '../../servicios/sesion-store.service'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  constructor(private sessionstore: SesionStoreService) { }

  ngOnInit() {
    console.log(this.sessionstore.token);
    console.log(this.sessionstore.user);
  }
  
}
