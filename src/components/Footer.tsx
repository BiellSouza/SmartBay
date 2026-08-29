import React from "react";
import { Home, Clock, Calculator, User } from "lucide-react";

function Footer() {
  const itensRodape = [
    {
      item: <Home />,
      text: "Resumo",
      link: "",
    },
    {
      item: <Clock />,
      text: "Histórico",
      link: "",
    },
    {
      item: <Calculator />,
      text: "Calculadora",
      link: "",
    },
    {
      item: <User />,
      text: "Perfil",
      link: "",
    },
  ];
  return (
    <div className="fixed bottom-4 left-4 right-4 w-auto rounded-2xl bg-white px-6 py-3 shadow-lg">
      <section className="flex justify-between w-full">
        {itensRodape.map((item, index) => (
          //   <div key={index} className="flex flex-col items-center">
          //     <span>{item.item}</span>
          //     <p>{item.text}</p>
          //   </div>
          <a
            key={index}
            className="flex flex-col items-center"
            target="_blank"
            href={item.link}
          >
            {item.item} <p>{item.text}</p>
          </a>
        ))}
      </section>
    </div>
  );
}

export default Footer;
