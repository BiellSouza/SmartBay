import { ArrowLeft, Receipt, ShoppingBag } from "lucide-react";

const produtos = [
  {
    nome: "Carne bovina",
    quantidade: "1,20 kg",
    valor: "R$ 51,48",
  },
  {
    nome: "Arroz branco",
    quantidade: "2 un.",
    valor: "R$ 16,00",
  },
  {
    nome: "Frango",
    quantidade: "1,00 kg",
    valor: "R$ 25,00",
  },
  {
    nome: "Tomate",
    quantidade: "0,80 kg",
    valor: "R$ 8,00",
  },
  {
    nome: "Banana",
    quantidade: "1,00 kg",
    valor: "R$ 6,50",
  },
  {
    nome: "Leite",
    quantidade: "2 un.",
    valor: "R$ 5,00",
  },
  {
    nome: "Pão francês",
    quantidade: "6 un.",
    valor: "R$ 12,00",
  },
];

function ListItens() {
  return (
    <div className="bg-white px-2 py-2">
      <div className="mx-auto w-full max-w-md">
        {/* CABEÇALHO */}
        <header className="flex items-center justify-between">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer"
            aria-label="Voltar"
          >
            <ArrowLeft className="size-6 text-gray-900" />
          </button>

          <h1 className="text-xl font-bold text-gray-900">Detalhe da compra</h1>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer"
            aria-label="Recibo"
          >
            <Receipt className="size-6 text-gray-900" />
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
                <h2 className="text-[13px] font-bold text-gray-900">
                  Compra do dia
                </h2>

                <p className="mt-1 text-[14px] text-gray-700">
                  18/08/2026
                  <span className="mx-2">
                    {" "}
                    <br />
                  </span>
                  7 itens
                </p>
              </div>
            </div>

            <strong className="whitespace-nowrap text-[15px] font-bold text-green-700">
              R$ 73,50
            </strong>
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
                <p className="text-right text-[16px] font-semibold text-green-700">
                  {produto.valor}
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

            <strong className="text-[20px] font-bold text-white">
              R$ 73,50
            </strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListItens;
