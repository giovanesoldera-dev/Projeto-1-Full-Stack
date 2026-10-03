import { useEffect, useMemo, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { useProdutos } from '../contexts/ProdutosContext.jsx'
import CardProduto from './CardProduto.jsx'
import Paginacao from './Paginacao.jsx'

const POR_PAGINA = 12

function ListaProdutos({ filtros, onVer }) {
  const { produtos, carregando, erro } = useProdutos()
  const [pagina, setPagina] = useState(1)

  // Voltar para a página 1 quando a lista ou os filtros mudarem
  useEffect(() => {
    setPagina(1)
  }, [produtos, filtros])

  // useMemo: filtro por categoria/preço + ordenação, recalculado só quando necessário.
  // O filter cria uma nova lista, então o sort não altera o estado original.
  const filtrados = useMemo(() => {
    const min = filtros.precoMin === '' ? -Infinity : Number(filtros.precoMin)
    const max = filtros.precoMax === '' ? Infinity : Number(filtros.precoMax)
    const lista = produtos.filter(
      (p) => (filtros.categoria === '' || p.category === filtros.categoria) && p.price >= min && p.price <= max,
    )
    const ordenar = {
      'preco-asc': (a, b) => a.price - b.price,
      'preco-desc': (a, b) => b.price - a.price,
      avaliacao: (a, b) => b.rating - a.rating,
      nome: (a, b) => a.title.localeCompare(b.title),
    }[filtros.ordenacao]
    return ordenar ? lista.sort(ordenar) : lista
  }, [produtos, filtros])

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const paginaAtual = Math.min(pagina, totalPaginas)
  const daPagina = useMemo(() => {
    const inicio = (paginaAtual - 1) * POR_PAGINA
    return filtrados.slice(inicio, inicio + POR_PAGINA)
  }, [filtrados, paginaAtual])

  return (
    <>
      <div className="result-count mt-3 mb-2">{filtrados.length} produto(s) encontrado(s)</div>

      {erro && <Alert variant="danger">{erro}</Alert>}

      {carregando ? (
        <div className="text-center my-5">
          <Spinner animation="border" style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        <div className="product-grid mb-3">
          {daPagina.map((p) => (
            <CardProduto key={p.id} produto={p} onVer={onVer} />
          ))}
          {!erro && filtrados.length === 0 && (
            <div className="empty-state">
              <h4>Nenhum produto encontrado</h4>
              <p className="mb-0">Ajuste a pesquisa, a categoria ou a faixa de preço.</p>
            </div>
          )}
        </div>
      )}

      <Paginacao pagina={paginaAtual} total={totalPaginas} onMudar={setPagina} />
    </>
  )
}

export default ListaProdutos
