import {
  ChartNoAxesColumn,
  ChevronDown,
  CircleQuestionMark,
  Clock,
  Home,
  List,
  Menu,
  Bell,
  Pin,
  PlusCircle,
  Search,
  Settings,
  ShoppingBag,
  Tag,
  Target,
  Wallet,
  Eye,
  ArrowRight,
  Plus,
  CalendarCheck,
} from "lucide-react";
import { PieChart, Pie, Tooltip } from "recharts";
import { CartesianGrid, XAxis, YAxis } from "recharts";
import logo from "../assets/logoSmartbay.png";
import imgSidebar from "../assets/sidebarImg.png";
import fotoUser from "../assets/MinhaFoto.jpeg";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { ChevronRight } from "lucide-react";

function InterfaceDesktop() {
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

  const produtos = [
    {
      id: "1",
      name: "Carne",
      quantidade: 2,
      unidade: "Kg",
      preco: 33.4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJdrNOgZTYt80mGGrciDEpO9BP8CbFSyEk84RCC2-jfQ&s=10",
    },
    {
      id: "2",
      name: "Arroz",
      quantidade: 1,
      unidade: "Kg",
      preco: 17,
      image:
        "data:image/webp;base64,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",
    },
    {
      id: "3",
      name: "Feijão",
      quantidade: 5,
      unidade: "Kg",
      preco: 10.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzmumAkYQYRfCXjEmab0iRTEtYii6KFN72wrDvtQh0GQ&s=10",
    },
    {
      id: "4",
      name: "Linguiça",
      quantidade: 2,
      unidade: "Kg",
      preco: 32,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqIBFu89ycyV81iDK3qNIO7Swnk1FYIVjxr4Ub-GBiLg&s",
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
      itens: "7 itens",
      total: "R$ 73,50",
    },
    {
      data: "14/08/2026",
      compra: "Compra do dia",
      itens: "5 itens",
      total: "R$ 125,20",
    },
    {
      data: "10/08/2026",
      compra: "Compra do dia",
      itens: "8 itens",
      total: "R$ 236,40",
    },
    {
      data: "05/08/2026",
      compra: "Compra do dia",
      itens: "6 itens",
      total: "R$ 189,80",
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
            Defina metas de orçamento mensais e acompanhe seus gastos em tempo
            real.
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
                <h1 className="text-sm font-bold w-full xl:text-xl">Gabriel</h1>
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
                  <div className="flex flex-col mb-3 gap-1">
                    <p className="text-[10px]">Orçamento</p>
                    <h1 className="font-medium text-green-700">R$ 200,00</h1>
                  </div>
                  <p className="text-[10px]">Valor definido</p>
                  <div className="mt-2 bg-gray-300 h-2 w-32 rounded-full">
                    <div
                      className="bg-green-700 h-full rounded-full"
                      style={{ width: "75.70%" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-xl p-4 w-fit min-w-40 shadow-black shadow-md/20 my-4">
                  <div className="flex flex-col mb-3 gap-1">
                    <p className="text-[10px]">Gasto até agora</p>
                    <h1 className="font-medium text-red-700">R$ 73,50</h1>
                  </div>
                  <p className="text-[10px]">36,75% do orçamento</p>
                  <div className="mt-2 bg-gray-300 h-2 w-32 rounded-full">
                    <div
                      className="bg-red-700 h-full rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-xl p-4 w-fit min-w-40 shadow-black shadow-md/20 my-4">
                  <div className="flex flex-col mb-3 gap-1">
                    <p className="text-[10px]">Restante</p>
                    <h1 className="font-medium text-green-700">R$ 126,50</h1>
                  </div>
                  <p className="text-[10px]">63,25% do orçamento</p>
                  <div className="mt-2 bg-gray-300 h-2 w-32 rounded-full">
                    {" "}
                    <div
                      className="h-full bg-green-700 rounded-full"
                      style={{ width: "68%" }}
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

                  <a href="" className="text-[12px] text-green-700 font-medium">
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
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-11 rounded-md object-cover border border-gray-300 shrink-0"
                      />

                      <div className="min-w-0">
                        <h1 className="text-sm font-medium truncate">
                          {item.name}
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
                      <h1 className="text-[10px] font-medium">{item.label}</h1>
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
                  <h1 className="font-bold text-sm">Histórico de compras</h1>
                  <button className="border text-sm border-gray-300 py-1 px-3 rounded-xl flex items-center gap-2">
                    Agosto de 2026{" "}
                    <span>
                      <ChevronDown className="size-4" />
                    </span>
                  </button>
                </div>

                <a className="text-[12px] text-green-700 font-medium" href="">
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
                          R$ 0
                        </p>
                      </section>
                      <section>
                        <h1 className="text-[12px]">Compras realizadas</h1>
                        <p className="font-medium">0</p>{" "}
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

                    <p className="text-sm text-gray-700 text-center">Compra</p>

                    <p className="text-sm text-gray-700 text-right">Itens</p>

                    <p className="text-sm text-gray-700 text-right">Total</p>
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
                <a className="text-[10px] text-green-700 font-medium" href="">
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
                        <h1 className="text-[10px] font-bold">{item.compra}</h1>
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

                <a className="text-[10px] text-green-700 font-medium" href="">
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
  );
}

export default InterfaceDesktop;
