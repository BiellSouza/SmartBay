import { useState, useEffect } from "react";
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
  ArrowLeft,
  Camera,
  CameraIcon,
  ChevronDown,
  SlidersHorizontal,
  ArrowBigDown,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

function App() {
  const [orcamento, setOrcamento] = useState<number>(() => {
    const orcamentoSalvo = localStorage.getItem("orcamentoAdd");

    return orcamentoSalvo ? JSON.parse(orcamentoSalvo) : 200;
  });
  const [produtos, setProdutos] = useState<Product[]>(() => {
    const ProdutosSalvos = localStorage.getItem("produtos");

    return ProdutosSalvos ? JSON.parse(ProdutosSalvos) : [];
  });

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
  // const porcentagemGasta = (totalGasto / orcamento) * 100;
  const porcentagemGasta = Math.min((totalGasto / orcamento) * 100, 100);
  // console.log(valorRestante);

  // Modal do Botão
  const [buttonAddItem, setButtonAddItem] = useState(false);

  // Estados do formulário
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState("");
  const [unidadeProduto, setUnidadeProduto] = useState("");
  const [fotoProduto, setFotoProdutos] = useState<string | null>(null);

  const totalNovoProduto = Number(precoProduto) * Number(quantidadeProduto);

  // Função para Salvar produto
  function salvarProduto() {
    if (
      !nomeProduto ||
      !precoProduto ||
      !quantidadeProduto ||
      !unidadeProduto
      // !fotoProduto
    ) {
      alert("Preencha todos os campos para salvar o Produto");
      return;
    }

    const novoProduto: Product = {
      id: Date.now(),
      nome: nomeProduto,
      preco: Number(precoProduto),
      quantidade: Number(quantidadeProduto),
      unidade: unidadeProduto,
      // imagem: fotoProduto,
      dataCompra: new Date().toISOString(),
    };

    console.log(novoProduto);

    setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);

    setNomeProduto("");
    setPrecoProduto("");
    setQuantidadeProduto("");
    setUnidadeProduto("");
    setFotoProdutos("");

    setButtonAddItem(false);
    alert(`Produto salvo com sucesso: ${novoProduto.nome}`);
  }

  // Função para deletar item
  function removerProduto(id: number) {
    const confirm = window.confirm(`Deseja realmente apagar este Produto?`);

    if (confirm) {
      setProdutos((produtosAtuais) =>
        produtosAtuais.filter((produto) => produto.id !== id),
      );
    }
  }

  // Edição do orçamento
  const [modalOrcamento, setModalOrcamento] = useState(false);
  const [novoOrcamento, setNovoOrcamento] = useState(orcamento.toString());

  // Função para Salvar o orçamento novo
  function salvarOrcamento() {
    const valor = Number(novoOrcamento);

    if (valor <= 0 || Number.isNaN(valor)) {
      alert("Digite um valor de orçamento válido!");
      return;
    }

    setOrcamento(valor);
    setModalOrcamento(false);
  }

  // Gráfico
  const dados = [
    { valor: 20 },
    { valor: 45 },
    { valor: 30 },
    { valor: 50 },
    { valor: 65 },
    { valor: 52 },
    { valor: 75 },
    { valor: 100 },
  ];

  // Visualizar Histórico
  const [abaAtiva, setAbaAtiva] = useState<"compras" | "resumo">("compras");

  const compras = [
    {
      id: 1,
      titulo: "Compra do dia",
      data: "18/08/2026",
      itens: 7,
      valor: 73.5,
    },
    {
      id: 2,
      titulo: "Compra do dia",
      data: "14/08/2026",
      itens: 5,
      valor: 125.2,
    },
    {
      id: 3,
      titulo: "Compra do dia",
      data: "10/08/2026",
      itens: 8,
      valor: 236.4,
    },
  ];

  // Persistência de Dados
  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    const orcamentoSalvo = localStorage.getItem("orcamentoAdd");

    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }

    if (orcamentoSalvo) {
      setOrcamento(JSON.parse(orcamentoSalvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    localStorage.setItem("orcamentoAdd", JSON.stringify(orcamento));
  }, [orcamento]);

  return (
    <div className="min-h-screen ">
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
              <button
                className="text-green-700 text-sm"
                onClick={() => {
                  setNovoOrcamento(orcamento.toString());
                  setModalOrcamento(true);
                }}
              >
                Editar
              </button>
              {modalOrcamento && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
                  <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                    <h2 className="text-xl font-semibold">Editar orçamento</h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Defina quanto pretende gastar nesta compra.
                    </p>

                    <div className="mt-6">
                      <label className="mb-2 block text-sm font-medium">
                        Orçamento
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={novoOrcamento}
                        onChange={(event) =>
                          setNovoOrcamento(event.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 p-4 outline-none"
                      />
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setModalOrcamento(false)}
                        className="w-full rounded-xl border border-gray-300 py-3"
                      >
                        Cancelar
                      </button>

                      <button
                        onClick={salvarOrcamento}
                        className="w-full rounded-xl bg-green-700 py-3 text-white"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
            <section className="flex flex-col text-center">
              <h1 className="text-[28px] text-green-700 font-semibold">
                R$ {orcamento.toFixed(2)}
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
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-22 h-22 object-cover rounded-lg"
                  />

                  <div className="p-4 flex w-full justify-between rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-300/30">
                    <div>
                      <h1 className="text-[18px] font-medium">
                        {produto.nome}
                      </h1>
                      <p className="text-md">
                        qtd: {produto.quantidade} {produto.unidade}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                      <h1 className="text-green-700">
                        R$ {(produto.preco * produto.quantidade).toFixed(2)}
                      </h1>

                      <Trash
                        onClick={() => removerProduto(produto.id)}
                        className="size-5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <button
              className="bg-green-700 py-2.5 gap-2 rounded-xl w-full text-white flex justify-center mt-6 mb-24"
              onClick={() => setButtonAddItem(true)}
            >
              <span>
                <Plus />
              </span>{" "}
              <p>Adicionar produto</p>
            </button>
            {/* Add produto */}
            {buttonAddItem && (
              <div className="fixed inset-0 overflow-y-auto p-6 bg-white">
                <div className="flex justify-between ">
                  <button onClick={() => setButtonAddItem(false)}>
                    <ArrowLeft />{" "}
                  </button>
                  <h1 className="text-lg font-medium">Adicionar produto</h1>{" "}
                  <Bell className="opacity-0" />
                </div>

                <label className="flex flex-col text-center mt-6 p-10 border border-dashed rounded-xl cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const arquivo = e.target.files?.[0];

                      if (arquivo) {
                        setFotoProdutos(URL.createObjectURL(arquivo));
                      }
                    }}
                  />

                  {fotoProduto ? (
                    <img
                      src={fotoProduto}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <Camera size={42} className="flex m-auto" />
                      <h1 className="text-green-700 font-medium mt-2">
                        Adicionar foto
                      </h1>
                      <p className="text-gray-600">ou toque para selecionar</p>
                    </>
                  )}
                </label>
                <div className="mt-6">
                  <h1 className="text-[14px] font-medium mb-2">
                    Nome do produto
                  </h1>
                  <input
                    type="text"
                    placeholder="Ex: Carne bovina"
                    value={nomeProduto}
                    onChange={(event) => setNomeProduto(event.target.value)}
                    className="outline-none border border-gray-300 bg-white p-4 rounded-xl w-full"
                  />
                </div>

                <div className="mt-6 flex justify-between gap-6">
                  <div>
                    <h1 className="text-[14px] font-medium mb-2">Preço (R$)</h1>
                    <input
                      type="text"
                      placeholder="Ex: 42.90"
                      value={precoProduto}
                      onChange={(event) => setPrecoProduto(event.target.value)}
                      className="outline-none border border-gray-300 bg-white p-4 rounded-xl w-full"
                    />
                  </div>
                  <div>
                    <h1 className="text-[14px] font-medium mb-2">Quantidade</h1>
                    <input
                      type="text"
                      placeholder="Ex: 1,20"
                      value={quantidadeProduto}
                      step="0.01"
                      onChange={(event) =>
                        setQuantidadeProduto(event.target.value)
                      }
                      className="outline-none border border-gray-300 bg-white p-4 rounded-xl w-full"
                    />
                  </div>
                </div>

                <div className="w-full max-w-md mt-6">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Unidade
                  </label>

                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      defaultValue=""
                      value={unidadeProduto}
                      onChange={(event) =>
                        setUnidadeProduto(event.target.value)
                      }
                    >
                      <option value="" disabled>
                        Selecione a unidade
                      </option>

                      <option value="un">Unidade</option>
                      <option value="kg">Kg</option>
                      <option value="g">Gramas</option>
                      <option value="l">Litro</option>
                      <option value="ml">Mililitro</option>
                    </select>

                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>

                  <div className="border border-gray-300 rounded-xl mt-8 p-4 flex flex-col justify-between gap-6">
                    <h1 className="font-medium text-[18px]">Resumo</h1>
                    <div className="flex justify-between">
                      <p>Total</p>
                      <h1 className="text-xl font-bold text-green-700">
                        R$ {totalNovoProduto.toFixed(2)}
                      </h1>
                    </div>
                  </div>

                  <button
                    className="bg-green-700 py-2.5 gap-2 rounded-xl w-full text-white flex justify-center mt-10 mb-24"
                    onClick={salvarProduto}
                  >
                    <p>Salvar produto</p>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/*  Histórico de Compras */}
          {/* <div>
            <div className="flex justify-between">
              <Menu />{" "}
              <h1 className="text-lg font-medium">Histórico de compras</h1>{" "}
              <SlidersHorizontal />
            </div>

            <div className="flex w-fit justify-between bg-green-100 rounded-full py-1.5 px-2 gap-4 items-center mx-auto mt-4">
              <p className="text-sm text-green-700">Agosto de 2026</p>{" "}
              <span>
                <ChevronDown size={16} className="text-green-700" />
              </span>
            </div>

            <div className="p-4 flex rounded-xl border border-t-0 border-gray-200 bg-white shadow-lg shadow-gray-300/30">
              <div className="flex flex-col gap-3 w-[50%]">
                <section>
                  <h1 className="text-[12px]">Total gasto no mês</h1>
                  <p className="text-[23px] text-green-700 font-medium">
                    R$ 847,30
                  </p>
                </section>
                <section>
                  <h1 className="text-[12px]">Compras realizadas</h1>
                  <p className="font-medium">12</p>
                </section>
              </div>
              <div className="w-[60%]">
                <div className="w-full h-full rounded-2xl border border-gray-200 bg-white p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dados}>
                      <defs>
                        <linearGradient
                          id="corGrafico"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#2f6b4f"
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="100%"
                            stopColor="#2f6b4f"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <Area
                        type="monotone"
                        dataKey="valor"
                        stroke="#2f6b4f"
                        strokeWidth={2}
                        fill="url(#corGrafico)"
                        dot={false}
                        activeDot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex justify-between">
                <button
                  onClick={() => setAbaAtiva("compras")}
                  className={`p-3 text-[12px] w-42 ${abaAtiva === "compras" ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"}`}
                >
                  Compras
                </button>
                <button
                  onClick={() => setAbaAtiva("resumo")}
                  className={`p-3 text-[12px] w-42 ${abaAtiva === "resumo" ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"}`}
                >
                  Resumo por categoria
                </button>
              </div>
              <div></div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {compras.map((compra) => (
              <div
                key={compra.id}
                className="flex items-center justify-between rounded-xl bg-white p-4 border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <ShoppingBag className="text-green-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {compra.titulo}
                    </h3>

                    <p className="text-sm text-slate-500 text-[11px]">
                      {compra.data} • {compra.itens} itens
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-700">
                    {compra.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>

                  <span className="text-slate-400">
                    <ChevronRight />
                  </span>
                </div>
              </div>
            ))}
          </div> */}

          <footer className="fixed bottom-0 left-0 z-50 w-full bg-white px-4 py-2 border-t border-gray-200">
            {" "}
            <div className="flex justify-between mt-2">
              {" "}
              {itensRodape.map((item) => (
                <div className="flex flex-col items-center gap-1">
                  <span>{item.item}</span>
                  <p className="text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
