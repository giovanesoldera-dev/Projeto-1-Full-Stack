import { Container } from 'react-bootstrap'

function Header() {
  return (
    <header className="app-header">
      <Container>
        <div className="eyebrow">DummyJSON · Catálogo interno</div>
        <h1>Gerenciamento de Produtos</h1>
        <p>Consulte, pesquise, cadastre e mantenha o catálogo atualizado em um só lugar.</p>
      </Container>
    </header>
  )
}

export default Header
