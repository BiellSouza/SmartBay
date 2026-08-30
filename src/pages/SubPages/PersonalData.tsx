import { Pencil, User, ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useRef } from "react";

function PersonalData() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [foto, setFoto] = useState<string | null>(null);

  const inputFotoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function carregarUsuario() {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Erro ao carregar usuário:", error);
        setCarregando(false);
        return;
      }

      setNome(data.nome ?? "");
      setEmail(data.email ?? "");
      setTelefone(data.telefone ?? "");
      setFoto(data.foto ?? null);

      setCarregando(false);
    }

    carregarUsuario();
  }, []);

  async function salvarAlteracoes() {
    console.log("DADOS ENVIADOS:", {
      nome,
      email,
      telefone,
    });

    const { data, error } = await supabase
      .from("users")
      .update({
        nome,
        email,
        telefone,
      })
      .eq("id", 1)
      .select();

    console.log("RETORNO DO UPDATE:", data);
    console.log("ERRO DO UPDATE:", error);

    if (error) {
      console.error("Erro ao atualizar usuário:", error);
      return;
    }

    if (!data || data.length === 0) {
      console.error("Nenhum usuário foi atualizado.");
      alert("Nenhum usuário encontrado com esse ID.");
      return;
    }

    alert("Dados atualizados com sucesso!");
  }

  useEffect(() => {
    async function testarUsuario() {
      const { data, error } = await supabase.from("users").select("*");

      console.log("USUÁRIOS:", data);
      console.log("ERRO:", error);
    }

    testarUsuario();
  }, []);

  async function selecionarFoto(arquivo: File) {
    try {
      // Nome único para o arquivo
      const nomeArquivo = `usuario-${Date.now()}-${arquivo.name}`;

      // Upload para o Storage
      const { error: uploadError } = await supabase.storage
        .from("fotos")
        .upload(nomeArquivo, arquivo);

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        return;
      }

      // Pega a URL pública
      const { data } = supabase.storage.from("fotos").getPublicUrl(nomeArquivo);

      const urlFoto = data.publicUrl;

      console.log("URL DA FOTO:", urlFoto);

      // Salva a URL na tabela users
      const { data: usuarioAtualizado, error: updateError } = await supabase
        .from("users")
        .update({
          foto: urlFoto,
        })
        .eq("id", 1)
        .select();

      if (updateError) {
        console.error("Erro ao salvar foto no usuário:", updateError);
        return;
      }

      console.log("USUÁRIO ATUALIZADO:", usuarioAtualizado);

      // Atualiza a tela imediatamente
      setFoto(urlFoto);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

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
          <div className="bg-green-800 p-2 rounded-full w-fit overflow-hidden">
            {foto ? (
              <img
                src={foto}
                alt="Foto de perfil"
                className="size-24 rounded-full object-cover"
              />
            ) : (
              <User className="size-18" />
            )}
          </div>
          <button
            type="button"
            onClick={() => inputFotoRef.current?.click()}
            className="bg-green-700 w-fit p-2 rounded-full absolute left-18 bottom-0.5"
          >
            <Pencil className="size-4 text-white" />
          </button>

          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const arquivo = e.target.files?.[0];

              if (!arquivo) return;

              selecionarFoto(arquivo);
            }}
          />
        </div>

        <section className="w-full flex flex-col gap-3">
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-gray-700">
              Nome completo
            </label>
            <input
              className="border border-gray-300 rounded-2xl py-3 w-full pl-4 hover:outline-green-700"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite seu Número"
            />
          </div>
        </section>

        <button
          onClick={salvarAlteracoes}
          className="bg-green-700 text-white w-full mt-8 py-4 rounded-xl"
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

export default PersonalData;
