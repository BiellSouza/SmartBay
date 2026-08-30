import {
  HelpCircle,
  Search,
  ChevronRight,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Support() {
  function ButtonContact() {
    alert("Funcionando!");
  }
  const topics = [
    {
      label: "Como adicionar produtos à minha lista?",
    },
    {
      label: "Como acompanhar meus pedidos?",
    },
    {
      label: "Como alterar adicionar um endereço?",
    },
    {
      label: "Como entrar em contato com o suporte?",
    },
  ];
  return (
    <div>
      <div>
        <header className="flex items-center justify-between">
          <NavLink
            to="/profile"
            className="flex h-10 w-fit items-center justify-center rounded-full cursor-pointer"
            aria-label="Voltar"
          >
            <ArrowLeft className="size-6 text-gray-900" />
          </NavLink>
        </header>
      </div>
      <div className="bg-green-300/20 py-2 px-4 mt-4 flex rounded-2xl gap-3">
        <div className="bg-green-300/30 w-fit p-3 rounded-full m-auto">
          <HelpCircle className="text-green-800" size={32} />
        </div>
        <div className="">
          <h1 className="font-bold text-md">Como podemos ajudar?</h1>
          <p className="text-gray-500 text-sm">
            Encontre respostas para as suas dúvidas ou entre em contato com
            nossa equipe.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 border border-gray-500 py-2 px-4 rounded-full">
        <Search className="text-gray-600" />
        <input
          type="text"
          placeholder="Buscar por assunto..."
          className="outline-none w-full"
        />
      </div>

      <div className="mt-8">
        <h1 className="font-bold mb-3">Perguntas frequentes</h1>
        {topics.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 py-3 px-3 rounded-xl my-2"
          >
            <div className="flex justify-between items-center">
              <h1 className="max-w-50">{item.label}</h1>
              <ChevronRight className="size-6" />
            </div>
          </div>
        ))}
      </div>

      <button
        className="flex bg-green-300/30 w-full py-3 rounded-xl mt-8 cursor-pointer"
        onClick={ButtonContact}
      >
        <p className="flex items-center gap-2 m-auto text-green-950 font-bold">
          <span>
            <Mail className="size-5" />
          </span>
          Entrar em contato
        </p>
      </button>
    </div>
  );
}

export default Support;
