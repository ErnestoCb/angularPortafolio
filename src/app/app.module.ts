import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './componentes/main-page/main-page.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatCardModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

//angular material y las opciones de form para los mismo
import { ReactiveFormsModule } from '@angular/forms';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { LoginLayoutComponent } from './componentes/login-layout/login-layout.component';
import { InsertArticulosComponent } from './componentes/insert-articulos/insert-articulos.component';

//consumir servicios
import { HttpClientModule } from '@angular/common/http';
import { CaducarArticuloComponent } from './componentes/caducar-articulo/caducar-articulo.component';
import { PrescripcionComponent } from './componentes/prescripcion/prescripcion.component';
import { UsuariosMedicoComponent } from './componentes/usuarios-medico/usuarios-medico.component';
import { UsuariosFarmaceuticoComponent } from './componentes/usuarios-farmaceutico/usuarios-farmaceutico.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MenuComponent,
    LoginComponent,
    InicioComponent,
    PacienteComponent,
    PerfilComponent,
    ArticulosComponent,
    LoginLayoutComponent,
    InsertArticulosComponent,
    CaducarArticuloComponent,
    PrescripcionComponent,
    UsuariosMedicoComponent,
    UsuariosFarmaceuticoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
