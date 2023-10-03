export interface MarcaAPI {
  id: number;
  nome: string;
  nacional: string;
  ativo: string;
}

export interface ResultApi {
  dados: MarcaAPI[];
  totalItens: number;
}
