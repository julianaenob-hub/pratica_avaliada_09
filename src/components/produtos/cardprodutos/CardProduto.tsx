import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import type Produto from '../../../models/Produto'
import { useCart } from '../../../contexts/CartContext'

interface CardProdutoProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutoProps) {
    const { adicionarAoCarrinho } = useCart()

    return (
        <div className="flex flex-col justify-between overflow-hidden bg-white rounded-lg">
            <div className="flex items-end justify-end pt-2 pr-2">
                <Link to={`/editarproduto/${produto.id}`}>
                    <PencilIcon
                        size={24}
                        className="mr-1 hover:fill-teal-800"
                    />
                </Link>

                <Link to={`/deletarproduto/${produto.id}`}>
                    <TrashIcon
                        size={24}
                        className="mr-1 hover:fill-red-700"
                    />
                </Link>
            </div>

            <div className="py-4">
                <img
                    src={produto.foto ?? ''}
                    className="mx-auto mt-1 h-44 max-w-75"
                    alt={produto.nome}
                />

                <div className="p-4">
                    <p className="text-sm text-center uppercase">
                        {produto.nome}
                    </p>
                    <h3 className="text-xl font-bold text-center uppercase">
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(produto.preco)}
                    </h3>
                </div>
            </div>
            <div className="flex flex-wrap">
                <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="flex items-center justify-center w-full py-2 text-white bg-teal-600 hover:bg-teal-900 transition-colors"
                >
                    Comprar
                </button>
            </div>
        </div>
    )
}

export default CardProduto