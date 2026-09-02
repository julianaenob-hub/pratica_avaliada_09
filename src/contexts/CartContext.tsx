import { createContext, type ReactNode, useContext, useState } from 'react'
import type Produto from '../models/Produto'



export interface ItemCarrinho {
    produto: Produto
    quantidade: number
}

interface CartContextProps {
    itens: ItemCarrinho[]
    adicionarAoCarrinho: (produto: Produto) => void
    removerDoCarrinho: (produtoId: number) => void
    aumentarQuantidade: (produtoId: number) => void
    diminuirQuantidade: (produtoId: number) => void
    limparCarrinho: () => void
    totalItens: number
    totalPreco: number
}

interface CartProviderProps {
    children: ReactNode
}



export const CartContext = createContext({} as CartContextProps)



export function CartProvider({ children }: CartProviderProps) {
    const [itens, setItens] = useState<ItemCarrinho[]>([])

    /** Adiciona o produto ao carrinho ou incrementa a quantidade se já existir */
    function adicionarAoCarrinho(produto: Produto) {
        setItens((prev) => {
            const itemExistente = prev.find((i) => i.produto.id === produto.id)
            if (itemExistente) {
                return prev.map((i) =>
                    i.produto.id === produto.id
                        ? { ...i, quantidade: i.quantidade + 1 }
                        : i
                )
            }
            return [...prev, { produto, quantidade: 1 }]
        })
    }


    function removerDoCarrinho(produtoId: number) {
        setItens((prev) => prev.filter((i) => i.produto.id !== produtoId))
    }

  
    function aumentarQuantidade(produtoId: number) {
        setItens((prev) =>
            prev.map((i) =>
                i.produto.id === produtoId
                    ? { ...i, quantidade: i.quantidade + 1 }
                    : i
            )
        )
    }


    function diminuirQuantidade(produtoId: number) {
        setItens((prev) =>
            prev
                .map((i) =>
                    i.produto.id === produtoId
                        ? { ...i, quantidade: i.quantidade - 1 }
                        : i
                )
                .filter((i) => i.quantidade > 0)
        )
    }


    function limparCarrinho() {
        setItens([])
    }


    const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)


    const totalPreco = itens.reduce(
        (acc, i) => acc + i.produto.preco * i.quantidade,
        0
    )

    return (
        <CartContext.Provider
            value={{
                itens,
                adicionarAoCarrinho,
                removerDoCarrinho,
                aumentarQuantidade,
                diminuirQuantidade,
                limparCarrinho,
                totalItens,
                totalPreco,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}



export function useCart() {
    return useContext(CartContext)
}
