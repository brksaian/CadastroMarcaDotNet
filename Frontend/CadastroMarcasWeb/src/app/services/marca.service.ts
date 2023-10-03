import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaAPI } from '../common';
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

  buscarDadosPaginados(page: number, pageSize: number): Observable<MarcaAPI[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString(),
    };

    return this.http.get(`${this.apiUrl}/paginacao`, { params }).pipe(
      map((response: any) => {
        // Mapeie os dados da resposta da API para a interface MarcaAPI
        // Certifique-se de ajustar os nomes das propriedades conforme necessário
        return response.items.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          nacional: item.nacional,
          ativo: item.ativo,
        }));
      })
    );
  }
}
