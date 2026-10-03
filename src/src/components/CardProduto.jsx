import { Button } from 'react-bootstrap'

// Props: produto (dados a exibir) e funções chamadas ao clicar nos botões
function CardProduto({ produto, onVer, onEditar, onExcluir }) {
  const estoqueBaixo = produto.stock <= 10
  const percentual = Math.min(100, produto.stock)

  return (
    <div className="product-card">
      <div className="thumb-wrap">
        {produto.thumbnail ? <img src={produto.thumbnail} alt={produto.title} /> : <span>Sem imagem</span>}
      </div>
      <div className="card-body">
        <div className="category-tag">{produto.category}</div>
        <h3>{produto.title}</h3>
        <div className="price-row">
          <span className="price">${produto.price}</span>
          <span className="rating">★ {produto.rating}</span>
        </div>
        <div className="stock-bar-track">
          <div className={`stock-bar-fill ${estoqueBaixo ? 'low' : ''}`} style={{ width: `${percentual}%` }} />
        </div>
        <div className="stock-label">
          {estoqueBaixo ? `Apenas ${produto.stock} em estoque` : `${produto.stock} em estoque`}
        </div>
        <div className="card-actions">
          <Button size="sm" variant="outline-primary" onClick={() => onVer(produto)}>
            Ver
          </Button>
          <Button size="sm" variant="outline-secondary" onClick={() => onEditar(produto)}>
            Editar
          </Button>
          <Button size="sm" variant="outline-danger" onClick={() => onExcluir(produto)}>
            Excluir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardProduto
