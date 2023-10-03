import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaAPI, ResultApi } from '../common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = 'URL_DO_SEU_BACKEND/api/marcas'; // Substitua pela URL correta

  constructor(private http: HttpClient) {}

  listTesteResult: ResultApi = {
    totalItens: 5,
    dados: [
      {
        id: 1,
        nome: 'Teste',
        nacional: true,
        ativo: true,
      },
      {
        id: 2,
        nome: 'Teste1',
        nacional: true,
        ativo: true,
      },
      {
        id: 3,
        nome: 'Teste 2',
        nacional: true,
        ativo: false,
      },
      {
        id: 4,
        nome: 'Teste 3',
        nacional: false,
        ativo: true,
      },
      {
        id: 5,
        nome: 'Teste 4',
        nacional: false,
        ativo: false,
      },
      {
        id: 1,
        nome: 'Teste',
        nacional: true,
        ativo: true,
      },
      {
        id: 2,
        nome: 'Teste1',
        nacional: true,
        ativo: true,
      },
      {
        id: 3,
        nome: 'Teste 2',
        nacional: true,
        ativo: false,
      },
      {
        id: 4,
        nome: 'Teste 3',
        nacional: false,
        ativo: true,
      },
      {
        id: 5,
        nome: 'Teste 4',
        nacional: false,
        ativo: false,
      },
    ],
  };

  async consultar(
    name: string,
    ativo: boolean,
    nacional: boolean
  ): Promise<boolean> {
    return true;
  }

  async buscarDadosPaginados(
    page: number,
    pageSize: number
  ): Promise<ResultApi> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString(),
    };

    const result: ResultApi = {
      dados: [],
      totalItens: 0,
    };

    try {
      await this.http
        .get(`${this.apiUrl}/paginacao`, { params })
        .subscribe((response: any) => {
          result.dados = response.items.map((item: any) => ({
            id: item.id,
            nome: item.nome,
            nacional: item.nacional,
            ativo: item.ativo,
          }));
          result.totalItens = result.dados.length;
        });
    } catch (e) {
      throw e;
    } finally {
      var arr: MarcaAPI[] = this.listTesteResult.dados;
      if (pageSize < arr.length) {
        arr = arr.slice(
          pageSize * (page + 1),
          (page + 1) * pageSize + pageSize < arr.length
            ? (page + 1) * pageSize + pageSize
            : arr.length
        );
      }
      this.listTesteResult.dados = arr;
      console.log(arr, pageSize, page);
      return this.listTesteResult;
    }
  }
}
