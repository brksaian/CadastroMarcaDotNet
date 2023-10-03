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
      return result;
    }
  }
}
