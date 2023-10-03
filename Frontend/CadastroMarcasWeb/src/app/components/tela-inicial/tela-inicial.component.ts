import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarcaService } from 'src/app/services';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css'],
})
export class TelaInicialComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed = false;
  ativo: boolean = false;
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
    private marcaService: MarcaService
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      nacional: ['true'],
      cep: [''],
    });
  }

  async consultar() {
    if (this.loginForm.valid) {
      const name = this.loginForm.value.name;
      const nacional = this.loginForm.value.nacional;

      alert(this.itensPorPagina);

      try {
        const loggedIn = await this.marcaService.consultar(
          name,
          nacional,
          this.ativo // Use 'this.ativo' como valor do checkbox
        );
        if (loggedIn) {
          console.log('Login bem-sucedido');
          this.router.navigate(['login']);
        } else {
          this.loginFailed = true;
        }
      } catch (error) {
        console.error('Erro na requisição HTTP:', error);
        this.loginFailed = true;
      }
    }
  }

  async carregarDados() {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;

    try {
      const resultado = await this.marcaService.buscarDadosPaginados(
        indiceInicial,
        this.itensPorPagina
      );

      this.marcas = resultado.dados;
      this.totalPaginas = Math.ceil(resultado.totalItens / this.itensPorPagina);
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
    this.itensPorPagina = event.target.value;
    await this.carregarDados();
  }

  editar() {
    //
  }
}
