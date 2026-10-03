# 🛒 Sistema de Gerenciamento de Produtos

Projeto 1 da disciplina **Programação Web Full Stack** — SPA em **React.js** que consome a API JSON pública **DummyJSON** com requisições AJAX (`fetch`).

## Funcionalidades

* Listagem de produtos em cards (`GET /products`)
* **Busca enviando parâmetro à API** (`GET /products/search?q=termo`), com validação antes do envio
* Filtro por categoria, faixa de preço e ordenação
* Paginação (12 por página)
* Visualização de detalhes em modal
* Validação da busca antes do envio e mensagem de erro quando a API falha
* Estados de tela: carregando, erro, vazio e sucesso

> Em desenvolvimento: o CRUD (cadastro, edição e exclusão) será adicionado na próxima etapa.

## Requisitos da disciplina

| Requisito | Atendido por |
| --- | --- |
| React.js + SPA | Uma única página, sem recarregar |
| API JSON aberta | DummyJSON |
| Hook do React | `useMemo` (filtro, ordenação e paginação em `ListaProdutos.jsx`) |
| Biblioteca externa | React Bootstrap |
| AJAX | `fetch` (GET) com parâmetros na URL |

## Estrutura

```text
src/
├── components/
│   ├── Header.jsx
│   ├── FiltroBusca.jsx
│   ├── ListaProdutos.jsx
│   ├── CardProduto.jsx
│   ├── Paginacao.jsx
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

| Integrante | Responsabilidade |
| --- | --- |
| Nome do integrante 1 | A definir |
| Nome do integrante 2 | A definir |

## Uso de Inteligência Artificial

O Claude (Anthropic) foi usado como apoio para estruturar o código, sugerir a organização em componentes e contexto, e esclarecer conceitos. O código foi revisado e compreendido pela equipe antes da entrega.
