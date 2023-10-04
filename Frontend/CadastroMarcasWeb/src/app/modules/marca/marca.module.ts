import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarComponent } from 'src/app/components/cadastrar';
import {
  MarcaService,
  NotificationService,
  NotificationSuccessService,
} from 'src/app/services';
import { EditarComponent } from 'src/app/components/editar';
import { TelaInicialComponent } from 'src/app/components/tela-inicial';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/components/header';
import { NotificationErrorComponent } from 'src/app/components/notification_error';
import { NotificationSuccessComponent } from 'src/app/components/notification-success';

@NgModule({
  declarations: [
    CadastrarComponent,
    EditarComponent,
    TelaInicialComponent,
    NotificationErrorComponent,
    NotificationSuccessComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [CadastrarComponent, EditarComponent, TelaInicialComponent],
  providers: [MarcaService, NotificationService, NotificationSuccessService],
})
export class MarcaModule {}
