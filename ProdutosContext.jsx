import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// URL da API (pode ser trocada pela variável VITE_API_URL em um arquivo .env)
const API_URL = import.meta.env.VITE_API_URL ?? 'https://dummyjson.com'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

// Faz a requisição e trata erros de rede e erros HTTP (4xx/5xx).
// O fetch NÃO rejeita em erro HTTP, por isso verificamos resposta.ok.
async function requisicao(caminho, opcoes) {
  let resposta
  try {
    resposta = await fetch(`${API_URL}${caminho}`, opcoes)
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique sua conexão.')
  }
  const dados = await resposta.json().catch(() => null)
  if (!resposta.ok) {
    throw new Error(dados?.message ?? `A API respondeu com erro ${resposta.status}.`)
  }
  return dados
}

const ProdutosContext = createContext(null)

export function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // GET: lista todos os produtos ou busca pelo termo (parâmetro "q" na URL)
  const buscarProdutos = useCallback(async (termo = '') => {
    setCarregando(true)
    setErro('')
    try {
      const params = new URLSearchParams({ limit: 0 })
      if (termo) params.set('q', termo)
      const caminho = termo ? '/products/search' : '/products'
      const dados = await requisicao(`${caminho}?${params}`)
      setProdutos(dados.products)
    } catch (e) {
      setErro(e.message)
      setProdutos([])
    } finally {
      setCarregando(false)
    }
  }, [])

  // Carga inicial: produtos e lista de categorias
  useEffect(() => {
    buscarProdutos()
    requisicao('/products/category-list').then(setCategorias).catch(() => {})
  }, [buscarProdutos])

  // POST: cadastrar. A API só simula, então criamos um id local único.
  async function cadastrarProduto(dados, imagem) {
    const criado = await requisicao('/products/add', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(dados),
    })
    setProdutos((prev) => [
      { rating: 0, ...criado, ...dados, id: `local-${Date.now()}`, local: true, thumbnail: imagem },
      ...prev,
    ])
  }

  // PUT: editar. Produtos criados localmente não existem na API, então só atualizamos a lista.
  async function editarProduto(produto, dados, imagem) {
    if (!produto.local) {
      await requisicao(`/products/${produto.id}`, {
        method: 'PUT',
        headers: JSON_HEADERS,
        body: JSON.stringify(dados),
      })
    }
    const thumbnail = imagem || produto.thumbnail
    setProdutos((prev) => prev.map((p) => (p.id === produto.id ? { ...p, ...dados, thumbnail } : p)))
  }

  // DELETE: excluir
  async function excluirProduto(produto) {
    if (!produto.local) {
      await requisicao(`/products/${produto.id}`, { method: 'DELETE' })
    }
    setProdutos((prev) => prev.filter((p) => p.id !== produto.id))
  }

  const valor = { produtos, categorias, carregando, erro, buscarProdutos, cadastrarProduto, editarProduto, excluirProduto }
  return <ProdutosContext.Provider value={valor}>{children}</ProdutosContext.Provider>
}

// Hook para os componentes acessarem o contexto
// eslint-disable-next-line react-refresh/only-export-components
export function useProdutos() {
  const contexto = useContext(ProdutosContext)
  if (!contexto) throw new Error('useProdutos deve ser usado dentro de <ProdutosProvider>.')
  return contexto
}
