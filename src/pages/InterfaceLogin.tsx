import React from "react";
import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import ProductForm from "../components/ProductForm";
import {
  Pencil,
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
  Calculator,
} from "lucide-react";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import { supabase } from "../services/supabase";

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

  return (
    <div>
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
          <p className="font-bold text-md">Itens da compra</p>{" "}
          <button className="text-green-700 text-sm">Ver todos</button>
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
                    item.id === produtoAtualizado.id ? produtoAtualizado : item,
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
  );
}

export default InterfaceLogin;
