import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Perfil() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl rounded-2xl overflow-hidden my-8">
      <img
        className="w-full mt-4 h-40 sm:h-56 md:h-72 object-cover border-b-8 border-white rounded-t-2xl"
        src="https://i.imgur.com/6C49BZQ.jpg"
        alt="Capa do Perfil"
      />

      <div className="rounded-full w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-auto -mt-16 sm:-mt-24 md:-mt-32 border-8 border-white relative z-10 overflow-hidden bg-slate-300 flex items-center justify-center">
        {usuario.foto ? (
          <img
            src={usuario.foto}
            alt={`Foto de ${usuario.nome}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-bold text-slate-600">
            {usuario.nome?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="relative -mt-12 sm:-mt-16 md:-mt-20 mb-4 min-h-64 flex flex-col gap-2 bg-slate-600 text-white text-base sm:text-xl md:text-2xl items-center justify-center rounded-b-2xl px-4 pt-16 pb-8 text-center">
        <p className="font-bold wrap-break-word">{usuario.nome}</p>
        <p className="text-slate-200 wrap-break-word">{usuario.usuario}</p>
        {usuario.dataNascimento && (
          <p className="text-sm sm:text-base text-slate-300">
            Nascimento:{" "}
            {new Date(usuario.dataNascimento).toLocaleDateString("pt-BR")}
          </p>
        )}

        <div className="mt-4">
          <Link
            to="/editarperfil"
            className="rounded text-white bg-indigo-500 hover:bg-indigo-700 px-6 py-2 text-base font-bold transition-colors cursor-pointer inline-block"
          >
            Editar Perfil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Perfil;