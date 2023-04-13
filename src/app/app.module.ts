import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TabelaClientesComponent } from './components/tabela-clientes/tabela-clientes.component';
import { CadastrarClienteComponent } from './pages/cadastrar-cliente/cadastrar-cliente.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { FormCadastrarClienteComponent } from './components/form-cadastrar-cliente/form-cadastrar-cliente.component';
import { FormEditarClienteComponent } from './components/form-editar-cliente/form-editar-cliente.component'

// modulo de chamadas http
import { HttpClientModule } from '@angular/common/http';
// modulo para forms
import { ReactiveFormsModule } from '@angular/forms';
// Modulo para mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ClientesComponent,
    TabelaClientesComponent,
    CadastrarClienteComponent,
    EditarClienteComponent,
    FormCadastrarClienteComponent,
    FormEditarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
