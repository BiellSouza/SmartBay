import React from "react";
import { Home, Clock, Calculator, User } from "lucide-react";
import { NavLink } from "react-router-dom";

function Footer() {
  const itensRodape = [
    {
      item: <Home />,
      text: "Resumo",
      link: "/",
    },
    {
      item: <Clock />,
      text: "Histórico",
      link: "/history",
    },
    {
      item: <Calculator />,
      text: "Calculadora",
      link: "/calculator",
    },
    {
      item: <User />,
      text: "Perfil",
      link: "/profile",
    },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 w-auto rounded-2xl bg-white px-6 pb-3 pt-4 shadow-lg">
      <hr className="mb-4 opacity-30" />
      <section className="flex justify-between w-full">
        {itensRodape.map((item, index) => (
          <NavLink
            to={item.link}
            key={index}
            className={({ isActive }) =>
              `${isActive ? "text-green-700" : "text-gray-700"}`
            }
          >
            <div className="flex justify-center">{item.item}</div>{" "}
            <p className="text-sm mt-1">{item.text}</p>
          </NavLink>
        ))}
      </section>
    </div>
  );
}

export default Footer;
