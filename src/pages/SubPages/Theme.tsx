import React, { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

type ThemeSelect = "light" | "dark";
function Theme() {
  const [theme, setTheme] = useState<ThemeSelect>("light");
  function SelectTheme() {
    alert("Theme selecionado!");
  }
  return (
    <div>
      <header className="flex items-center justify-between">
        <NavLink
          to="/profile"
          className="flex h-10 w-fit items-center justify-center rounded-full cursor-pointer"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-6 text-gray-900" />
        </NavLink>
      </header>
      <div>
        <h1 className="text-[18px] text-gray-900 font-medium mt-4 mb-4">
          Escolha o tema do aplicativo
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`flex justify-between items-center w-full px-6 py-4 rounded-2xl ${theme === "light" ? "border border-green-500 bg-green-500/10" : "border border-gray-500/30 p-2"}`}
          >
            <div className="flex gap-6 items-center">
              <Sun
                className={`size-8 ${theme === "light" ? "text-green-700" : "text-gray-300"}`}
              />{" "}
              <div className="text-start">
                <h1 className="font-bold">Claro</h1>
                <p className="text-sm text-gray-700">Fundo claro</p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 cursor-pointer ${
                theme === "light" ? "border-green-700" : "border-gray-300"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full ${
                  theme === "light" ? "bg-green-700" : "bg-gray-300"
                }`}
              />
            </div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex justify-between items-center w-full px-6 py-4 rounded-2xl ${theme === "dark" ? "border border-green-500 bg-green-500/10" : "border border-gray-500/30 p-2"}`}
          >
            <div className="flex gap-6 items-center">
              <Moon
                className={`size-8 ${theme === "dark" ? "text-green-700" : "text-gray-300"}`}
              />{" "}
              <div className="text-start">
                <h1 className="font-bold">Escuro</h1>
                <p className="text-sm text-gray-700">Fundo escuro</p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 cursor-pointer ${
                theme === "dark" ? "border-green-700" : "border-gray-300"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full ${
                  theme === "dark" ? "bg-green-700" : "bg-gray-300"
                }`}
              />
            </div>
          </button>
        </div>

        <button
          className="fixed bottom-4 left-6 right-6 bg-green-700 text-white rounded-2xl py-3"
          onClick={SelectTheme}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default Theme;
