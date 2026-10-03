import { Modal } from 'react-bootstrap'

function DetalhesProduto({ produto, onFechar }) {
  return (
    <Modal show={!!produto} onHide={onFechar}>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {produto && (
          <>
            {produto.thumbnail && <img src={produto.thumbnail} alt={produto.title} className="img-fluid mb-3 rounded" />}
            <p><strong>Título:</strong> {produto.title}</p>
            <p><strong>Categoria:</strong> {produto.category}</p>
            {produto.brand && <p><strong>Marca:</strong> {produto.brand}</p>}
            <p><strong>Preço:</strong> ${produto.price}</p>
            <p><strong>Avaliação:</strong> {produto.rating}</p>
            <p><strong>Estoque:</strong> {produto.stock}</p>
            {produto.description && <p><strong>Descrição:</strong> {produto.description}</p>}
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default DetalhesProduto
