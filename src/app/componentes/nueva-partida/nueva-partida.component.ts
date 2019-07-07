import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SesionStoreService } from '../../servicios/sesion-store.service';
import { SelectsService } from '../../servicios/selects.service';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nueva-partida',
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class NuevaPartidaComponent implements OnInit {

  articulos:any;
  hoy = this.cambioFecha(new Date());    
  partidas: any = [
    { cantidadLlegada: 0, 
      fechaPartida: this.hoy,
      articulo: 1
    }
  ];

  date = new FormControl(new Date('1995-12-17'));

  constructor(private sessionstore: SesionStoreService, 
    private httpClient: HttpClient, 
    private selects: SelectsService, 
    private apiService: ApiService,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.getArticulos();
  }

  getArticulos() {
    this.articulos = [];
    this.apiService.getArticulos().subscribe((data: [{}]) =>{
      console.log(data);
      this.articulos = data;
    });
  }

  addPartida(){
    this.partidas.push(
      { cantidadLlegada: 0, 
        fechaPartida: this.hoy,
        articulo: 1
      }
    );
    console.log(this.partidas);
  }

  deletePartida(item, index){
    //this.partidas.splice(index, 1);
    console.log(item);
    console.log(index);
  }

  changeCantidad(item, index){
    //console.log(item.srcElement.value);
    this.partidas[index].cantidadLlegada = item.srcElement.value;
    //console.log(this.partidas);
  }

  changeFecha(item, index){
    console.log(item.value);
    this.partidas[index].fechaPartida = this.cambioFecha(item.value);
  }

  changeArticulo(item, index){
    console.log(item.value);
    this.partidas[index].articulo = item.value;
  }

  cambioFecha(fecha: Date){
    let nuevaFecha =this.datepipe.transform(fecha, 'dd/MM/yyyy');
    return nuevaFecha;
  }




}
