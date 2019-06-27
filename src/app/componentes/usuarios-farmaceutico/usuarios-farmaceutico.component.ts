import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-farmaceutico',
  templateUrl: './usuarios-farmaceutico.component.html',
  styleUrls: ['./usuarios-farmaceutico.component.css']
})
export class UsuariosFarmaceuticoComponent implements OnInit {
  medicosActuales: String[] = ['nombre', 'rut', 'sexo', 'nacimiento', 'cargo', 'farmacia', 'editar', 'eliminar'];
  medicoSource: any = [
    { nombre: 'Ernesto Cabello', 
      rut: '19.235.415-3', 
      sexo: 'Masculino', 
      nacimiento: '26/03/1996',
      cargo: 'Quimico Farmaceutico',
      farmacia: 'Farmacia Norte sector 2'}
  ];
  
  sexos: any = [
    {value: 1, sexo: "Masculino"},
    {value: 2, sexo: "Femenino"},
    {value: 3, sexo: "Otro"}
  ];
  
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Debes ingresar un valor' :
        this.email.hasError('email') ? 'Correo invalido' :
            '';
  }
  constructor() { }

  ngOnInit() {
  }

}
