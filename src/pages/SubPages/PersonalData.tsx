import React from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { Camera, Pencil, User, ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

function PersonalData() {
  return (
    <div>
      {/* <NavbarComponent label="Dados pessoais" bell={false} /> */}
      <header className="flex items-center justify-between">
        <NavLink
          to="/profile"
          className="flex h-10 w-fit items-center justify-center rounded-full cursor-pointer"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-6 text-gray-900" />
        </NavLink>
      </header>
      <div className="flex flex-col items-center mt-6">
        <div className="relative">
          <div className="bg-[#C7EAD5] p-4 rounded-full w-fit">
            <User className="size-18" />
          </div>
          <div className="bg-green-700 w-fit p-2 rounded-full absolute left-18 bottom-0.5">
            <Pencil className="size-4 text-white" />
          </div>
        </div>

        <section className="w-full flex flex-col gap-3">
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-gray-700">
              Nome completo
            </label>
            <input
              className="border border-gray-300 rounded-2xl py-3 w-full pl-4 hover:outline-green-700"
              type="text"
              placeholder="Digite seu Nome"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-700">
              E-mail
            </label>
            <input
              className="border border-gray-300 rounded-2xl py-3 w-full pl-4 hover:outline-green-700"
              type="email"
              placeholder="Digite seu E-mail"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-700">
              Telefone
            </label>
            <input
              className="border border-gray-300 rounded-2xl py-3 w-full pl-4 hover:outline-green-700"
              type="number"
              placeholder="Digite seu Número"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-700">
              CPF
            </label>
            <input
              className="border border-gray-300 rounded-2xl py-3 w-full pl-4 hover:outline-green-700"
              type="number"
              placeholder="Digite seu CPF"
            />
          </div>
        </section>

        <button className="bg-green-700 text-white w-full mt-8 py-4 rounded-xl">
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

export default PersonalData;
