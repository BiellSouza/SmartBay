export interface Product {
  id: number;
  imagem?: string;
  nome: string;
  preco: number;
  quantidade: number;
  unidade: string;
  dataCompra?: string;
}
