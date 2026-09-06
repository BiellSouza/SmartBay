🛒 Mercado em Casa

Aplicação web desenvolvida em React + TypeScript para facilitar o controle de compras do dia a dia, permitindo registrar produtos, acompanhar gastos e visualizar o orçamento disponível de forma simples e intuitiva.

📌 Sobre o projeto

O Mercado em Casa foi criado pensando em uma situação comum: controlar os produtos comprados no mercado e, ao mesmo tempo, acompanhar quanto já foi gasto e quanto ainda está disponível dentro de um orçamento definido.

A proposta é transformar esse controle em uma experiência mais organizada, visual e prática do que uma anotação manual.

🎯 Objetivo

O principal objetivo do projeto é oferecer uma interface para:

Definir um orçamento para a compra;

Cadastrar produtos;

Informar preço, quantidade e unidade;

Adicionar uma imagem ao produto;

Calcular automaticamente o valor de cada item;

Calcular o total gasto;

Mostrar o valor restante do orçamento;

Visualizar o progresso do orçamento através de uma barra;

Editar o orçamento;

Editar e excluir produtos;

Manter os dados salvos no navegador;

Organizar a aplicação em diferentes áreas, como resumo, histórico, lista e perfil.

🛠️ Tecnologias utilizadas

React

Utilizado para construir a interface da aplicação através de componentes e para controlar o estado da aplicação.

Por que React?

Escolhi React por ser uma biblioteca muito utilizada no desenvolvimento de interfaces modernas e por trabalhar muito bem com componentes, estados e atualização dinâmica da tela.

TypeScript

Utilizado para adicionar tipagem ao projeto.

Por que TypeScript?

A tipagem ajuda a evitar erros durante o desenvolvimento e deixa mais claro quais dados cada parte da aplicação espera receber.

Um exemplo é a tipagem dos produtos:

export interface Product {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  unidade: string;
  imagem: string | null;
  dataCompra: string;
}

Vite

Utilizado como ferramenta de desenvolvimento e build do projeto.

Por que Vite?

Por oferecer inicialização rápida, desenvolvimento com atualização instantânea e uma configuração simples para projetos React + TypeScript.

Tailwind CSS

Utilizado para estilização da interface.

Por que Tailwind CSS?

A escolha foi feita pela praticidade de construir a interface diretamente através das classes utilitárias, facilitando a criação de layouts responsivos, espaçamentos, cores, bordas e componentes visuais.

React Router

Utilizado para estruturar a navegação entre as diferentes áreas da aplicação.

A aplicação foi pensada com páginas/seções como:

Resumo;

Histórico;

Lista;

Perfil.

Lucide React

Utilizado para os ícones da interface.

Entre os ícones utilizados estão ações e elementos como:

Menu;

Notificações;

Câmera;

Lixeira;

Edição;

Adicionar;

Navegação;

Perfil;

Histórico.

A biblioteca ajuda a manter uma identidade visual consistente e deixa a interface mais intuitiva.

Recharts

Utilizado na construção dos elementos gráficos relacionados ao histórico de compras.

A ideia é apresentar os dados de forma visual, facilitando a compreensão da evolução dos gastos.

LocalStorage

Utilizado para persistência dos dados no navegador.

O orçamento e os produtos cadastrados são armazenados no localStorage, permitindo que os dados continuem disponíveis mesmo depois de atualizar a página.

Exemplo:

useEffect(() => {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}, [produtos]);

Para recuperar os dados:

const produtosSalvos = localStorage.getItem("produtos");

return produtosSalvos ? JSON.parse(produtosSalvos) : [];

Por que JSON.stringify e JSON.parse?

O localStorage trabalha com valores em formato de texto.

Por isso:

JSON.stringify() transforma um objeto ou array em texto JSON;

JSON.parse() transforma esse texto novamente em objeto ou array JavaScript.

💰 Controle do orçamento

Uma das principais funcionalidades do projeto é o acompanhamento automático do orçamento.

O total gasto é calculado considerando o preço e a quantidade de cada produto:

const totalGasto = produtos.reduce((total, produto) => {
  return total + produto.preco * produto.quantidade;
}, 0);

