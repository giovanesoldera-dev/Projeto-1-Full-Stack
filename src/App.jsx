import { useEffect, useMemo, useState } from 'react'
import { Container, Form, Spinner, Alert } from 'react-bootstrap'

const API_URL = 'https://dummyjson.com/products'

function App() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')

  // Consulta de produtos (GET)
  useEffect(() => {
    fetch(`${API_URL}?limit=100`)
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data.products)
        setCarregando(false)
      })
      .catch(() => {
        setErro('Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.')
        setCarregando(false)
      })
  }, [])

  // Pesquisa por nome, memorizada com useMemo
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => p.title.toLowerCase().includes(busca.toLowerCase()))
  }, [produtos, busca])

  return (
    <>
      <header className="app-header">
        <Container>
          <div className="eyebrow">DummyJSON · Catálogo interno</div>
          <h1>Gerenciamento de Produtos</h1>
          <p>Consulte e pesquise os produtos disponíveis no catálogo.</p>
        </Container>
      </header>

      <Container>
        <div className="filter-panel">
          <span className="filter-label">Pesquisar</span>
          <Form.Control
            type="text"
            placeholder="Nome do produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="result-count mt-3 mb-2">
          {produtosFiltrados.length} produto(s) encontrado(s)
        </div>

        {erro && <Alert variant="danger">{erro}</Alert>}

        {carregando ? (
          <div className="text-center my-5">
            <Spinner animation="border" style={{ color: 'var(--primary)' }} />
          </div>
        ) : (
          <div className="product-grid mb-4">
            {produtosFiltrados.map((p) => (
              <div className="product-card" key={p.id}>
                <div className="thumb-wrap">
                  {p.thumbnail ? <img src={p.thumbnail} alt={p.title} /> : <span>Sem imagem</span>}
                </div>
                <div className="card-body">
                  <div className="category-tag">{p.category}</div>
                  <h3>{p.title}</h3>
                  <div className="price-row">
                    <span className="price">${p.price}</span>
                    <span className="rating">★ {p.rating}</span>
                  </div>
                </div>
              </div>
            ))}

            {produtosFiltrados.length === 0 && (
              <div className="empty-state">
                <h4>Nenhum produto encontrado</h4>
                <p className="mb-0">Tente pesquisar por outro nome.</p>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  )
}

export default App
