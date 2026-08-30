import { useEffect, useState } from "react";
import {
  Menu,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import Footer from "../components/Footer";
import NavbarComponent from "../components/NavbarComponent";
import { NavLink } from "react-router-dom";
import { supabase } from "../services/supabase";

function HistoryItens() {
  // Visualizar Histórico
  const [abaAtiva, setAbaAtiva] = useState<"compras" | "resumo">("compras");

  const [produtos, setProdutos] = useState<Product[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState(8);
  const [anoSelecionado, setAnoSelecionado] = useState(2026);
  const [seletorAberto, setSeletorAberto] = useState(false);

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

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

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("data_compra", { ascending: false });

      // console.log("DADOS DO SUPABASE:", data);
      // console.log("ERRO DO SUPABASE:", error);

      if (error) {
        console.error("Erro ao carregar histórico:", error);
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

  // console.log("TODOS OS PRODUTOS:", produtos);

  produtos.forEach((produto) => {
    // console.log(
    //   "DATA DO PRODUTO:",
    //   produto.dataCompra,
    //   "→",
    //   produto.dataCompra?.substring(0, 7),
    // );
  });
  const produtosDoMes = produtos.filter((produto) => {
    if (!produto.dataCompra) return false;

    const mesAnoProduto = produto.dataCompra.substring(0, 7);

    const mesAnoSelecionado = `${anoSelecionado}-${String(
      mesSelecionado,
    ).padStart(2, "0")}`;

    return mesAnoProduto === mesAnoSelecionado;
  });

  const totalMes = produtosDoMes.reduce(
    (soma, produto) => soma + produto.preco * produto.quantidade,
    0,
  );

  const comprasPorDia = produtosDoMes.reduce(
    (grupos, produto) => {
      if (!produto.dataCompra) return grupos;

      const chaveData = produto.dataCompra.substring(0, 10);

      if (!grupos[chaveData]) {
        grupos[chaveData] = [];
      }

      grupos[chaveData].push(produto);

      return grupos;
    },
    {} as Record<string, Product[]>,
  );

  function formatarData(data: string) {
    const [ano, mes, dia] = data.substring(0, 10).split("-");

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div>
      {/* CABEÇALHO */}
      {/* <NavbarComponent label="Histórico de compra" /> */}
      <header className="flex items-center justify-between">
        <NavLink
          to="/"
          className="flex h-10 w-fit items-center justify-center rounded-full cursor-pointer"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-6 text-gray-900" />
        </NavLink>
      </header>
      {/* SELETOR DE MÊS */}
      <div className="relative mx-auto mt-4 mb-3 w-fit">
        <button
          onClick={() => setSeletorAberto(!seletorAberto)}
          className="flex items-center gap-4 rounded-full bg-green-100 px-3 py-1.5"
        >
          <p className="text-sm text-green-700">
            {meses[mesSelecionado - 1]} de {anoSelecionado}
          </p>

          <ChevronDown
            size={16}
            className={`text-green-700 transition-transform ${
              seletorAberto ? "rotate-180" : ""
            }`}
          />
        </button>

        {seletorAberto && (
          <div className="absolute left-1/2 z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
            <div className="grid grid-cols-3 gap-2">
              {meses.map((mes, index) => {
                const numeroMes = index + 1;

                return (
                  <button
                    key={mes}
                    onClick={() => {
                      setMesSelecionado(numeroMes);
                      setSeletorAberto(false);
                    }}
                    className={`rounded-xl px-2 py-2 text-xs ${
                      mesSelecionado === numeroMes
                        ? "bg-green-700 text-white"
                        : "text-gray-600 hover:bg-green-50"
                    }`}
                  >
                    {mes}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* RESUMO DO MÊS */}
      <div className="p-4 flex rounded-xl border border-t-0 border-gray-200 bg-white shadow-lg shadow-gray-300/30">
        {/* INFORMAÇÕES */}
        <div className="flex flex-col gap-3 w-[50%]">
          <section>
            <h1 className="text-[12px]">Total gasto no mês</h1>

            <p className="text-[23px] text-green-700 font-medium">
              R$ {totalMes.toFixed(2)}
            </p>
          </section>

          <section>
            <h1 className="text-[12px]">Compras realizadas</h1>
            <p className="font-medium">
              {Object.keys(comprasPorDia).length}
            </p>{" "}
          </section>
        </div>

        {/* GRÁFICO */}
        <div className="w-[60%]">
          <div className="w-full h-full rounded-2xl border border-gray-200 bg-white p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dados}>
                <defs>
                  <linearGradient id="corGrafico" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2f6b4f" stopOpacity={0.15} />

                    <stop offset="100%" stopColor="#2f6b4f" stopOpacity={0} />
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

      {/* ABAS */}
      <div className="mt-2">
        <div className="flex justify-between">
          <button
            onClick={() => setAbaAtiva("compras")}
            className={`p-3 text-[12px] w-42 ${
              abaAtiva === "compras"
                ? "text-green-700 border-b-2 border-green-700"
                : "text-gray-500"
            }`}
          >
            Compras
          </button>

          <button
            onClick={() => setAbaAtiva("resumo")}
            className={`p-3 text-[12px] w-42 ${
              abaAtiva === "resumo"
                ? "text-green-700 border-b-2 border-green-700"
                : "text-gray-500"
            }`}
          >
            Resumo por categoria
          </button>
        </div>
      </div>

      {/* LISTA DE COMPRAS */}
      {abaAtiva === "compras" && (
        <div className="space-y-3 mt-4 mb-22">
          {Object.entries(comprasPorDia).map(([data, produtosDoDia]) => {
            const total = produtosDoDia.reduce(
              (soma, produto) => soma + produto.preco * produto.quantidade,
              0,
            );

            return (
              <div
                key={data}
                className="flex items-center justify-between rounded-xl bg-white p-4 border border-gray-200"
              >
                {/* ÍCONE E INFORMAÇÕES */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <ShoppingBag className="text-green-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      Compra do dia
                    </h3>

                    <p className="text-[11px] text-slate-500">
                      {formatarData(data)} • {produtosDoDia.length} itens
                    </p>
                  </div>
                </div>

                {/* VALOR */}
                <div className="flex items-center gap-2">
                  R$ {total.toFixed(2)}
                  <span className="text-slate-400 pt-2">
                    <NavLink
                      to={`/myList?data=${data}`}
                      className="cursor-pointer"
                    >
                      <ChevronRight />
                    </NavLink>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RESUMO POR CATEGORIA */}
      {abaAtiva === "resumo" && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Resumo por categoria</p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HistoryItens;
