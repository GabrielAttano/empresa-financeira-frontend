import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { CadastrarClienteComponent } from './pages/cadastrar-cliente/cadastrar-cliente.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent},
  { path: 'clientes/editar/:cpf', component: EditarClienteComponent},
  { path: 'clientes/cadastrar', component: CadastrarClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
