import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { ProdutosProvider } from './contexts/ProdutosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProdutosProvider>
      <App />
    </ProdutosProvider>
  </React.StrictMode>,
)
