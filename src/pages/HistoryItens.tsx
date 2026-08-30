import { useState } from "react";
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

function HistoryItens() {
  // Visualizar Histórico
  const [abaAtiva, setAbaAtiva] = useState<"compras" | "resumo">("compras");

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

  // Compras
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
    {
      id: 4,
      titulo: "Compra do dia",
      data: "10/08/2026",
      itens: 8,
      valor: 236.4,
    },
    {
      id: 5,
      titulo: "Compra do dia",
      data: "10/08/2026",
      itens: 8,
      valor: 236.4,
    },
  ];

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
      <div className="flex w-fit justify-between bg-green-100 rounded-full py-1.5 px-2 gap-4 items-center mx-auto mt-4 mb-3">
        <p className="text-sm text-green-700">Agosto de 2026</p>

        <span>
          <ChevronDown size={16} className="text-green-700" />
        </span>
      </div>

      {/* RESUMO DO MÊS */}
      <div className="p-4 flex rounded-xl border border-t-0 border-gray-200 bg-white shadow-lg shadow-gray-300/30">
        {/* INFORMAÇÕES */}
        <div className="flex flex-col gap-3 w-[50%]">
          <section>
            <h1 className="text-[12px]">Total gasto no mês</h1>

            <p className="text-[23px] text-green-700 font-medium">R$ 847,30</p>
          </section>

          <section>
            <h1 className="text-[12px]">Compras realizadas</h1>

            <p className="font-medium">12</p>
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
          {compras.map((compra) => (
            <div
              key={compra.id}
              className="flex items-center justify-between rounded-xl bg-white p-4 border border-gray-200"
            >
              {/* ÍCONE E INFORMAÇÕES */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <ShoppingBag className="text-green-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">
                    {compra.titulo}
                  </h3>

                  <p className="text-[11px] text-slate-500">
                    {compra.data} • {compra.itens} itens
                  </p>
                </div>
              </div>

              {/* VALOR */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-700">
                  {compra.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <span className="text-slate-400 pt-2">
                  <NavLink to="/myList" className="cursor-pointer">
                    <ChevronRight />
                  </NavLink>
                </span>
              </div>
            </div>
          ))}
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
