import { useState } from "react";
import type { Product } from "./types/Product";
import {
  House,
  Menu,
  Bell,
  Trash,
  Plus,
  Home,
  Clock,
  List,
  User,
} from "lucide-react";

function App() {
  const [orcamento, setOrcamento] = useState(200);
  const [produtos, setProdutos] = useState<Product[]>([
    {
      id: 1,
      nome: "Carne Bovina",
      preco: 51.48,
      quantidade: 1,
    },
    {
      id: 2,
      nome: "Arroz branco",
      preco: 16,
      quantidade: 3,
    },
    {
      id: 3,
      nome: "Tomate",
      preco: 16,
      quantidade: 2,
    },
    {
      id: 4,
      nome: "Frango",
      preco: 10,
      quantidade: 1,
    },
  ]);

  const itensRodape = [
    {
      item: <Home />,
      text: "Resumo",
    },
    {
      item: <Clock />,
      text: "Histórico",
    },
    {
      item: <List />,
      text: "Lista",
    },
    {
      item: <User />,
      text: "Perfil",
    },
  ];

  // Lógica do cálculo
  const totalGasto = produtos.reduce((total, produto) => {
    return total + produto.preco * produto.quantidade;
  }, 0);

  // const valorRestante = orcamento - totalGasto;
  const valorRestante = orcamento - totalGasto;
  const porcentagemGasta = (totalGasto / orcamento) * 100;
  // console.log(valorRestante);

  return (
    <main>
      {/* <h1>Compras</h1>

      <p>Orçamento: R$ {orcamento}</p>
      <p>Produtos: {produtos.length}</p> */}

      <div className="p-6">
        <div className="flex justify-between">
          <Menu /> <h1 className="text-lg font-medium">Resumo da compra</h1>{" "}
          <Bell />
        </div>
        <div className="mt-4 p-4 flex flex-col gap-3 rounded-xl border border-t-0 border-gray-200 bg-white shadow-lg shadow-gray-300/30">
          <section className="flex justify-between">
            <p className="font-medium text-sm">Orçamento</p>{" "}
            <button className="text-green-700 text-sm">Editar</button>
          </section>
          <section className="flex flex-col text-center">
            <h1 className="text-[28px] text-green-700 font-semibold">
              R$ 200,00
            </h1>
            <p className="text-[14px] font-light">Valor definido</p>
          </section>
          <section className="">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-700 transition-all duration-500"
                style={{ width: `${porcentagemGasta}%` }}
              ></div>
            </div>
          </section>

          <section className="flex justify-between items-center">
            <div className="w-25">
              <p className="text-[13px]">Gasto até agora</p>
              <h1 className="text-red-600 text-lg font-medium">
                {" "}
                R$ {totalGasto.toFixed(2)}
              </h1>
            </div>
            <p className="w-0.5 h-8 bg-gray-300"></p>
            <div className="w-25 text-right">
              <p className="text-[13px]">Restante</p>
              <h1 className="text-lg text-green-700 font-medium">
                {" "}
                R$ {valorRestante.toFixed(2)}
              </h1>
            </div>
          </section>
        </div>

        <div className="mt-8">
          <section className="flex justify-between items-center mb-4">
            <p className="font-bold text-md">Itens da compra</p>{" "}
            <button className="text-green-700 text-sm">Ver todos</button>
          </section>
          <section className="flex flex-col gap-3">
            {produtos.map((produto) => (
              <div key={produto.id} className="flex justify-between">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                  alt={produto.nome}
                  className="w-22 h-22 object-cover rounded-lg"
                />

                <div className="p-4 flex w-full justify-between rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-300/30">
                  <div>
                    <h1 className="text-[18ßpx] font-medium">{produto.nome}</h1>
                    <p className="text-md">qtd: {produto.quantidade}</p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <h1 className="text-green-700">
                      R$ {(produto.preco * produto.quantidade).toFixed(2)}
                    </h1>

                    <Trash className="size-5" />
                  </div>
                </div>
              </div>
            ))}
          </section>

          <button className="bg-green-700 py-2.5 gap-2 rounded-xl w-full text-white flex justify-center mt-3">
            <span>
              <Plus />
            </span>{" "}
            <p>Adicionar produto</p>
          </button>
        </div>
        <footer className="flex justify-between mt-2 pt-4 border-t border-gray-200">
          {itensRodape.map((item) => (
            <div className="flex flex-col items-center gap-1">
              <span>{item.item}</span>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </footer>
      </div>
    </main>
  );
}

export default App;
