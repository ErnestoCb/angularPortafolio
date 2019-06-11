import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { LoginLayoutComponent } from './componentes/login-layout/login-layout.component';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './componentes/main-page/main-page.component';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InsertArticulosComponent } from './componentes/insert-articulos/insert-articulos.component';
import { CaducarArticuloComponent } from './componentes/caducar-articulo/caducar-articulo.component';
import { PrescripcionComponent } from './componentes/prescripcion/prescripcion.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginLayoutComponent,
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  { path: 'home', component: MainPageComponent,
    children: [
      { path: 'articulos', component: ArticulosComponent},
      { path: 'pacientes', component: PacienteComponent},
      { path: 'inicio', component: InicioComponent},
      { path: 'nuevoArt', component: InsertArticulosComponent },
      { path: 'caducar', component: CaducarArticuloComponent },
      { path: 'prescripcion', component: PrescripcionComponent },
    ]

  },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
