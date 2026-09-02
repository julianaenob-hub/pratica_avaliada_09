# 🎮 Loja de Games — Front-End

<div align="center">

### 🕹️ Uma experiência gamer completa para comprar, explorar e gerenciar seus jogos favoritos.

Aplicação **e-commerce** desenvolvida com **React + TypeScript + Tailwind CSS**, integrada a uma API REST para gerenciamento de produtos, categorias e usuários.

<br>

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

</div>

---

## 🎮 Sobre o Projeto

A **Loja de Games** é uma aplicação web de e-commerce voltada para o universo gamer.

O projeto permite que usuários naveguem pelo catálogo de **jogos, consoles e acessórios**, organizem produtos por categorias, criem uma conta, realizem login e gerenciem seu perfil.

Além disso, a aplicação conta com um **carrinho de compras completo**, permitindo adicionar produtos, alterar quantidades e acompanhar automaticamente o valor total da compra.

O projeto foi desenvolvido com foco em:

* 🧩 Componentização
* 📱 Responsividade
* 🔐 Autenticação
* 🛒 Gerenciamento de estado
* 🔄 Consumo de API REST
* 📦 Organização e reutilização de componentes

---

## 🚀 Funcionalidades

### 🎮 Catálogo de Produtos

* 📋 Listagem de jogos, consoles e acessórios
* ➕ Cadastro de produtos
* ✏️ Edição de produtos
* 🗑️ Remoção de produtos
* 🔎 Organização e visualização do catálogo

### 🏷️ Categorias

* ➕ Cadastro de categorias
* ✏️ Edição de categorias
* 🗑️ Remoção de categorias
* 📋 Listagem de categorias
* 🎯 Organização por gênero ou plataforma

Exemplos:

`Ação` • `RPG` • `PS5` • `Xbox` • `PC` • `Nintendo`

### 🕹️ Autenticação & Perfil

* 🔐 Login de usuários
* 📝 Cadastro de novos usuários
* 🎟️ Autenticação utilizando **JWT**
* 👤 Visualização do perfil
* ✏️ Edição dos dados do usuário
* 🖼️ Atualização de avatar
* 🔑 Alteração de senha
* 🛡️ Proteção de funcionalidades restritas

### 🛒 Carrinho de Compras

* ➕ Adicionar produtos ao carrinho
* ➖ Remover produtos
* 🔢 Alterar quantidade de itens
* 💰 Cálculo automático do valor total
* 🧹 Gerenciamento dos produtos adicionados

---

## 🛠️ Tecnologias

| Tecnologia              | Utilização                           |
| ----------------------- | ------------------------------------ |
| ⚛️ **React**            | Construção da interface              |
| 🔷 **TypeScript**       | Tipagem e segurança do código        |
| ⚡ **Vite**              | Build e desenvolvimento da aplicação |
| 🎨 **Tailwind CSS**     | Estilização e responsividade         |
| 🧭 **React Router DOM** | Rotas e navegação                    |
| 🔄 **Axios**            | Comunicação com a API REST           |
| 🌐 **Context API**      | Gerenciamento de estado global       |
| 🔐 **JWT**              | Autenticação de usuários             |

---

## 📂 Estrutura do Projeto

```text
src/
│
├── assets/
│   └── Imagens, banners e ícones
│
├── components/
│   ├── categoria/
│   │   └── Componentes do CRUD de categorias
│   │
│   ├── produto/
│   │   └── Componentes do CRUD de produtos
│   │
│   ├── footer/
│   │   └── Rodapé da aplicação
│   │
│   └── navbar/
│       └── Barra de navegação
│
├── contexts/
│   ├── AuthContext
│   └── CartContext
│
├── models/
│   ├── Produto
│   ├── Categoria
│   └── Usuario
│
├── pages/
│   ├── Home
│   ├── Login
│   ├── Cadastro
│   ├── Perfil
│   └── Carrinho
│
├── services/
│   └── Configuração das requisições HTTP
│
├── App.tsx
│   └── Rotas e Providers
│
└── main.tsx
    └── Ponto de entrada da aplicação
```

---

## 🔄 Arquitetura da Aplicação

A aplicação utiliza uma estrutura baseada em componentes e separação de responsabilidades:

```text
                ┌──────────────────┐
                │      Usuário     │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   React / Pages  │
                └────────┬─────────┘
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
       🔐 Auth       🛒 Cart      🎮 Products
            │            │            │
            └────────────┼────────────┘
                         ▼
                ┌──────────────────┐
                │      Axios       │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    REST API      │
                └──────────────────┘
```

---

## 💻 Como Executar o Projeto

### 1️⃣ Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2️⃣ Acesse a pasta

```bash
cd nome-do-projeto
```

### 3️⃣ Instale as dependências

```bash
npm install
```

### 4️⃣ Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite no terminal.

---

## 🌐 Integração com API

O Front-End realiza comunicação com uma **API REST**, utilizando **Axios** para:

* 🎮 Gerenciamento de produtos
* 🏷️ Gerenciamento de categorias
* 👤 Gerenciamento de usuários
* 🔐 Autenticação
* 🛒 Operações relacionadas ao carrinho

---

## 📸 Preview

> 💡 Adicione aqui screenshots ou GIFs da aplicação para mostrar as principais telas do projeto.

```text
🏠 Home
🔐 Login
📝 Cadastro
🎮 Produtos
🏷️ Categorias
👤 Perfil
🛒 Carrinho
```

---

## 👩‍💻 Desenvolvido por

**Juliana Vitória**

Projeto desenvolvido como parte da formação em **Desenvolvimento Full Stack**, colocando em prática conceitos de:

**React • TypeScript • Tailwind CSS • API REST • Git • GitHub • Autenticação • CRUD**

---

<div align="center">

### 🎮 Game on! 🚀

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório!

</div>

