import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header.jsx'
import FiltroBusca, { FILTROS_INICIAIS } from './components/FiltroBusca.jsx'
import ListaProdutos from './components/ListaProdutos.jsx'
import FormProduto from './components/FormProduto.jsx'
import DetalhesProduto from './components/DetalhesProduto.jsx'

function App() {
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)
  // produtoForm: undefined = modal fechado | null = novo produto | objeto = editar esse produto
  const [produtoForm, setProdutoForm] = useState(undefined)
  const [produtoDetalhe, setProdutoDetalhe] = useState(null)

  return (
    <>
      <Header />
      <Container>
        <FiltroBusca filtros={filtros} onChange={setFiltros} onNovo={() => setProdutoForm(null)} />
        <ListaProdutos filtros={filtros} onVer={setProdutoDetalhe} onEditar={setProdutoForm} />
      </Container>

      <FormProduto
        aberto={produtoForm !== undefined}
        produto={produtoForm ?? null}
        onFechar={() => setProdutoForm(undefined)}
      />
      <DetalhesProduto produto={produtoDetalhe} onFechar={() => setProdutoDetalhe(null)} />
    </>
  )
}

export default App
