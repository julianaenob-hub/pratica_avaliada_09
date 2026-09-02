import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CardProduto from '../cardprodutos/CardProduto'
import { AuthContext } from '../../../contexts/AuthContext'
import type Produto from '../../../models/Produto'
import { buscar } from '../../../service/Service'

function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [usuario.token])

    async function buscarProdutos() {
        setIsLoading(true)
        try {
            await buscar('/produtos', setProdutos, {
                headers: {
                    Authorization: usuario.token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            } else {
                alert('Erro ao buscar os produtos. Verifique a conexão com a API.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        buscarProdutos()
    }, [])

    return (
        <>
            {isLoading && (
                <div className="flex justify-center mt-6 md:mt-8">
                    <span className="text-xl md:text-2xl font-bold">Carregando...</span>
                </div>
            )}

            {!isLoading && produtos.length === 0 && (
                <div className="flex justify-center mt-6 md:mt-8">
                    <span className="text-xl md:text-2xl font-bold text-slate-600">
                        Nenhum produto encontrado.
                    </span>
                </div>
            )}

            {!isLoading && produtos.length > 0 && (
                <div className="flex justify-center mt-6 md:mt-8">
                    <div className="container flex flex-col m-2 md:my-0">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 mb-4 md:mb-0 p-2 md:p-4">
                            {produtos.map((produto) => (
                                <CardProduto key={produto.id} produto={produto} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ListaProdutos