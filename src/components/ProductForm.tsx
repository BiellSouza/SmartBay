import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Camera, ChevronDown } from "lucide-react";
import type { Product } from "../types/Product";

interface ProductFormProps {
  produtoEditando: Product | null;
  onSalvar: (produto: Product) => void;
  onFechar: () => void;
}

function ProductForm({
  produtoEditando,
  onSalvar,
  onFechar,
}: ProductFormProps) {
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState("");
  const [unidadeProduto, setUnidadeProduto] = useState("");
  const [fotoProduto, setFotoProduto] = useState<string | null>(null);

  // Preenche o formulário quando for edição
  useEffect(() => {
    if (produtoEditando) {
      setNomeProduto(produtoEditando.nome);
      setPrecoProduto(produtoEditando.preco.toString());
      setQuantidadeProduto(produtoEditando.quantidade.toString());
      setUnidadeProduto(produtoEditando.unidade);
      setFotoProduto(produtoEditando.imagem || null);
    } else {
      limparFormulario();
    }
  }, [produtoEditando]);

  function limparFormulario() {
    setNomeProduto("");
    setPrecoProduto("");
    setQuantidadeProduto("");
    setUnidadeProduto("");
    setFotoProduto(null);
  }

  // Converte a imagem para Base64
  function converterImagemParaBase64(arquivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;

      reader.readAsDataURL(arquivo);
    });
  }

  async function selecionarImagem(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    const imagemBase64 = await converterImagemParaBase64(arquivo);

    setFotoProduto(imagemBase64);
  }

  function salvarProduto() {
    if (
      !nomeProduto ||
      !precoProduto ||
      !quantidadeProduto ||
      !unidadeProduto
    ) {
      alert("Preencha todos os campos para salvar o Produto");
      return;
    }

    const produto: Product = {
      id: produtoEditando?.id ?? Date.now(),
      nome: nomeProduto,
      preco: Number(precoProduto),
      quantidade: Number(quantidadeProduto),
      unidade: unidadeProduto,
      imagem: fotoProduto,
      dataCompra: produtoEditando?.dataCompra ?? new Date().toISOString(),
    };

    onSalvar(produto);

    if (produtoEditando) {
      alert(`Produto atualizado com sucesso: ${produto.nome}`);
    } else {
      alert(`Produto salvo com sucesso: ${produto.nome}`);
    }

    limparFormulario();
    onFechar();
  }

  const totalNovoProduto = Number(precoProduto) * Number(quantidadeProduto);

  return (
    <div className="fixed inset-0 overflow-y-auto p-6 bg-white">
      <div className="flex justify-between">
        <button onClick={onFechar}>
          <ArrowLeft />
        </button>

        <h1 className="text-lg font-medium">
          {produtoEditando ? "Editar produto" : "Adicionar produto"}
        </h1>

        <Bell className="opacity-0" />
      </div>

      {/* FOTO */}
      <label className="flex flex-col text-center mt-6 p-10 border border-dashed rounded-xl cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={selecionarImagem}
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

            <h1 className="text-green-700 font-medium mt-2">Adicionar foto</h1>

            <p className="text-gray-600">ou toque para selecionar</p>
          </>
        )}
      </label>

      {/* NOME */}
      <div className="mt-6">
        <h1 className="text-[14px] font-medium mb-2">Nome do produto</h1>

        <input
          type="text"
          placeholder="Ex: Carne bovina"
          value={nomeProduto}
          onChange={(event) => setNomeProduto(event.target.value)}
          className="outline-none border border-gray-300 bg-white p-4 rounded-xl w-full"
        />
      </div>

      {/* PREÇO E QUANTIDADE */}
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
            onChange={(event) => setQuantidadeProduto(event.target.value)}
            className="outline-none border border-gray-300 bg-white p-4 rounded-xl w-full"
          />
        </div>
      </div>

      {/* UNIDADE */}
      <div className="w-full max-w-md mt-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Unidade
        </label>

        <div className="relative">
          <select
            className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={unidadeProduto}
            onChange={(event) => setUnidadeProduto(event.target.value)}
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

        {/* RESUMO */}
        <div className="border border-gray-300 rounded-xl mt-8 p-4 flex flex-col justify-between gap-6">
          <h1 className="font-medium text-[18px]">Resumo</h1>

          <div className="flex justify-between">
            <p>Total</p>

            <h1 className="text-xl font-bold text-green-700">
              R$ {totalNovoProduto.toFixed(2)}
            </h1>
          </div>
        </div>

        {/* SALVAR */}
        <button
          className="bg-green-700 py-2.5 gap-2 rounded-xl w-full text-white flex justify-center mt-10 mb-24"
          onClick={salvarProduto}
        >
          <p>{produtoEditando ? "Salvar alterações" : "Salvar produto"}</p>
        </button>
      </div>
    </div>
  );
}

export default ProductForm;
