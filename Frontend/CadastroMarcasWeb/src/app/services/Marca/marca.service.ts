import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcaAPI, ResultApi } from '../../common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = 'https://localhost:7288/api';

  constructor(private http: HttpClient) {}

  async consultar(
    name: string,
    ativo: boolean,
    nacional: boolean,
    atual: number,
    pageSize: number
  ): Promise<ResultApi> {
    const params = {
      name: name,
      ativo: ativo.toString(),
      nacional: nacional.toString(),
      atual: atual.toString(),
      pageSize: pageSize.toString(),
    };
  
    const result: ResultApi = {
      dados: [],
      totalItens: 0,
    };
  
    try {
      const response = await this.http.get<ResultApi>(`${this.apiUrl}/consultar`, {
        params: params,
      }).toPromise();
  
      result.dados = response?.dados || [];
      result.totalItens = response?.totalItens || 0;
    } catch (e) {
      throw e;
    }
  
    return result;
  }

  converterParaMarcaAPI(obj: any): MarcaAPI | null {
    if (obj && typeof obj === 'object') {
        const marcaAPI: MarcaAPI = {
            id: obj.id !== undefined ? Number(obj.id) : 0,
            nome: obj.nome || '', 
            nacional: obj.nacional !== undefined ? Boolean(obj.nacional) : false,
            ativo: obj.ativo !== undefined ? Boolean(obj.ativo) : false,
        };

        return marcaAPI;
    }

    return null; // Retorna null se o objeto de entrada não for válido
}

  async buscarDadosPaginados(atual: number, pageSize: number): Promise<ResultApi> {
    const params = {
        page: (atual + 1).toString(),
        pageSize: pageSize.toString(),
    };

    try {
        const response = await this.http.get<Array<Object>>(`${this.apiUrl}/Marcas`, { params }).toPromise();
        const result: ResultApi = {
          dados: [],
          totalItens: 0,
        };
        if (response) {
          response.forEach(resp => {
            const mapi = this.converterParaMarcaAPI(resp);
            if (mapi) {
                result.dados.push(mapi);
            }
        });
            // const arr: MarcaAPI[] = response.dados;

            // if (pageSize < arr.length) {
            //     const inicio = atual * pageSize;
            //     const final = Math.min(inicio + pageSize, arr.length);
            //     response.dados = arr.slice(inicio, final);
            // }
          return result;
            // return response;
        }

        return {
            dados: [],
            totalItens: 0,
        };
    } catch (e) {
        console.error(e);
        throw e;
    }
}


  async editar(marcaApi: MarcaAPI): Promise<boolean> {
    const params = {
        nome: marcaApi.nome.toString(),
        ativo: marcaApi.ativo.toString(),
        nacional: marcaApi.nacional.toString(),
        id: marcaApi.id,
    };
    try {
      console.log(params);
        const response = await this.http
            .put(`${this.apiUrl}/Marcas/${marcaApi.id}`, params)
            .toPromise();
            console.log(response);
        return response ? true : false;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


  async novo(name: string, ativo: boolean, nacional: boolean): Promise<boolean> {
    const params = {
        nome: name.toString(),
        ativo: ativo.toString(),
        nacional: nacional.toString(),
    };

    try {
        const response = await this.http.post(`${this.apiUrl}/Marcas`, params).toPromise();
        console.log(response);
        return true;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async deletar(id: number): Promise<boolean> {
  try {
      await this.http.delete(`${this.apiUrl}/marca/${id}`).toPromise();
      return true;
  } catch (e) {
      console.error(e);
      throw e;
  }
}


}
