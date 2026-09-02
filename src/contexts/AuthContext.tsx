import axios from "axios"
import { type ReactNode, createContext, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../service/Service"

interface AuthContextProps{
  usuario: UsuarioLogin
  handleLogin(usuario: UsuarioLogin): void
  handleLogout(): void
  isLoading: boolean
}

interface AuthProviderProps{
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps){


  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
    token: '',
  })

   const [isLoading, setIsLoading] = useState<boolean>(false);


  async function handleLogin(usuarioLogin: UsuarioLogin){

     setIsLoading(true);

    try{
      await login(`/usuarios/logar`, usuarioLogin, setUsuario);
      alert("Usuário Autenticado com sucesso!")
    }catch(error){
      if (axios.isAxiosError(error) && error.response){
          alert(`Erro ao autenticar o usuário: ${error.response.status}`);
          console.log('Resposta da API: ', error.message);
        } else{
          alert("Erro ao autenticar o usuário! Verifique a conexão com a API!");
        }
    }finally{
      setIsLoading(false);
    }
  }


   function handleLogout(){
      setUsuario({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        dataNascimento: '',
        token: '',
      })
   }

   return(
      <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading}}>
        { children }
      </AuthContext.Provider>
   )
}