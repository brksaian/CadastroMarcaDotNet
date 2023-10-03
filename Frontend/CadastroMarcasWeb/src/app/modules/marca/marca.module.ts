import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarComponent } from 'src/app/components/cadastrar';
import { ConsultarComponent } from 'src/app/components/consultar';
import { MarcaService } from 'src/app/services';
import { EditarComponent } from 'src/app/components/editar';
import { TelaInicialComponent } from 'src/app/components/tela-inicial';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CadastrarComponent,
    ConsultarComponent,
    EditarComponent,
    TelaInicialComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CadastrarComponent,
    ConsultarComponent,
    EditarComponent,
    TelaInicialComponent,
  ],
  providers: [MarcaService],
})
export class MarcaModule {}
