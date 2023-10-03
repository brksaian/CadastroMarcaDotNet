import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './components/tela-inicial';
import { CadastrarComponent } from './components/cadastrar';
import { EditarComponent } from './components/editar';
import { ConsultarComponent } from './components/consultar';

const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'editar', component: EditarComponent },
  { path: 'consultar', component: ConsultarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
