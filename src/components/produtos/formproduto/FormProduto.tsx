import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import type Produto from "../../../models/Produto"
import { buscar, atualizar, cadastrar } from "../../../service/Service"


function FormProduto() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, tipo: '' })
    const [produto, setProduto] = useState<Produto>({} as Produto)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (usuario.token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [usuario.token])

    async function buscarProdutoPorId(id: string) {
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

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
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

    useEffect(() => {
        buscarCategorias()
        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    // Em modo edição: quando o produto for carregado e tiver categoria, sincroniza o estado
    useEffect(() => {
        if (produto.categoria) {
            setCategoria(produto.categoria)
        }
    }, [produto.id])

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria
        })
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
        })
    }

    function retornar() {
        navigate('/produtos')
    }

    async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: usuario.token
                    }
                })
                alert('Produto atualizado com sucesso')
                retornar()
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()
                } else {
                    alert('Erro ao atualizar o Produto')
                }
            }
        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: usuario.token
                    }
                })
                alert('Produto cadastrado com sucesso')
                retornar()
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()
                } else {
                    alert('Erro ao cadastrar o Produto')
                }
            }
        }

        setIsLoading(false)
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto my-4 md:h-[81vh] px-4 py-12">
            <h1 className="text-3xl md:text-4xl text-center mb-6">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="w-full max-w-lg flex flex-col gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="font-medium">
                        Nome do Produto
                    </label>
                    <input
                        type="text"
                        placeholder="Insira aqui o nome do Produto"
                        name="nome"
                        id="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
                        value={produto.nome || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="preco" className="font-medium">
                        Preço (R$)
                    </label>
                    <NumericFormat
                        id="preco"
                        name="preco"
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        prefix="R$ "
                        className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="R$ 0,00"
                        value={produto.preco || ''}
                        onValueChange={(values) => {
                            setProduto({
                                ...produto,
                                preco: values.floatValue || 0,
                                categoria: categoria
                            })
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="foto" className="font-medium">
                        Foto do Produto
                    </label>
                    <input
                        type="text"
                        placeholder="Adicione aqui a URL da foto do Produto"
                        name="foto"
                        id="foto"
                        required
                        className="border-2 border-slate-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
                        value={produto.foto || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="categoria" className="font-medium">
                        Categoria do Produto
                    </label>
                    <select
                        name="categoria"
                        id="categoria"
                        className="p-2 bg-white border-2 rounded border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        onChange={(e) => buscar(`/categorias/${e.target.value}`, setCategoria, {
                            headers: {
                                Authorization: usuario.token
                            }
                        })}
                        value={produto.categoria?.id || ""}
                        required
                    >
                        <option value="" disabled>
                            Selecione uma Categoria
                        </option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.tipo}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="rounded text-slate-100 bg-slate-400 hover:bg-slate-800 w-full py-2 mt-2 flex justify-center items-center text-base transition-colors disabled:bg-slate-300"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <span>Carregando...</span> : id !== undefined ? <span>Atualizar</span> : <span>Cadastrar</span>}
                </button>
            </form>
        </div>
    )
}

export default FormProduto