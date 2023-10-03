export interface MarcaAPI {
  id: number;
  nome: string;
  nacional: boolean;
  ativo: boolean;
}

export interface ResultApi {
  dados: MarcaAPI[];
  totalItens: number;
}
