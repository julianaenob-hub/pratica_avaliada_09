import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardCategorias from "../cardcategorias/CardCategorias";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../service/Service";

function ListarCategorias() {
    
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [categorias, setCategorias] = useState<Categoria[]>([]);

   
    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
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
        buscarCategorias();
    }, [categorias.length]);

    return (
        <>
            
            {categorias.length === 0 && (
                <div className="flex justify-center w-full mt-4">
                    <span className="text-2xl font-bold text-slate-800">Carregando...</span>
                </div>
            )}
            
            <div className="flex justify-center w-full overflow-x-hidden">
                <div className="box-border w-full px-4 py-4 mt-8 mb-4 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 mb-4 md:mb-0">
                        
                        {categorias.map((categoria) => (
                            <CardCategorias key={categoria.id} categoria={categoria} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarCategorias;