import { ArrowLeft, Receipt, ShoppingBag } from "lucide-react";
import { data, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import type { Product } from "../types/Product";

function ListItens() {
  const [searchParams] = useSearchParams();

  const dataSelecionada = searchParams.get("data");

  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      if (!dataSelecionada) return;

      const inicio = new Date(`${dataSelecionada}T00:00:00`);

      const fim = new Date(inicio);
      fim.setDate(fim.getDate() + 1);

      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .gte("data_compra", inicio.toISOString())
        .lt("data_compra", fim.toISOString())
        .order("data_compra", { ascending: true });

      if (error) {
        console.error("Erro:", error);
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
  }, [dataSelecionada]);

  const total = produtos.reduce(
    (soma, produto) => soma + produto.preco * produto.quantidade,
    0,
  );

  return (
    <div className="bg-white px-2 py-2">
      <div className="mx-auto w-full max-w-md">
        {/* CABEÇALHO */}
        <header className="flex items-center justify-between">
          <NavLink
            to="/history"
            className="flex h-10 w-fit items-center justify-center rounded-full cursor-pointer"
            aria-label="Voltar"
          >
            <ArrowLeft className="size-6 text-gray-900" />
          </NavLink>

          <h1 className="text-xl font-bold text-gray-900">Detalhe da compra</h1>

          <button
            className="flex h-10 w-fit items-center justify-center rounded-full cursor-pointer"
            aria-label="Recibo"
          >
            <Receipt className="size-6 text-green-600" />
          </button>
        </header>

        {/* RESUMO DA COMPRA */}
        <section className="mt-7 rounded-[22px] border border-green-100 bg-green-50/70 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                <ShoppingBag className="size-6 text-green-700" />
              </div>

              <div>
                <h2 className="text-md font-bold text-gray-900">
                  Compra do dia
                </h2>

                <p className="mt-1 text-[14px] text-gray-700 flex">
                  {dataSelecionada}
                  <span className="mx-2"> - </span>
                  {produtos.length} itens
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CABEÇALHO DA LISTA */}
        <section className="mt-7">
          <div className="grid grid-cols-[1fr_100px_100px] px-5">
            <p className="text-[15px] font-medium text-gray-500">Item</p>

            <p className="text-center text-[15px] font-medium text-gray-500">
              Qtd
            </p>

            <p className="text-right text-[15px] font-medium text-gray-500">
              Valor
            </p>
          </div>

          {/* PRODUTOS */}
          <div className="mt-3 space-y-3">
            {produtos.map((produto, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_100px_100px] items-center rounded-[18px] border border-gray-200 bg-white px-5 py-4"
              >
                {/* NOME */}
                <p className="text-[16px] font-semibold text-gray-900">
                  {produto.nome}
                </p>

                {/* QUANTIDADE */}
                <p className="text-center text-[15px] text-gray-900">
                  {produto.quantidade}
                </p>

                {/* VALOR */}
                <p className="text-right text-[14px] font-semibold text-green-700">
                  R$ {(produto.preco * produto.quantidade).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TOTAL */}
        <section className="mt-8 mb-18">
          <div className="flex items-center justify-between rounded-[20px] bg-green-700 px-6 py-5">
            <span className="text-[17px] font-medium text-white">
              Total pago
            </span>

            <strong className="whitespace-nowrap text-[15px] font-bold text-white">
              R$ {total.toFixed(2)}
            </strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListItens;
