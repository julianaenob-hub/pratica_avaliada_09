import type Categoria from "./Categoria";


export default interface Usuario{
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    dataNascimento: string;
    categoria?: Categoria[] | null;
}