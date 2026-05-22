import { useState, useEffect } from 'react'
import '../styles/Pizzaria.css'

// =============================================
// Dados do Cardápio
// =============================================
const pizzas = [
  { id: 1, nome: "Margherita",         preco: 35.00, emoji: "🍕" },
  { id: 2, nome: "Calabresa",          preco: 38.00, emoji: "🌶️" },
  { id: 3, nome: "Portuguesa",         preco: 40.00, emoji: "🍳" },
  { id: 4, nome: "Frango c/ Catupiry", preco: 42.00, emoji: "🐔" },
  { id: 5, nome: "4 Queijos",          preco: 45.00, emoji: "🧀" },
  { id: 6, nome: "Pepperoni",          preco: 46.00, emoji: "🔴" },
];

// Chaves do localStorage
const STORAGE_KEY = 'pizzariaFatecCarrinho';
const STORAGE_KEY_COUNTER = 'pizzariaFatecCartId';

function Pizzaria() {
  // =============================================
  // Estados
  // =============================================
  const [carrinho, setCarrinho] = useState([]);
  const [proximoCartId, setProximoCartId] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);

  // =============================================
  // LocalStorage - Carrega ao iniciar
  // =============================================
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem(STORAGE_KEY);
    const contadorSalvo = localStorage.getItem(STORAGE_KEY_COUNTER);
    
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
    
    if (contadorSalvo) {
      setProximoCartId(parseInt(contadorSalvo, 10));
    }
  }, []);

  // =============================================
  // LocalStorage - Salva quando carrinho muda
  // =============================================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
    localStorage.setItem(STORAGE_KEY_COUNTER, proximoCartId.toString());
  }, [carrinho, proximoCartId]);

  // =============================================
  // Funções do Carrinho
  // =============================================

  /**
   * Adiciona uma pizza ao carrinho
   */
  const adicionarAoCarrinho = (pizzaId) => {
    const pizza = pizzas.find(p => p.id === pizzaId);
    if (!pizza) return;

    const novoItem = {
      cartId: proximoCartId,
      id: pizza.id,
      nome: pizza.nome,
      preco: pizza.preco,
      emoji: pizza.emoji,
    };

    setCarrinho(prev => [...prev, novoItem]);
    setProximoCartId(prev => prev + 1);
  };

  /**
   * Remove um item do carrinho
   */
  const removerDoCarrinho = (cartId) => {
    setCarrinho(prev => prev.filter(item => item.cartId !== cartId));
  };

  /**
   * Limpa todo o carrinho
   */
  const limparCarrinho = () => {
    setCarrinho([]);
    setProximoCartId(1);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_COUNTER);
  };

  // =============================================
  // Cálculos
  // =============================================

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco, 0);
  };

  const agruparPizzas = () => {
    const agrupadas = {};
    
    carrinho.forEach(item => {
      if (agrupadas[item.id]) {
        agrupadas[item.id].quantidade++;
      } else {
        agrupadas[item.id] = {
          nome: item.nome,
          emoji: item.emoji,
          preco: item.preco,
          quantidade: 1
        };
      }
    });

    return Object.values(agrupadas);
  };

  // =============================================
  // Modal
  // =============================================

  const abrirModal = () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio! Adicione pizzas antes de finalizar.");
      return;
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const confirmarPedido = () => {
    const total = calcularTotal();
    alert(`🎉 Pedido confirmado com sucesso!\n\nTotal: R$ ${total.toFixed(2)}\n\nObrigado pela preferência!`);
    limparCarrinho();
    fecharModal();
  };

  // =============================================
  // Renderização
  // =============================================

  return (
    <>
      <main className="pizzaria-main">
        {/* Seção do Cardápio */}
        <section className="menu">
          <h2>Cardápio</h2>
          <div className="pizza-grid">
            {pizzas.map(pizza => (
              <div key={pizza.id} className="pizza-card">
                <div className="emoji">{pizza.emoji}</div>
                <h3>{pizza.nome}</h3>
                <span className="price">R$ {pizza.preco.toFixed(2)}</span>
                <button 
                  className="btn-add" 
                  onClick={() => adicionarAoCarrinho(pizza.id)}
                >
                  Adicionar 🛒
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Seção do Carrinho */}
        <section className="cart">
          <h2>🛒 Carrinho</h2>

          {/* Lista de itens */}
          {carrinho.length === 0 ? (
            <p className="empty-msg">Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul id="cartList">
                {carrinho.map(item => (
                  <li key={item.cartId} className="cart-item">
                    <div className="cart-item-info">
                      <span>{item.emoji} {item.nome}</span>
                      <small>R$ {item.preco.toFixed(2)}</small>
                    </div>
                    <button 
                      className="btn-remove" 
                      onClick={() => removerDoCarrinho(item.cartId)}
                    >
                      Remover ✕
                    </button>
                  </li>
                ))}
              </ul>

              {/* Rodapé do carrinho */}
              <div className="cart-footer">
                <span id="cartTotal">Total: R$ {calcularTotal().toFixed(2)}</span>
                <button id="clearBtn" onClick={limparCarrinho}>
                  Limpar Carrinho
                </button>
              </div>

              {/* Botão Finalizar */}
              <div className="finalize-section">
                <button id="finalizeBtn" onClick={abrirModal}>
                  Finalizar Pedido 🎉
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Modal de Resumo do Pedido */}
      {modalAberto && (
        <div className="modal active">
          <div className="modal-overlay" onClick={fecharModal}></div>
          
          <div className="modal-content">
            <h2>📋 Resumo do Pedido</h2>
            
            <div className="modal-body">
              <h3>Itens do Pedido:</h3>
              <ul className="modal-list">
                {agruparPizzas().map((pizza, index) => (
                  <li key={index}>
                    <span>{pizza.emoji} {pizza.nome} x{pizza.quantidade}</span>
                    <span className="item-price">
                      R$ {(pizza.preco * pizza.quantidade).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="modal-summary">
                <p><strong>Quantidade total:</strong> <span>{carrinho.length}</span> pizza(s)</p>
                <p className="modal-total">
                  <strong>Valor total:</strong> 
                  <span>R$ {calcularTotal().toFixed(2)}</span>
                </p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-confirm" onClick={confirmarPedido}>
                Confirmar Pedido ✓
              </button>
              <button className="btn-close" onClick={fecharModal}>
                Fechar ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Pizzaria;
