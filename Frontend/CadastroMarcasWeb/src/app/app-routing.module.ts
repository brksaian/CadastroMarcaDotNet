import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './components/tela-inicial';
import { CadastrarComponent } from './components/cadastrar';
import { EditarComponent } from './components/editar';
import { MatDialog } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'editar', component: EditarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
