function Paginacao({ pagina, total, onMudar }) {
  if (total <= 1) return null
  const numeros = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <div className="pager">
      <button onClick={() => onMudar(pagina - 1)} disabled={pagina === 1}>
        ‹
      </button>
      {numeros.map((n) => (
        <button key={n} className={n === pagina ? 'active' : ''} onClick={() => onMudar(n)}>
          {n}
        </button>
      ))}
      <button onClick={() => onMudar(pagina + 1)} disabled={pagina === total}>
        ›
      </button>
    </div>
  )
}

export default Paginacao
