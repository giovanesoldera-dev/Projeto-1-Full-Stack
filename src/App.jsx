import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header.jsx'
import FiltroBusca, { FILTROS_INICIAIS } from './components/FiltroBusca.jsx'
import ListaProdutos from './components/ListaProdutos.jsx'
import DetalhesProduto from './components/DetalhesProduto.jsx'

function App() {
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)
  const [produtoDetalhe, setProdutoDetalhe] = useState(null)

  return (
    <>
      <Header />
      <Container>
        <FiltroBusca filtros={filtros} onChange={setFiltros} />
        <ListaProdutos filtros={filtros} onVer={setProdutoDetalhe} />
      </Container>

      <DetalhesProduto produto={produtoDetalhe} onFechar={() => setProdutoDetalhe(null)} />
    </>
  )
}

export default App
