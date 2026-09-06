import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import ProductForm from "../components/ProductForm";
import logo from "../assets/logoSmartbay.png";
import imgSidebar from "../assets/sidebarImg.png";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  Tooltip,
} from "recharts";
import {
  Pencil,
  ChevronRight,
  ArrowRight,
  CalendarCheck,
  Pin,
  Eye,
  Trash,
  Plus,
  Menu,
  Search,
  ChevronDown,
  Bell,
  Home,
  Clock,
  List,
  Wallet,
  Tag,
  ChartNoAxesColumn,
  PlusCircle,
  ShoppingBag,
  Target,
  Settings,
  CircleQuestionMark,
} from "lucide-react";
import Footer from "../components/Footer";
import { supabase } from "../services/supabase";
import fotoUser from "../assets/MinhaFoto.jpeg";

function InterfaceLogin() {
  const [orcamento, setOrcamento] = useState<number>(() => {
    const orcamentoSalvo = localStorage.getItem("orcamentoAdd");

    return orcamentoSalvo ? JSON.parse(orcamentoSalvo) : 200;
  });
  // const [produtos, setProdutos] = useState<Product[]>(() => {
  //   const ProdutosSalvos = localStorage.getItem("produtos");

  //   return ProdutosSalvos ? JSON.parse(ProdutosSalvos) : [];
  // });

  const [produtos, setProdutos] = useState<Product[]>([]);

  // Lógica do cálculo
  const totalGasto = produtos.reduce((total, produto) => {
    return total + produto.preco * produto.quantidade;
  }, 0);

  // const valorRestante = orcamento - totalGasto;
  const valorRestante = orcamento - totalGasto;

  // const porcentagemGasta = (totalGasto / orcamento) * 100;
  const porcentagemGasta = Math.min((totalGasto / orcamento) * 100, 100);

  // Modal do Botão
  const [buttonAddItem, setButtonAddItem] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Product | null>(null);

  // Função para deletar item
  async function removerProduto(id: number) {
    const confirmar = window.confirm("Deseja realmente apagar este Produto?");

    if (!confirmar) return;

    const { error } = await supabase.from("produtos").delete().eq("id", id);

    if (error) {
      console.error("❌ Erro ao excluir produto:", error);
      alert("Não foi possível excluir o produto.");
      return;
    }

    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id),
    );

    alert("Produto excluído com sucesso!");
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

  // Persistência de Dados
  // useEffect(() => {
  //   const produtosSalvos = localStorage.getItem("produtos");
  //   const orcamentoSalvo = localStorage.getItem("orcamentoAdd");

  //   if (produtosSalvos) {
  //     setProdutos(JSON.parse(produtosSalvos));
  //   }

  //   if (orcamentoSalvo) {
  //     setOrcamento(JSON.parse(orcamentoSalvo));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("produtos", JSON.stringify(produtos));
  // }, [produtos]);

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Erro ao carregar produtos:", error);
        return;
      }

      const produtosFormatados: Product[] = data.map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
        quantidade: Number(produto.quantidade),
        unidade: produto.unidade,
        imagem: produto.imagem,
        dataCompra: produto.data_compra,
      }));

      setProdutos(produtosFormatados);
    }

    carregarProdutos();
  }, []);

  useEffect(() => {
    localStorage.setItem("orcamentoAdd", JSON.stringify(orcamento));
  }, [orcamento]);

  const menuItensTop = [
    {
      icon: <Home className="size-5" />,
      label: "Resumo",
    },
    {
      icon: <Clock className="size-5" />,
      label: "Historico",
    },
    {
      icon: <List className="size-5" />,
      label: "Lista de compras",
    },
    {
      icon: <Wallet className="size-5" />,
      label: "Orçamento",
    },
    {
      icon: <Tag className="size-5" />,
      label: "Categorias",
    },
    {
      icon: <ChartNoAxesColumn className="size-5" />,
      label: "Relatórios",
    },
  ];

  const menuItensMid = [
    {
      icon: <PlusCircle className="size-5" />,
      label: "Adicionar Produto",
    },
    {
      icon: <ShoppingBag className="size-5" />,
      label: "Nova compra",
    },
    {
      icon: <Target className="size-5" />,
      label: "Metas de orçamento",
    },
  ];

  const menuItensFooter = [
    {
      icon: <Settings className="size-5" />,
      label: "Adicionar Produto",
    },
    {
      icon: <CircleQuestionMark className="size-5" />,
      label: "Nova compra",
    },
  ];

  const dados = [
    { data: "13/08", valor: 48 },
    { data: "14/08", valor: 58 },
    { data: "15/08", valor: 76 },
    { data: "16/08", valor: 42 },
    { data: "17/08", valor: 32 },
    { data: "18/08", valor: 53 },
    { data: "19/08", valor: 49 },
  ];

  const dadosAnteriores = [
    {
      label: "Total gasto",
      number: 236.4,
    },
    {
      label: "Compras",
      number: 4,
    },
    {
      label: "Média diária",
      number: 33.77,
    },
  ];

  const compras = [
    {
      data: "18/08/2026",
      compra: "Compra do dia",
      itens: "2 itens",
      total: "R$ 12",
    },
  ];

  const dadosCategoria = [
    { nome: "Carnes", valor: 40, fill: "#22c55e" },
    { nome: "Grãos", valor: 25, fill: "#3b82f6" },
    { nome: "Hortifruti", valor: 20, fill: "#eab308" },
    { nome: "Laticínios", valor: 15, fill: "#a855f7" },
  ];

  const listProducts = [
    {
      label: "Leite",
    },
    {
      label: "Pão Francês",
    },
    {
      label: "Ovos",
    },
    {
      label: "Café",
    },
    {
      label: "Detergente",
    },
  ];

  return (
    <div>
      <div className="lg:hidden">
        {/* <NavbarComponent label="Resumo da compra" /> */}
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
                      onChange={(event) => setNovoOrcamento(event.target.value)}
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
            {/* <p className="font-bold text-md">Itens da compra</p>{" "} */}
            {/* <button className="text-green-700 text-sm">Ver todos</button> */}
          </section>
          <section className="flex flex-col gap-3">
            {produtos.map((produto) => (
              <div key={produto.id} className="flex justify-between gap-2">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-22 h-22 object-cover rounded-lg border border-gray-300"
                />

                <div className="p-4 flex w-full justify-between rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-300/30">
                  <div>
                    <h1 className="text-[18px] font-medium">{produto.nome}</h1>
                    <p className="text-md">
                      qtd: {produto.quantidade} {produto.unidade}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <h1 className="text-green-700">
                      R$ {(produto.preco * produto.quantidade).toFixed(2)}
                    </h1>

                    <div className="flex  items-center gap-3">
                      {" "}
                      <Trash
                        onClick={() => removerProduto(produto.id)}
                        className="size-5"
                      />
                      <Pencil
                        onClick={() => {
                          setProdutoEditando(produto);
                          setButtonAddItem(true);
                        }}
                        className="size-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
          <button
            className="bg-green-700 py-2.5 gap-2 rounded-xl w-full text-white flex justify-center mt-6 mb-28"
            onClick={() => {
              setProdutoEditando(null);
              setButtonAddItem(true);
            }}
          >
            <span>
              <Plus />
            </span>
            <p>Adicionar produto</p>
          </button>

          {buttonAddItem && (
            <ProductForm
              produtoEditando={produtoEditando}
              valorRestante={valorRestante}
              onSalvar={async (produto) => {
                const existe = produtos.some((item) => item.id === produto.id);

                if (existe) {
                  const { data, error } = await supabase
                    .from("produtos")
                    .update({
                      nome: produto.nome,
                      preco: produto.preco,
                      quantidade: produto.quantidade,
                      unidade: produto.unidade,
                      imagem: produto.imagem,
                      data_compra: produto.dataCompra,
                    })
                    .eq("id", produto.id)
                    .select()
                    .single();

                  if (error) {
                    console.error("❌ Erro ao atualizar produto:", error);
                    alert("Não foi possível atualizar o produto.");
                    return;
                  }

                  const produtoAtualizado: Product = {
                    id: data.id,
                    nome: data.nome,
                    preco: Number(data.preco),
                    quantidade: Number(data.quantidade),
                    unidade: data.unidade,
                    imagem: data.imagem,
                    dataCompra: data.data_compra,
                  };

                  setProdutos((produtosAtuais) =>
                    produtosAtuais.map((item) =>
                      item.id === produtoAtualizado.id
                        ? produtoAtualizado
                        : item,
                    ),
                  );
                } else {
                  const { data, error } = await supabase
                    .from("produtos")
                    .insert({
                      nome: produto.nome,
                      preco: produto.preco,
                      quantidade: produto.quantidade,
                      unidade: produto.unidade,
                      imagem: produto.imagem,
                      data_compra: produto.dataCompra,
                    })
                    .select()
                    .single();

                  if (error) {
                    console.error("❌ Erro ao salvar produto:", error);
                    alert("Não foi possível salvar o produto.");
                    return;
                  }

                  const novoProduto: Product = {
                    id: data.id,
                    nome: data.nome,
                    preco: Number(data.preco),
                    quantidade: Number(data.quantidade),
                    unidade: data.unidade,
                    imagem: data.imagem,
                    dataCompra: data.data_compra,
                  };

                  setProdutos((produtosAtuais) => [
                    ...produtosAtuais,
                    novoProduto,
                  ]);
                }

                setProdutoEditando(null);
              }}
              onFechar={() => {
                setProdutoEditando(null);
                setButtonAddItem(false);
              }}
            />
          )}
        </div>

        <Footer />
      </div>
      <div className="hidden lg:flex ">
        <div className="flex w-full min-h-screen">
          <section className="w-80 lg:w-60 bg-white flex flex-col space-y-10 px-4 py-6 ">
            <div className="flex items-center justify-between w-full">
              <img
                src={logo}
                alt="Logo da SmartBay"
                className="max-w-48 object-cover flex lg:max-w-32"
              />
              <button className="flex p-0">
                <Pin className="size-4 rotate-32" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {menuItensTop.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-gray-500">{item.icon}</span>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </div>
              ))}
            </div>

            <hr className="opacity-10" />

            <div className="flex flex-col gap-6">
              <h1 className="text-gray-500">ATALHOS</h1>
              {menuItensMid.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-gray-500">{item.icon}</span>
                  <p className="text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="border border-gray-300 mt-4 flex flex-col justify-center items-center text-center space-y-3 rounded-xl py-4 px-4">
              <img
                src={imgSidebar}
                alt="imagem ilustrativa de compras"
                className="object-cover max-w-[60px]"
              />
              <h1 className="font-bold text-[14px]">Dica Smart</h1>
              <p className="text-gray-500 font-medium text-[12px]">
                Defina metas de orçamento mensais e acompanhe seus gastos em
                tempo real.
              </p>
              <button className="border border-green-700 text-green-700 w-44 rounded-xl py-1">
                Criar meta
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {menuItensFooter.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-gray-500">{item.icon}</span>
                  <p className="text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="w-full">
            {/* Topo */}
            <div className="py-6 px-4 flex justify-between w-full border-b border-gray-300">
              <div className="flex items-center gap-6">
                <button className="border rounded-xl p-2 border-gray-300">
                  <Menu className="size-4" />
                </button>
                <div>
                  <h1 className="font-bold text-[14px] xl:text-xl">
                    Olá, Gabriel! 👋
                  </h1>
                  <p className="font-medium text-gray-500 text-[10px] xl:text-xs">
                    Veja o resumo das suas compras e finanças
                  </p>
                </div>
              </div>

              <div className="flex items-center mr-4 w-fit">
                <div className="flex items-center border gap-4 rounded-xl px-3 border-gray-300 min-w-24 py-2 xl:min-w-100">
                  <Search className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar produtos, compras..."
                    className="w-full truncate outline-none"
                  />
                </div>
              </div>

              <div className="relative flex items-center gap-12">
                <div>
                  <button className="border rounded-xl p-2 border-gray-300">
                    <Bell />
                  </button>
                  <p className="absolute bg-red-500 text-white px-2 rounded-full top-1 left-7">
                    3
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={fotoUser}
                    alt="Foto do Usuário"
                    className="w-10 h-10 shrink-0 object-top object-cover rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-bold w-full xl:text-xl">
                      Gabriel
                    </h1>
                    <p className="text-[10px] truncate bg-green-200 w-fit px-2 py-0.5 text-green-700 rounded-full xl:text-[14px]">
                      Dev - Frontend
                    </p>
                  </div>
                  <span>
                    <ChevronDown className="size-5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="py-4 px-4 flex">
              <div>
                <div className="flex gap-4 items-center">
                  <h1 className="font-bold text-sm">Resumo financeiro</h1>
                  <button className="bg-gray-200 p-1 rounded-md">
                    <Eye className="size-4" />
                  </button>
                  <p className="text-[12px] text-green-700">Ver detalhes</p>
                </div>

                <div className="relative ">
                  <section className="flex overflow-auto w-full gap-3 mt-0 pr-4 xl:overflow-hidden xl:border-none justify-between">
                    <div className="flex flex-col border border-gray-300 rounded-xl p-4 w-fit min-w-40 shadow-black shadow-md/20 my-4">
                      <section className="flex justify-between">
                        <p className="font-medium text-[12px]">Orçamento</p>{" "}
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
                              <h2 className="text-xl font-semibold">
                                Editar orçamento
                              </h2>

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
                      <section className="flex flex-col text-start">
                        <h1 className="text-sm text-green-700 font-semibold mb-4">
                          R$ {orcamento.toFixed(2)}
                        </h1>
                      </section>
                      <section className="">
                        <p className="text-[10px] mb-2"> Orçamento definido</p>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-green-700 transition-all duration-500"
                            style={{ width: `${porcentagemGasta}%` }}
                          ></div>
                        </div>
                      </section>
                    </div>

                    <div className="flex flex-col border border-gray-300 rounded-xl p-4 w-fit min-w-40 shadow-black shadow-md/20 my-4">
                      <div className="flex flex-col mb-3 gap-1">
                        <p className="text-[10px]">Gasto até agora</p>
                        <h1 className="font-medium text-red-700">
                          {" "}
                          R$ {totalGasto.toFixed(2)}
                        </h1>
                      </div>
                      <p className="text-[10px]">
                        {" "}
                        R$ {((totalGasto / orcamento) * 100).toFixed(2)}% do
                        orçamento
                      </p>
                      <div className="mt-2 bg-gray-300 h-2 w-32 rounded-full">
                        <div
                          className="bg-red-700 h-full rounded-full"
                          style={{ width: `${porcentagemGasta}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col border border-gray-300 rounded-xl p-4 w-fit min-w-40 shadow-black shadow-md/20 my-4">
                      <div className="flex flex-col mb-3 gap-1">
                        <p className="text-[10px]">Restante</p>
                        <h1 className="font-medium text-green-700">
                          R$ {valorRestante.toFixed(2)}
                        </h1>
                      </div>
                      <p className="text-[10px]">
                        R$ {((valorRestante / orcamento) * 100).toFixed(2)}%
                      </p>
                      <div className="mt-2 bg-gray-300 h-2 w-32 rounded-full">
                        {" "}
                        <div
                          className="h-full bg-green-700 rounded-full"
                          style={{ width: valorRestante }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col border border-gray-300 rounded-xl p-4 w-fit min-w-40 shadow-black shadow-md/20 my-4">
                      <div className="flex flex-col mb-3 gap-1">
                        <p className="text-[10px]">Economia</p>
                        <h1 className="font-medium text-green-700">R$ 28,40</h1>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-[10px]">vs. mês anterior</p>{" "}
                        <div className="bg-green-100 p-0.5 rounded-full">
                          <span>
                            <ArrowRight className="size-4 -rotate-38 text-green-800" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Itens da compra e últimos 7 dias */}
                <section className="flex gap-4 pr-4 pb-2 justify-between">
                  {" "}
                  <div className="border border-gray-300 w-88 shrink-0 rounded-xl mt-4 p-4">
                    {/* Título */}
                    <div className="flex justify-between mb-4">
                      <h1 className="font-bold text-sm">Itens da compra</h1>

                      <a
                        href=""
                        className="text-[12px] text-green-700 font-medium"
                      >
                        Ver todos
                      </a>
                    </div>

                    {/* Cabeçalho */}
                    <div className="grid grid-cols-[1fr_50px_80px] items-center px-2 pb-2 border-b border-gray-200">
                      <p className="text-sm text-gray-700">Produto</p>

                      <p className="text-sm text-gray-700 text-center">Qtd</p>

                      <p className="text-sm text-gray-700 text-right">Valor</p>
                    </div>

                    {/* Produtos */}
                    {produtos.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr_50px_80px] items-center px-2 py-2 border-b border-gray-200"
                      >
                        {/* Produto */}
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.imagem}
                            alt={item.nome}
                            className="w-11 h-11 rounded-md object-cover border border-gray-300 shrink-0"
                          />

                          <div className="min-w-0">
                            <h1 className="text-sm font-medium truncate">
                              {item.nome}
                            </h1>

                            <p className="text-[12px] text-gray-500">
                              {item.quantidade} {item.unidade}
                            </p>
                          </div>
                        </div>

                        {/* Quantidade */}
                        <p className="text-sm text-center">{item.quantidade}</p>

                        {/* Valor */}
                        <p className="text-sm text-green-700 font-medium text-right">
                          R$ {item.preco}
                        </p>
                      </div>
                    ))}

                    <button className="mt-4 border text-green-600 w-full justify-center border-green-600 rounded-md py-2 px-4 flex items-center">
                      <span>
                        <Plus className="size-4" />
                      </span>{" "}
                      Adicionar produto
                    </button>
                  </div>
                  <div className="border border-gray-300 w-88 shrink-0 rounded-xl mt-4 p-4">
                    {/* Título */}
                    <div className="flex justify-between mb-4">
                      <h1 className="font-bold text-[12px]">
                        Gastos dos últimos 7 dias
                      </h1>

                      <button className="py-1 px-2 text-[10px] flex items-center gap-1 border border-gray-300 rounded-md">
                        Últimos 7 dias{" "}
                        <span>
                          <ChevronDown className="size-4" />
                        </span>
                      </button>
                    </div>

                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={dados}
                          margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          {/* Linhas horizontais */}
                          <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            stroke="#e5e7eb"
                          />

                          {/* Valores da esquerda */}
                          <YAxis
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                            tickFormatter={(valor) => `R$ ${valor}`}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fontSize: 10,
                              fill: "#6b7280",
                            }}
                          />

                          {/* Datas */}
                          <XAxis
                            dataKey="data"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fontSize: 10,
                              fill: "#6b7280",
                            }}
                          />

                          {/* Tooltip ao passar o mouse */}
                          <Tooltip
                            formatter={(valor) => [`R$ ${valor}`, "Gasto"]}
                            labelFormatter={(data) => `Data: ${data}`}
                          />

                          {/* Área + linha */}
                          <Area
                            type="monotone"
                            dataKey="valor"
                            stroke="#218c4b"
                            strokeWidth={2}
                            fill="#218c4b"
                            fillOpacity={0.1}
                            dot={{
                              r: 3,
                              fill: "#218c4b",
                              strokeWidth: 0,
                            }}
                            activeDot={{
                              r: 5,
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between">
                      {dadosAnteriores.map((item, index) => (
                        <div
                          key={index}
                          className="bg-green-100 w-26 p-2 rounded-md text-center"
                        >
                          <h1 className="text-[10px] font-medium">
                            {item.label}
                          </h1>
                          <p className="text-[14px] text-green-800">
                            R$ {item.number}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Histórico */}
                <section className="border border-t-0 border-gray-200 p-4 rounded-md">
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-6 items-center">
                      <h1 className="font-bold text-sm">
                        Histórico de compras
                      </h1>
                      <button className="border text-sm border-gray-300 py-1 px-3 rounded-xl flex items-center gap-2">
                        Agosto de 2026{" "}
                        <span>
                          <ChevronDown className="size-4" />
                        </span>
                      </button>
                    </div>

                    <a
                      className="text-[12px] text-green-700 font-medium"
                      href=""
                    >
                      Ver todas
                    </a>
                  </div>

                  {/* RESUMO DO MÊS */}
                  <div className="flex gap-4 mt-4">
                    <div className="gap-13 mt-4 flex rounded-xl bg-white shadow-lg shadow-gray-300/30">
                      {/* INFORMAÇÕES */}
                      <div className="flex gap-3 bg-gray-200 p-4 rounded-md">
                        <div>
                          {" "}
                          <section>
                            <h1 className="text-[12px]">Total gasto no mês</h1>

                            <p className="text-[23px] text-green-700 font-medium">
                              R$ {totalGasto}
                            </p>
                          </section>
                          <section>
                            <h1 className="text-[12px]">Compras realizadas</h1>
                            <p className="font-medium">{compras.length}</p>{" "}
                          </section>
                        </div>

                        <div className="w-32 items-end flex">
                          <div className="w-full h-24 rounded-2xl border border-gray-200 bg-white p-3">
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
                    </div>

                    <div className="w-full mt-4">
                      <div className="grid grid-cols-[120px_100px_80px_100px] items-center px-2 pb-2 border-b border-gray-200">
                        <p className="text-sm text-gray-700">Data</p>

                        <p className="text-sm text-gray-700 text-center">
                          Compra
                        </p>

                        <p className="text-sm text-gray-700 text-right">
                          Itens
                        </p>

                        <p className="text-sm text-gray-700 text-right">
                          Total
                        </p>
                      </div>

                      {/* Produtos */}
                      {compras.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="grid grid-cols-[120px_100px_80px_100px] items-center px-2 py-2 border-b border-gray-200">
                            {/* Data */}
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="min-w-0 flex items-center gap-2">
                                <p className="bg-green-100 w-fit py-0.5 px-1 rounded-md">
                                  {" "}
                                  <ShoppingBag className="w-4 text-green-700" />
                                </p>
                                <h1 className="text-[12px] font-light truncate">
                                  {item.data}
                                </h1>
                              </div>
                            </div>

                            {/* Compra */}
                            <p className="text-[12px] text-center">
                              {" "}
                              {item.compra}
                            </p>

                            {/* Quantidade */}
                            <p className="text-sm text font-medium text-right">
                              {item.itens}
                            </p>

                            {/* Total */}
                            <p className="text-sm text-green-700 font-medium text-right">
                              {item.total}
                            </p>
                          </div>
                          <button>
                            <ChevronRight className="w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <section className="w-full hidden xl:flex xl:flex-col">
                <div className="bg-white shadow-xs border border-gray-200 p-2 rounded-xl">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[12px] font-bold">Próxima compra</h1>
                    <a
                      className="text-[10px] text-green-700 font-medium"
                      href=""
                    >
                      Ver todas
                    </a>
                  </div>
                  <div className="flex flex-col mt-4">
                    {compras.slice(-1).map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl bg-green-100/40 flex justify-between items-center py-2 px-2"
                      >
                        <div className="flex items-center gap-2">
                          <p className="bg-green-200 p-2 rounded-full">
                            <CalendarCheck className="size-4 text-green-700" />
                          </p>
                          <div className="">
                            <h1 className="text-[10px] font-bold">
                              {item.compra}
                            </h1>
                            <div className="flex gap-1 items-center -mt-1">
                              <p className="text-[10px]">{item.data}</p> •
                              <p className="text-[10px]">{item.itens}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-[12px]">{item.total}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white shadow-xs border border-gray-200 p-4 rounded-xl mt-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[12px] font-bold">Categorias</h1>

                    <a
                      className="text-[10px] text-green-700 font-medium"
                      href=""
                    >
                      Ver relatório
                    </a>
                  </div>

                  <div className="w-full h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dadosCategoria}
                          dataKey="valor"
                          nameKey="nome"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        />

                        {/* <Tooltip />
                    <Legend /> */}
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {dadosCategoria.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex gap-2 items-center">
                        <div
                          className={`w-4 h-4 rounded-full`}
                          style={{ backgroundColor: item.fill }}
                        ></div>{" "}
                        <p>{item.nome}</p>
                      </div>
                      <p>{item.valor} %</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white shadow-xs border border-gray-200 p-4 rounded-xl mt-4">
                  <div className="flex flex-col items-start justify-between">
                    <h1 className="text-[12px] font-bold mb-4">Lista rápida</h1>

                    {listProducts.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-center border-t border-gray-300 w-full py-3"
                      >
                        <input type="checkbox" className="accent-green-700" />{" "}
                        <label htmlFor="">{item.label}</label>
                      </div>
                    ))}

                    <button className="flex mt-4 items-center gap-2 border border-green-700 text-green-700 w-full justify-center py-2 rounded-lg">
                      <span>
                        <Plus />
                      </span>{" "}
                      Adicionar item
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default InterfaceLogin;
