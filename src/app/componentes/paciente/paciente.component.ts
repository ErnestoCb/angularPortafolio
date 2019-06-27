import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

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
