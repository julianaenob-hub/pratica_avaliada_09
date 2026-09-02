import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Produto from '../../../models/Produto'
import { buscar, deletar } from '../../../service/Service'


function DeletarProduto() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const [produto, setProduto] = useState<Produto>({} as Produto)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (usuario.token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [usuario.token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {
                    Authorization: usuario.token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }

    async function deletarProduto() {
        setIsLoading(true)
        try {
            await deletar(`/produtos/${id}`, {
                headers: {
                    Authorization: usuario.token
                }
            })
            alert('Produto apagado com sucesso')
        } catch (error) {
            alert('Erro ao apagar o Produto')
        }
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate('/produtos')
    }

    return (
        <div className='container w-full max-w-md mx-auto px-4 pt-20 md:pt-6'>
            <h1 className='text-3xl md:text-4xl text-center py-4'>Deletar Produto</h1>
            <p className='text-center font-semibold mb-4 text-base md:text-lg'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-4 md:px-6 bg-slate-600 text-white font-bold text-lg md:text-2xl'>
                    Produto
                </header>
                <p className='p-4 md:p-8 text-xl md:text-3xl bg-white h-full'>
                    {produto.nome}
                </p>
                <div className="flex flex-row">
                    <button
                        onClick={retornar}
                        className='text-slate-100 bg-red-500 hover:bg-red-700 w-full py-2 text-base md:text-lg'
                    >
                        Não
                    </button>
                    <button
                        onClick={deletarProduto}
                        className='w-full text-slate-100 bg-teal-600 hover:bg-teal-800 flex items-center justify-center text-base md:text-lg'
                    >
                        {isLoading ? <span>Apagando...</span> : <span>Sim</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto