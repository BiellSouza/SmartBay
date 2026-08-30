import {
  ChevronRight,
  Crown,
  HelpCircle,
  LogOut,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Profile() {
  const [usuario, setUsuario] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", 1)
        .single();

      // console.log("USUÁRIO:", data);
      // console.log("ERRO:", error);

      if (error) {
        console.error("Erro ao carregar usuário:", error);
        setCarregando(false);
        return;
      }

      setUsuario(data);
      setCarregando(false);
    }

    carregarUsuario();
  }, []);
  const infos = [
    {
      icon: <User className="size-5" />,
      label: "Dados pessoais",
      link: "/personaldata",
    },
    // {
    //   icon: <MapPin className="size-5" />,
    //   label: "Endereços",
    //   link: "",
    // },
    // {
    //   icon: <Bell className="size-5" />,
    //   label: "Notificações",
    //   link: "",
    // },
    {
      icon: <Sun className="size-5" />,
      label: "Tema",
      link: "/theme",
    },
  ];

  const suport = [
    {
      icon: <HelpCircle className="size-5" />,
      label: "Dados pessoais",
      link: "/support",
    },
    {
      icon: <ShieldCheck className="size-5" />,
      label: "Política de privacidade",
      link: "/privacy",
    },
  ];
  return (
    <div>
      {/* <NavbarComponent label="Meu perfil" />{" "} */}
      <div className="mt-4 mb-24">
        <section>
          <div className="bg-green-300/10 px-2 py-4 flex justify-between items-center">
            <div className="relative">
              <div className="bg-green-500 p-1.5 rounded-full w-fit overflow-hidden">
                {usuario?.foto ? (
                  <img
                    src={usuario.foto}
                    alt="Foto de perfil"
                    className="size-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="size-18" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold">{usuario?.nome}</h1>
              <h2 className="text-sm truncate w-36">{usuario?.email}</h2>
              <p className="bg-green-300/30 text-green-900 mt-1.5 font-medium text-sm py-1 px-2 rounded-full flex items-center w-fit gap-2">
                <span>
                  {" "}
                  <Crown className="size-4" />
                </span>{" "}
                Usuário Premium
              </p>
            </div>
            <NavLink to="/personaldata">
              <ChevronRight />
            </NavLink>
          </div>
        </section>

        <section className="mt-4">
          <h1 className="font-bold">Informações da conta</h1>
          <div className="mt-3 border border-gray-300 w-full py-1 px-3 rounded-xl">
            {infos.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-300/80"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-300/30 w-fit p-2 rounded-full text-green-800">
                    {item.icon}
                  </div>
                  <p className="text-sm">{item.label}</p>
                </div>
                <button>
                  <ChevronRight className="text-gray-600" />
                </button>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <h1 className="font-bold">Ajuda e suporte</h1>
          <div className="mt-3 border border-gray-300 w-full py-1 px-3 rounded-xl">
            {suport.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-300/80"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-300/30 w-fit p-2 rounded-full text-green-800">
                    {item.icon}
                  </div>
                  <p className="text-sm">{item.label}</p>
                </div>
                <button>
                  <ChevronRight className="text-gray-600" />
                </button>
              </NavLink>
            ))}
          </div>
        </section>

        <button className="flex items-center gap-2 text-red-700 border border-red-500 w-full py-2 justify-center rounded-xl text-sm mt-4">
          <span>
            <LogOut className="size-5" />
          </span>
          <p>Sair da conta</p>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
