import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../service/Service";


function FormCategoria() {
   
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Captura o ID caso seja edição
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('O token expirou, favor logar novamente!');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: token }
                });
                alert('Categoria atualizada com sucesso!');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    alert('O token expirou, favor logar novamente!');
                    handleLogout();
                } else {
                    alert('Erro ao atualizar a Categoria!');
                }
            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: token }
                });
                alert('Categoria cadastrada com sucesso!');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    alert('O token expirou, favor logar novamente!');
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar a Categoria!');
                }
            }
        }
        
        setIsLoading(false);
        navigate('/categorias'); 
    }

    return (
        <div className="container flex flex-col items-center justify-center px-2 pt-4 mx-auto">
            {/* O título muda dinamicamente dependendo de ser Cadastro ou Edição */}
            <h1 className="my-8 text-3xl text-center md:text-4xl">
                {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
            </h1>

            <form 
                className="flex flex-col w-full max-w-md gap-4 px-2 md:max-w-1/2"
                onSubmit={gerarNovaCategoria}
            >
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="tipo">Categoria</label>
                    <input
                        type="text"
                        placeholder="Categoria"
                        id='tipo'
                        name='tipo'
                        className="p-2 text-base bg-white border-2 rounded border-slate-700 md:text-lg"
                        required
                        value={categoria.tipo || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="flex justify-center w-full py-2 mx-auto text-base rounded text-slate-100 bg-slate-400 hover:bg-slate-800 md:w-1/2 md:text-lg"
                    type="submit"
                >
                    {/* O botão também exibe o loader e muda o texto dinamicamente */}
                    {isLoading ? (
                        <span>Carregando...</span>
                    ) : (
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;