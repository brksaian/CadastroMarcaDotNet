import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MarcaAPI } from 'src/app/common';
import { MarcaService, NotificationService } from 'src/app/services';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  loginForm: FormGroup;
  ativoEditar!: boolean;
  @Input() marca: MarcaAPI = {} as MarcaAPI;
  @Output() cancelar = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.marca = this.data.marca;
    this.loginForm = this.formBuilder.group({
      nameEditar: [this.marca.nome, Validators.required],
      nacionalEditar: [this.marca.nacional],
      ativoEditar: [this.marca.ativo],
    });
    this.ativoEditar = this.marca.ativo;
  }

  ngOnInit(): void {}

  async editar() {
    if (this.loginForm.valid) {
      const name = this.loginForm.value.nameEditar;
      const nacional = this.loginForm.value.nacionalEditar;
      const ativo = this.loginForm.value.ativoEditar;
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '400px',
        data: {
          marca: name,
          titulo: 'edição',
          descricao: 'editar',
        },
      });

      dialogRef.afterClosed().subscribe(async (resultado) => {
        if (resultado) {
          try{
            this.marca.nome = name;
          this.marca.nacional = nacional;
          this.marca.ativo = ativo;
          const res = await this.marcaService.editar(this.marca);
          if (res) {
            this.dialogRef.close(true);
          } else {
            this.notificationService.mostrarNotificacao(
              'Marca já existe no Cadastro!”'
            );
          }
          }catch(e){
            this.notificationService.mostrarNotificacao(
              'Marca já existe no Cadastro!”'
            );
          }
          
        }
      });
    }
  }
}