O valor restante é calculado através da diferença entre o orçamento e o total gasto:

const valorRestante = orcamento - totalGasto;

Também existe uma barra de progresso que representa visualmente a porcentagem do orçamento utilizada:

const porcentagemGasta = Math.min(
  (totalGasto / orcamento) * 100,
  100
);

Dessa forma, a interface é atualizada automaticamente conforme novos produtos são adicionados ou removidos.

📦 Cadastro de produtos

Cada produto pode possuir informações como:

Nome;

Preço;

Quantidade;

Unidade;

Imagem;

Data da compra.

As unidades disponíveis incluem:

Unidade;

Kg;

Gramas;

Litro;

Mililitro.

O sistema também apresenta o valor total daquele produto:

const totalNovoProduto =
  Number(precoProduto) * Number(quantidadeProduto);

📷 Imagens dos produtos

A aplicação permite selecionar uma imagem através do dispositivo utilizando um campo de arquivo:

<input
  type="file"
  accept="image/*"
/>

A imagem selecionada é utilizada para apresentar uma prévia no formulário de cadastro.

✏️ Edição e exclusão

Os produtos cadastrados podem ser gerenciados diretamente pela interface.

Editar

O formulário é preenchido novamente com os dados do produto selecionado, permitindo alterar suas informações.

Excluir

Antes da exclusão, a aplicação solicita uma confirmação ao usuário para evitar remoções acidentais.

🧭 Estrutura da experiência

A interface foi pensada para funcionar como um aplicativo de compras, com navegação inferior e áreas separadas.

Resumo

Apresenta:

Orçamento;

Total gasto;

Valor restante;

Barra de progresso;

Itens da compra.

Histórico

Área destinada à visualização das compras realizadas e seus valores.

Lista

Espaço destinado à organização dos produtos.

Perfil

Área destinada às informações e configurações do usuário.

🎨 Interface

O projeto utiliza uma abordagem visual simples e focada em usabilidade.

A interface prioriza:

Cards;

Botões de ação;

Informações financeiras em destaque;

Ícones;

Feedback visual;

Navegação inferior;

Formulários objetivos;

Layout adaptado para uma experiência semelhante à de um aplicativo mobile.

🧠 Conceitos praticados

Durante o desenvolvimento foram utilizados diversos conceitos importantes do desenvolvimento front-end:

Componentização com React;

useState;

useEffect;

Props e tipagem com TypeScript;

Manipulação de arrays;

map();

filter();

reduce();

Eventos de formulário;

Inputs controlados;

Upload e pré-visualização de imagens;

Persistência com LocalStorage;

Cálculos em tempo real;

Navegação entre páginas;

Criação de interfaces responsivas;

Organização de estados da aplicação.

📂 Organização do projeto

Uma possível organização utilizada no projeto:

src/
├── types/
│   └── Product.ts
├── App.tsx
├── main.tsx
└── ...

A separação dos tipos permite manter as estruturas de dados organizadas e facilita a manutenção do código.

🚀 Como executar o projeto

Clone o repositório:

git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

Entre na pasta:

cd SEU-REPOSITORIO

Instale as dependências:

npm install

Execute o projeto:

npm run dev

Depois, acesse o endereço exibido pelo Vite no terminal.

📚 O que este projeto representa

Mais do que uma aplicação de controle de compras, este projeto representa uma etapa prática de aprendizado em desenvolvimento web.

Através dele, foram colocados em prática conceitos de React, TypeScript, gerenciamento de estado, persistência de dados, navegação, manipulação de formulários, cálculos dinâmicos e construção de interfaces.

O projeto também foi desenvolvido com foco em transformar uma necessidade real em uma solução digital simples e funcional.

🔮 Evolução do projeto

A arquitetura foi pensada de forma que o projeto possa evoluir futuramente para uma solução com:

Banco de dados;

Autenticação;

Sincronização entre dispositivos;

Armazenamento permanente de imagens;

Histórico real de compras;

Relatórios;

Categorias de produtos;

Compartilhamento entre usuários;

Integração com serviços externos.

👨‍💻 Autor

Desenvolvido por SEU NOME.

⭐ Se este projeto foi útil ou interessante para você, considere deixar uma estrela no repositório.
