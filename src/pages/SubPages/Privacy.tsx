import React from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

export default function Privacy() {
  const topics = [
    {
      number: 1,
      label: "Coleta de dados",
    },
    {
      number: 2,
      label: "Uso das informações",
    },
    {
      number: 3,
      label: "Compartilhamento de dados",
    },
    {
      number: 4,
      label: "Seus direitos",
    },
    {
      number: 5,
      label: "Segurança dos dados",
    },
  ];
  return (
    <div>
      <div>
        <NavbarComponent label="Política de privacidade" bell={false} />
      </div>

      <div className="bg-green-300/20 py-2 px-4 mt-7 flex flex-col rounded-2xl">
        <div className="bg-green-300/30 w-fit p-3 rounded-full m-auto">
          <ShieldCheck className="text-green-900" size={44} />
        </div>
        <div className="mt-3">
          <h1 className="font-bold text-[17px]">
            Sua privacidade é importante
          </h1>
          <p className="text-gray-700 text-[16px]">
            Confira como protegemos e utilizamos suas informações pessoais no
            nosso aplicativo.
          </p>
        </div>
      </div>
      <div className="mt-4">
        {topics.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 py-3 px-3 rounded-xl my-2"
          >
            <div className="flex justify-between items-center">
              <h1>
                {item.number}. {item.label}
              </h1>
              <ChevronRight className="size-6" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-[13px] text-center mt-7 font-medium">
        Última atualização: 10 de agosto de 2026
      </p>
    </div>
  );
}
