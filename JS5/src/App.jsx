import { useState } from 'react'
import './App.css'
import Pizzaria from './components/Pizzaria'
import Contato from './components/Contato'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('pizzaria');

  return (
    <>
      <header>
        <h1>🍕 Pizzaria FATEC</h1>
        <p>
          {paginaAtual === 'pizzaria' 
            ? 'Cardápio & Carrinho de Compras' 
            : 'Entre em Contato - Estamos aqui para ajudar!'}
          <span className="storage-badge">💾 Salvamento Automático</span>
        </p>
        <nav className="nav-menu">
          <button 
            className={`nav-btn ${paginaAtual === 'pizzaria' ? 'active' : ''}`}
            onClick={() => setPaginaAtual('pizzaria')}
          >
            🍕 Cardápio
          </button>
          <button 
            className={`nav-btn ${paginaAtual === 'contato' ? 'active' : ''}`}
            onClick={() => setPaginaAtual('contato')}
          >
            📧 Contato
          </button>
        </nav>
      </header>

      <div className="app-content">
        {paginaAtual === 'pizzaria' ? <Pizzaria /> : <Contato />}
      </div>
    </>
  );
}

export default App;
