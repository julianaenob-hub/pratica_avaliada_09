import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import type { ItemCarrinho } from "../../../contexts/CartContext"
import { useCart } from "../../../contexts/CartContext"

interface CardCartProps {
    item: ItemCarrinho
}

function CardCart({ item }: CardCartProps) {
    const { produto, quantidade } = item
    const { removerDoCarrinho, aumentarQuantidade, diminuirQuantidade } = useCart()

    const subtotal = produto.preco * quantidade

    return (
        <div className='flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
          
            <div className='w-32 h-32 shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center'>
                <img
                    src={produto.foto ?? 'https://ik.imagekit.io/vzr6ryejm/games/produto.png'}
                    className='max-h-full max-w-full object-contain'
                    alt={produto.nome}
                />
            </div>

           
            <div className='grow flex flex-col justify-between'>
                <div>
                    <h3 className='font-semibold text-gray-800 mb-1'>
                        {produto.nome}
                    </h3>
                    {produto.categoria && (
                        <p className='text-sm text-gray-500 mb-2'>
                            Categoria: {produto.categoria.tipo}
                        </p>
                    )}
                    <p className='text-xl font-bold text-blue-600'>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(produto.preco)}
                    </p>
                </div>

               
                <div className='flex items-center gap-4 mt-3'>
                    <div className='flex items-center gap-2 border border-gray-300 rounded-lg'>
                        <button
                            onClick={() => diminuirQuantidade(produto.id)}
                            className='p-2 hover:bg-gray-100 rounded-l-lg transition-colors'
                            title="Diminuir quantidade"
                        >
                            <MinusIcon size={20} className="text-gray-600" />
                        </button>

                        <span className='px-4 font-semibold text-gray-800 min-w-10 text-center'>
                            {quantidade}
                        </span>

                        <button
                            onClick={() => aumentarQuantidade(produto.id)}
                            className='p-2 hover:bg-gray-100 rounded-r-lg transition-colors'
                            title="Aumentar quantidade"
                        >
                            <PlusIcon size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <button
                        onClick={() => removerDoCarrinho(produto.id)}
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                        title="Remover produto"
                    >
                        <TrashIcon size={20} />
                    </button>
                </div>
            </div>

       
            <div className='flex flex-col items-end justify-between'>
                <p className='text-lg font-bold text-gray-800'>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(subtotal)}
                </p>
            </div>
        </div>
    )
}

export default CardCart
