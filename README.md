# 📦 Gerenciador de Produtos SPA

## 📝 Descrição do Projeto
O Projeto 1 da disciplina de Programação Web Full Stack consiste no desenvolvimento da camada Frontend de uma aplicação web utilizando React.js e AJAX. 

A aplicação foi construída seguindo o conceito de Single Page Application (SPA), garantindo que a interface seja atualizada de forma assíncrona e fluida, sem recarregamento da página. O sistema implementa um CRUD funcional focado no gerenciamento de produtos, consumindo uma API JSON externa.

## 👥 Equipe
- **Giovane Soldera Ribeiro** (Responsável por: [ex: Configuração da API, Listagem e Filtros])
- **Carlos Eduardo** (Responsável por: [ex: Formulários de Cadastro/Edição e Layout])

## 🛠️ Tecnologias e Requisitos Atendidos
- **Framework Principal:** React.js (com Vite)
- **API JSON Aberta:** [DummyJSON](https://dummyjson.com/) (Utilizada para consumir e simular dados de produtos).
- **Hook Utilizado:** `useMemo` (Utilizado para otimizar a filtragem e pesquisa de produtos, memorizando os resultados e evitando re-renderizações desnecessárias).
- **Biblioteca Externa:** [React Bootstrap](https://react-bootstrap.github.io/) (Utilizada para a construção rápida de uma interface responsiva, com uso de Cards, Modais, Tabelas e Formulários).

## 🚀 Funcionalidades
- **Consulta de produtos:** Listagem geral e visualização de detalhes (GET).
- **Pesquisa e filtros:** Busca de produtos por nome e organização por categorias.
- **Cadastro:** Formulário para criação de novos produtos (POST simulado).
- **Edição:** Alteração das informações de um produto existente (PUT/PATCH simulado).
- **Exclusão:** Remoção de um produto da listagem (DELETE simulado).

## 🤖 Uso de Ferramentas de Apoio / IA
* Detalhe aqui se utilizou IA. Exemplo: "Ferramentas de IA (como Gemini ou ChatGPT) foram utilizadas para auxiliar na compreensão da estrutura de componentes do React Bootstrap e para sugestões pontuais de implementação no consumo da API."

## 💻 Como executar o projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd nome-do-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse no navegador o endereço local disponibilizado pelo Vite no terminal.
