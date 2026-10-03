import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useProdutos } from '../contexts/ProdutosContext.jsx'

export const FILTROS_INICIAIS = { categoria: '', precoMin: '', precoMax: '', ordenacao: 'relevancia' }

// Validação ANTES de enviar a busca para a API
function validarTermo(termo) {
  const t = termo.trim()
  if (t !== '' && t.length < 2) return 'Digite pelo menos 2 caracteres.'
  return ''
}

// Props: filtros (valores atuais), onChange (avisa o App que mudou), onNovo (abre o cadastro)
function FiltroBusca({ filtros, onChange, onNovo }) {
  const { buscarProdutos, categorias, carregando } = useProdutos()
  const [termo, setTermo] = useState('')
  const [erroTermo, setErroTermo] = useState('')

  const alterar = (campo, valor) => onChange({ ...filtros, [campo]: valor })
  const faixaInvalida =
    filtros.precoMin !== '' && filtros.precoMax !== '' && Number(filtros.precoMin) > Number(filtros.precoMax)
  const temFiltro = termo || filtros.categoria || filtros.precoMin || filtros.precoMax || filtros.ordenacao !== 'relevancia'

  function buscar(e) {
    e.preventDefault() // não recarrega a página (SPA)
    const erro = validarTermo(termo)
    setErroTermo(erro)
    if (erro) return // não envia à API se houver erro
    buscarProdutos(termo.trim())
  }

  function limpar() {
    setTermo('')
    setErroTermo('')
    onChange(FILTROS_INICIAIS)
    buscarProdutos('')
  }

  return (
    <div className="filter-panel">
      <Row className="gy-3">
        <Col md={5}>
          <Form onSubmit={buscar} noValidate>
            <span className="filter-label">Pesquisar</span>
            <div className="d-flex gap-2">
              <Form.Control
                placeholder="Nome do produto..."
                value={termo}
                isInvalid={!!erroTermo}
                onChange={(e) => setTermo(e.target.value)}
              />
              <Button type="submit" variant="primary" disabled={carregando}>
                Buscar
              </Button>
            </div>
            {erroTermo && <div className="text-danger small mt-1">{erroTermo}</div>}
          </Form>
        </Col>
        <Col md={3}>
          <span className="filter-label">Faixa de preço (US$)</span>
          <div className="price-inputs">
            <Form.Control
              type="number"
              min="0"
              placeholder="Mín."
              value={filtros.precoMin}
              isInvalid={faixaInvalida}
              onChange={(e) => alterar('precoMin', e.target.value)}
            />
            <span>–</span>
            <Form.Control
              type="number"
              min="0"
              placeholder="Máx."
              value={filtros.precoMax}
              isInvalid={faixaInvalida}
              onChange={(e) => alterar('precoMax', e.target.value)}
            />
          </div>
          {faixaInvalida && <div className="text-danger small mt-1">O mínimo não pode ser maior que o máximo.</div>}
        </Col>
        <Col md={2}>
          <span className="filter-label">Ordenar por</span>
          <Form.Select value={filtros.ordenacao} onChange={(e) => alterar('ordenacao', e.target.value)}>
            <option value="relevancia">Relevância</option>
            <option value="preco-asc">Menor preço</option>
            <option value="preco-desc">Maior preço</option>
            <option value="avaliacao">Melhor avaliados</option>
            <option value="nome">Nome (A–Z)</option>
          </Form.Select>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button variant="success" className="w-100" onClick={onNovo}>
            + Novo produto
          </Button>
        </Col>
      </Row>

      <div className="mt-3">
        <span className="filter-label">Categoria</span>
        <div className="chip-row">
          <span
            className={`category-chip ${filtros.categoria === '' ? 'active' : ''}`}
            onClick={() => alterar('categoria', '')}
          >
            Todas
          </span>
          {categorias.map((c) => (
            <span
              key={c}
              className={`category-chip ${filtros.categoria === c ? 'active' : ''}`}
              onClick={() => alterar('categoria', c)}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {temFiltro && (
        <Button variant="link" size="sm" className="px-0 mt-2" onClick={limpar}>
          Limpar filtros
        </Button>
      )}
    </div>
  )
}

export default FiltroBusca
