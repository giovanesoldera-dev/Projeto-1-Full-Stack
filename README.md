# 🛒 Sistema de Gerenciamento de Produtos

Projeto 1 da disciplina **Programação Web Full Stack** — SPA em **React.js** que consome a API JSON pública **DummyJSON** com requisições AJAX (`fetch`).

## Funcionalidades

* Listagem de produtos em cards (`GET /products`)
* **Busca enviando parâmetro à API** (`GET /products/search?q=termo`), com validação antes do envio
* Filtro por categoria, faixa de preço e ordenação
* Paginação (12 por página)
* Visualização de detalhes em modal
* Cadastro (`POST /products/add`), edição (`PUT /products/:id`) e exclusão (`DELETE /products/:id`)
* Validação dos formulários **antes** do envio e mensagens de erro **depois** do envio (erros de rede ou da API)
* Estados de tela: carregando, erro, vazio e sucesso
* Upload de imagem com pré-visualização (apenas local)

> A DummyJSON **simula** criação, edição e exclusão: nada é gravado de verdade. A lista é atualizada localmente após a resposta da API.

## Requisitos da disciplina

| Requisito | Atendido por |
| --- | --- |
| React.js + SPA | Uma única página, sem recarregar |
| API JSON aberta | DummyJSON |
| Hook do React | `useMemo` (filtro, ordenação e paginação em `ListaProdutos.jsx`) |
| Biblioteca externa | React Bootstrap |
| AJAX | `fetch` com GET, POST, PUT e DELETE |
| CRUD integrado | Tudo na mesma tela, via Context API |

## Estrutura

```text
src/
├── components/
│   ├── Header.jsx
│   ├── FiltroBusca.jsx
│   ├── ListaProdutos.jsx
│   ├── CardProduto.jsx
│   ├── Paginacao.jsx
│   ├── FormProduto.jsx
│   └── DetalhesProduto.jsx
├── contexts/
│   └── ProdutosContext.jsx   (estado global + chamadas à API)
├── App.jsx
├── main.jsx
└── index.css
```

## Como executar

```bash
npm install
npm run dev
```

## Integrantes

| Integrante | 
| --- | 
| Giovane Soldera Ribeiro |
| Carlos Eduardo Pereira|

## Uso de Inteligência Artificial

O Claude (Anthropic) foi usado como apoio para estruturar o código, sugerir a organização em componentes e contexto, e esclarecer conceitos. O código foi revisado e compreendido pela equipe antes da entrega.
