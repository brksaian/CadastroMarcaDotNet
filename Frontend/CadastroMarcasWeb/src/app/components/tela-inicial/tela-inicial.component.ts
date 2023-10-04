import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MarcaAPI } from 'src/app/common';
import {
  MarcaService,
  NotificationService,
  NotificationSuccessService,
} from 'src/app/services';
import { EditarComponent } from '../editar';
import { CadastrarComponent } from '../cadastrar';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css'],
})
export class TelaInicialComponent implements OnInit {
  marcasForm: FormGroup;
  loginFailed = false;
  titulo: string = '';
  marcas: any[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 10;
  totalPaginas: number = 1;
  totalItens: number = 0;

  ngOnInit(): void {
    this.carregarDados();
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private marcaService: MarcaService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private notificationSuccessService: NotificationSuccessService
  ) {
    this.marcasForm = this.formBuilder.group({
      name: ['', Validators.required],
      nacional: ['true'],
      ativo: ['true'],
    });
  }

  async consultar() {
    this.titulo = 'Consulta';
    if (this.marcasForm.valid) {
      const name = this.marcasForm.value.name;
      const nacional = this.marcasForm.value.nacional;

      try {
        const result = await this.marcaService.consultar(
          name,
          nacional,
          this.marcasForm.value.ativo,
          0,
          this.itensPorPagina
        );

        console.log(result);
        if (result.dados.length > 0) {
          this.carregarDadosConsulta(result.dados);
        } else {
          this.notificationService.mostrarNotificacao(
            'Não foi possível localizar a marca.'
          );
          this.titulo = '';
        }
      } catch (error) {
        console.error('Erro na requisição HTTP:', error);
        this.loginFailed = true;
      }
    }
  }

  async carregarDados() {
    this.titulo = '';
    this.marcasForm.reset();
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;

    try {
      const resultado = await this.marcaService.buscarDadosPaginados(
        indiceInicial,
        this.itensPorPagina
      );

      console.log(resultado);

      this.marcas = resultado.dados;
      this.totalPaginas = Math.ceil(resultado.totalItens / this.itensPorPagina);

      this.totalItens = resultado.totalItens;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  async carregarDadosConsulta(marcaApis: MarcaAPI[]) {
    try {
      this.marcas = marcaApis;
      this.totalPaginas = Math.ceil(marcaApis.length / this.itensPorPagina);

      this.totalItens = marcaApis.length;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  anteriorPagina() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarDados();
    }
  }

  proximoPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarDados();
    }
  }

  async atualizarItensPorPagina(event: any) {
    this.itensPorPagina = parseInt(event.target.value);
    await this.carregarDados();
  }

  editar(marca: MarcaAPI): void {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '600px',
      height: '400px',
      data: { marca },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notificationSuccessService.mostrarNotificacao(
          'Registro editado com sucesso!'
        );
        this.carregarDados();
      }
    });
  }

  novo(): void {
    const marca: MarcaAPI = {
      nome: this.marcasForm.value.name,
      nacional: this.marcasForm.value.nacional,
      ativo: this.marcasForm.value.ativo,
      id: 0,
    };
    const dialogRef = this.dialog.open(CadastrarComponent, {
      width: '600px',
      height: '400px',
      data: { marca },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notificationSuccessService.mostrarNotificacao(
          'Registro adicionado com sucesso!'
        );
        this.carregarDados();
      }
    });
  }

  async reload() {
    await this.carregarDados();
  }
}
