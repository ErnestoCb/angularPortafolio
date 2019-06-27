import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-medico',
  templateUrl: './usuarios-medico.component.html',
  styleUrls: ['./usuarios-medico.component.css']
})
export class UsuariosMedicoComponent implements OnInit {
  medicosActuales: String[] = ['nombre', 'rut', 'email', 'sexo', 'nacimiento', 'editar', 'eliminar'];
  medicoSource: any = [
    { nombre: 'Ernesto Cabello', 
      rut: '19.235.415-3', 
      email: 'miCorreo@gmail.com', 
      sexo: 'Masculino', 
      nacimiento: '26/03/1996'}
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
