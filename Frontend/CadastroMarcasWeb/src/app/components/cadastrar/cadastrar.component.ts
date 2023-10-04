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
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  loginForm: FormGroup;
  ativoNovo!: boolean;
  @Input() marca: MarcaAPI = {} as MarcaAPI;
  @Output() cancelar = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<CadastrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.marca = this.data.marca;
    this.loginForm = this.formBuilder.group({
      nameNovo: [this.marca.nome, Validators.required],
      nacionalNovo: [this.marca.nacional],
      ativoNovo: [this.marca.ativo],
    });
    this.ativoNovo = this.marca.ativo;
  }

  ngOnInit(): void {}

  async novo() {
    if (this.loginForm.valid) {
      const name = this.loginForm.value.nameNovo;
      const nacional = this.loginForm.value.nacionalNovo;
      const ativo = this.loginForm.value.ativoNovo;
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '400px',
        data: {
          marca: name,
          titulo: 'adição',
          descricao: 'adicionar',
        },
      });

      dialogRef.afterClosed().subscribe(async (resultado) => {
        if (resultado) {
          const res = await this.marcaService.novo(name, nacional, ativo);
          if (res) {
            this.dialogRef.close(true);
          } else {
            this.notificationService.mostrarNotificacao(
              'Marca já existe no Cadastro!”'
            );
          }
        }
      });
    }
  }
}
