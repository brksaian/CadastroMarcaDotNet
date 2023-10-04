import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaAPI, ResultApi } from '../../common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = 'URL_DO_SEU_BACKEND/api/marcas'; // Substitua pela URL correta

  constructor(private http: HttpClient) {}

  listTesteResult: ResultApi = {
    totalItens: 10,
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
        nome: 'Teste 5',
        nacional: true,
        ativo: true,
      },
      {
        id: 2,
        nome: 'Teste 6',
        nacional: true,
        ativo: true,
      },
      {
        id: 3,
        nome: 'Teste 7',
        nacional: true,
        ativo: false,
      },
      {
        id: 4,
        nome: 'Teste 8',
        nacional: false,
        ativo: true,
      },
      {
        id: 5,
        nome: 'Teste 9',
        nacional: false,
        ativo: false,
      },
    ],
  };

  async consultar(
    name: string,
    ativo: boolean,
    nacional: boolean,
    atual: number,
    pageSize: number
  ): Promise<ResultApi> {
    const params = {
      name: name.toString(),
      ativo: ativo.toString(),
      nacional: nacional.toString(),
    };

    nacional = Boolean(nacional);
    ativo = Boolean(ativo);

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
      var arr: MarcaAPI[] = this.listTesteResult.dados.filter(
        (dado: MarcaAPI) => {
          return (
            dado.nome.toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
            dado.nacional == nacional &&
            dado.ativo == ativo
          );
        }
      );
      if (pageSize < arr.length) {
        let final: number =
          atual * pageSize + pageSize < arr.length
            ? atual + pageSize
            : arr.length;
        arr = arr.slice(atual, final);
      }
      const result: ResultApi = {
        dados: arr,
        totalItens: arr.length,
      };
      return result;
    }
  }

  async buscarDadosPaginados(
    atual: number,
    pageSize: number
  ): Promise<ResultApi> {
    const params = {
      page: atual.toString(),
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
        let final: number =
          atual * pageSize + pageSize < arr.length
            ? atual + pageSize
            : arr.length;
        arr = arr.slice(atual, final);
      }
      const result: ResultApi = {
        dados: arr,
        totalItens: this.listTesteResult.totalItens,
      };
      return result;
    }
  }

  async editar(marcaApi: MarcaAPI): Promise<boolean> {
    const params = {
      name: marcaApi.nome.toString(),
      ativo: marcaApi.ativo.toString(),
      nacional: marcaApi.nacional.toString(),
      id: marcaApi.id,
    };
    try {
      await this.http
        .post(`${this.apiUrl}/marca/editar`, { params })
        .subscribe((response: any) => {
          console.log(response);
        });
    } catch (e) {
      throw e;
    }

    return false;
  }

  async novo(
    name: string,
    ativo: boolean,
    nacional: boolean
  ): Promise<boolean> {
    const params = {
      name: name.toString(),
      ativo: ativo.toString(),
      nacional: nacional.toString(),
    };

    nacional = Boolean(nacional);
    ativo = Boolean(ativo);
    try {
      await this.http
        .post(`${this.apiUrl}/marca/novo`, { params })
        .subscribe((response: any) => {
          console.log(response);
        });
    } catch (e) {
      throw e;
    }

    return true;
  }
}
