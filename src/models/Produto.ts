import type Categoria from './Categoria';
 
export default interface Produto {
  id: number;
  nome: string;
  preco: number;
  foto?: string | null;
  categoria?: Categoria | null;
}