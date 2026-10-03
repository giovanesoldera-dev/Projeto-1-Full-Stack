import { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useProdutos } from '../contexts/ProdutosContext.jsx'

const VAZIO = { title: '', category: '', price: '', stock: '', description: '', imagem: '' }

// Validação ANTES do envio: retorna um objeto com as mensagens de erro de cada campo
function validar(d) {
  const erros = {}
  if (d.title.trim().length < 3) erros.title = 'O título deve ter pelo menos 3 caracteres.'
  if (d.category.trim() === '') erros.category = 'Informe a categoria.'
  const preco = Number(d.price)
  if (d.price === '' || Number.isNaN(preco) || preco <= 0) erros.price = 'Informe um preço maior que zero.'
  const estoque = Number(d.stock)
  if (d.stock === '' || !Number.isInteger(estoque) || estoque < 0) erros.stock = 'Informe um estoque inteiro (0 ou mais).'
  return erros
}

// Campo de formulário reutilizável (recebe tudo por props)
function Campo({ rotulo, nome, dados, erros, onChange, ...resto }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{rotulo}</Form.Label>
      <Form.Control name={nome} value={dados[nome]} onChange={onChange} isInvalid={!!erros[nome]} {...resto} />
      <Form.Control.Feedback type="invalid">{erros[nome]}</Form.Control.Feedback>
    </Form.Group>
  )
}

// Props: aberto (mostra o modal), produto (null = cadastro, objeto = edição), onFechar
function FormProduto({ aberto, produto, onFechar }) {
  const { categorias, cadastrarProduto, editarProduto } = useProdutos()
  const [dados, setDados] = useState(VAZIO)
  const [erros, setErros] = useState({})
  const [erroEnvio, setErroEnvio] = useState('')
  const [enviando, setEnviando] = useState(false)
  const editando = produto !== null

  // Preenche o formulário toda vez que o modal abre
  useEffect(() => {
    if (!aberto) return
    setDados(
      produto
        ? {
            title: produto.title,
            category: produto.category,
            price: produto.price,
            stock: produto.stock,
            description: produto.description ?? '',
            imagem: produto.thumbnail || '',
          }
        : VAZIO,
    )
    setErros({})
    setErroEnvio('')
  }, [aberto, produto])

  function alterar(e) {
    const { name, value } = e.target
    setDados((d) => ({ ...d, [name]: value }))
  }

  // Lê a imagem escolhida e converte para base64 (só para pré-visualização local)
  function escolherImagem(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => setDados((d) => ({ ...d, imagem: leitor.result }))
    leitor.readAsDataURL(arquivo)
  }

  async function salvar(e) {
    e.preventDefault()
    const encontrados = validar(dados)
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return // não envia se houver erro

    const payload = {
      title: dados.title.trim(),
      category: dados.category.trim(),
      price: Number(dados.price),
      stock: Number(dados.stock),
      description: dados.description.trim(),
    }
    setEnviando(true)
    setErroEnvio('')
    try {
      if (editando) await editarProduto(produto, payload, dados.imagem)
      else await cadastrarProduto(payload, dados.imagem)
      onFechar()
    } catch (erro) {
      setErroEnvio(erro.message) // erro DEPOIS do envio (resposta da API ou rede)
    } finally {
      setEnviando(false)
    }
  }

  const campo = { dados, erros, onChange: alterar }

  return (
    <Modal show={aberto} onHide={onFechar}>
      <Modal.Header closeButton>
        <Modal.Title>{editando ? 'Editar Produto' : 'Novo Produto'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={salvar} noValidate>
        <Modal.Body>
          {erroEnvio && <Alert variant="danger">{erroEnvio}</Alert>}
          <Campo rotulo="Título" nome="title" {...campo} />
          <Campo rotulo="Categoria" nome="category" list="categorias-lista" {...campo} />
          <datalist id="categorias-lista">
            {categorias.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <Row>
            <Col>
              <Campo rotulo="Preço (US$)" nome="price" type="number" step="0.01" {...campo} />
            </Col>
            <Col>
              <Campo rotulo="Estoque" nome="stock" type="number" {...campo} />
            </Col>
          </Row>
          <Campo rotulo="Descrição" nome="description" as="textarea" rows={3} {...campo} />
          <Form.Group>
            <Form.Label>Imagem do produto</Form.Label>
            <div className="image-upload">
              <div className="preview-box">
                {dados.imagem ? <img src={dados.imagem} alt="Pré-visualização" /> : <span>Sem imagem</span>}
              </div>
              <Form.Control type="file" accept="image/*" onChange={escolherImagem} />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onFechar}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={enviando}>
            {enviando ? 'Salvando...' : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default FormProduto
