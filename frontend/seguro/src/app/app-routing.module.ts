import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { FormclienteComponent } from './cliente/formcliente/formcliente.component';
import { ApoliceComponent } from './apolice/apolice/apolice.component';
import { FormapoliceComponent } from './apolice/formapolice/formapolice.component';


const routes: Routes = [
    { path: '',  component: ClienteComponent },
  { path: 'cliente',  component: ClienteComponent },
  { path: 'cadastro-cliente', component: FormclienteComponent},
  { path: 'cadastro-cliente/:id' , component: FormclienteComponent},
  { path: 'apolice', component: ApoliceComponent},
  { path: 'cadastro-apolice', component : FormapoliceComponent},
  { path: 'cadastro-apolice/:id', component : FormapoliceComponent},
  { path: '**', redirectTo: '/cliente' ,pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
