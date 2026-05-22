// =============================================
// Dados do Cardápio
// =============================================

// Array com as pizzas disponíveis no cardápio
const pizzas = [
  { id: 1, nome: "Margherita",         preco: 35.00, emoji: "🍕" },
  { id: 2, nome: "Calabresa",          preco: 38.00, emoji: "🌶️" },
  { id: 3, nome: "Portuguesa",         preco: 40.00, emoji: "🍳" },
  { id: 4, nome: "Frango c/ Catupiry", preco: 42.00, emoji: "🐔" },
  { id: 5, nome: "4 Queijos",          preco: 45.00, emoji: "🧀" },
  { id: 6, nome: "Pepperoni",          preco: 46.00, emoji: "🔴" },
];

// =============================================
// Estado do Carrinho
// =============================================

// Chave para armazenar dados no localStorage
const STORAGE_KEY = 'pizzariaFatecCarrinho';
const STORAGE_KEY_COUNTER = 'pizzariaFatecCartId';

// Array que guarda os itens adicionados ao carrinho
// Cada item: { cartId, id, nome, preco, emoji }
let carrinho = [];

// Contador para gerar IDs únicos por entrada no carrinho
// (permite adicionar a mesma pizza mais de uma vez)
let proximoCartId = 1;

// =============================================
// Funções de LocalStorage
// =============================================

/**
 * Salva o estado atual do carrinho no localStorage.
 * Converte o array em JSON e armazena junto com o contador de IDs.
 */
function salvarCarrinho() {
  // Converte o array do carrinho em string JSON e salva
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
  
  // Salva também o próximo ID disponível
  localStorage.setItem(STORAGE_KEY_COUNTER, proximoCartId.toString());
}

/**
 * Carrega o carrinho salvo do localStorage.
 * Reconstrói o array e restaura o contador de IDs.
 */
function carregarCarrinho() {
  // Tenta recuperar os dados salvos do localStorage
  const carrinhoSalvo = localStorage.getItem(STORAGE_KEY);
  const contadorSalvo = localStorage.getItem(STORAGE_KEY_COUNTER);
  
  // Se houver dados salvos, reconstrói o carrinho
  if (carrinhoSalvo) {
    try {
      // Converte a string JSON de volta para array
      carrinho = JSON.parse(carrinhoSalvo);
    } catch (error) {
      // Se houver erro ao fazer parse, inicia com carrinho vazio
      console.error('Erro ao carregar carrinho do localStorage:', error);
      carrinho = [];
    }
  }
  
  // Restaura o contador de IDs
  if (contadorSalvo) {
    proximoCartId = parseInt(contadorSalvo, 10);
  }
}

// =============================================
// Renderização do Cardápio
// =============================================

/**
 * Gera os cards de pizza no HTML a partir do array `pizzas`.
 */
function renderizarCardapio() {
  const grid = document.getElementById("pizzaGrid");

  pizzas.forEach(pizza => {
    // Cria o card
    const card = document.createElement("div");
    card.classList.add("pizza-card");

    card.innerHTML = `
      <div class="emoji">${pizza.emoji}</div>
      <h3>${pizza.nome}</h3>
      <span class="price">R$ ${pizza.preco.toFixed(2)}</span>
      <button class="btn-add" onclick="adicionarAoCarrinho(${pizza.id})">
        Adicionar 🛒
      </button>
    `;

    grid.appendChild(card);
  });
}

// =============================================
// Funções do Carrinho
// =============================================

/**
 * Adiciona uma pizza ao carrinho com um ID de entrada único.
 * @param {number} pizzaId - ID da pizza no cardápio
 */
function adicionarAoCarrinho(pizzaId) {
  // Busca a pizza no cardápio
  const pizza = pizzas.find(p => p.id === pizzaId);
  if (!pizza) return;

  // Cria um objeto de item do carrinho com ID único
  const item = {
    cartId: proximoCartId++, // ID exclusivo desta entrada
    id: pizza.id,
    nome: pizza.nome,
    preco: pizza.preco,
    emoji: pizza.emoji,
  };

  // Adiciona ao array do carrinho
  carrinho.push(item);

  // Salva o carrinho atualizado no localStorage
  salvarCarrinho();

  // Atualiza a interface
  renderizarCarrinho();
}

/**
 * Remove um item do carrinho pelo seu cartId único.
 * @param {number} cartId - ID único do item no carrinho
 */
function removerDoCarrinho(cartId) {
  // Filtra o array removendo apenas o item com o cartId correspondente
  carrinho = carrinho.filter(item => item.cartId !== cartId);

  // Salva o carrinho atualizado no localStorage
  salvarCarrinho();

  // Atualiza a interface imediatamente
  renderizarCarrinho();
}

/**
 * Remove todos os itens do carrinho de uma vez.
 * Limpa também os dados do localStorage.
 */
function clearCart() {
  carrinho = [];
  
  // Remove os dados do localStorage
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY_COUNTER);
  
  // Reinicia o contador de IDs
  proximoCartId = 1;
  
  renderizarCarrinho();
}

// =============================================
// Renderização do Carrinho
// =============================================

/**
 * Atualiza o DOM do carrinho: lista de itens, total e visibilidade dos elementos.
 */
function renderizarCarrinho() {
  const lista      = document.getElementById("cartList");
  const emptyMsg   = document.getElementById("emptyMsg");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal  = document.getElementById("cartTotal");
  const finalizeSection = document.getElementById("finalizeSection");

  // Limpa a lista atual antes de re-renderizar
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    // Mostra mensagem de carrinho vazio e esconde o rodapé
    emptyMsg.style.display = "block";
    cartFooter.classList.add("hidden");
    // Esconde o botão de finalizar quando o carrinho está vazio
    finalizeSection.classList.add("hidden");
    return;
  }

  // Há itens: esconde a mensagem vazia e mostra o rodapé
  emptyMsg.style.display = "none";
  cartFooter.classList.remove("hidden");
  // Mostra o botão de finalizar quando há itens no carrinho
  finalizeSection.classList.remove("hidden");

  // Calcula o total somando o preço de cada item
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;

    // Cria o elemento <li> do item
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.setAttribute("data-cart-id", item.cartId); // facilita identificação no DOM

    li.innerHTML = `
      <div class="cart-item-info">
        <span>${item.emoji} ${item.nome}</span>
        <small>R$ ${item.preco.toFixed(2)}</small>
      </div>
      <!-- Botão Remover: chama removerDoCarrinho com o cartId deste item -->
      <button class="btn-remove" onclick="removerDoCarrinho(${item.cartId})">
        Remover ✕
      </button>
    `;

    lista.appendChild(li);
  });

  // Atualiza o total exibido
  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// =============================================
// Inicialização
// =============================================

// Carrega o carrinho salvo do localStorage (se houver)
carregarCarrinho();

// Renderiza o cardápio assim que o script é carregado
renderizarCardapio();

// Renderiza o carrinho com os dados carregados do localStorage
renderizarCarrinho();

// =============================================
// Funções do Modal de Resumo do Pedido
// =============================================

/**
 * Abre o modal e preenche com os dados do carrinho.
 * Só pode ser chamada se houver itens no carrinho.
 */
function abrirModal() {
  // Verifica se há itens no carrinho
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione pizzas antes de finalizar.");
    return;
  }

  // Preenche o modal com os dados do carrinho
  preencherModal();

  // Torna o modal visível adicionando a classe 'active'
  const modal = document.getElementById("modal");
  modal.classList.add("active");
}

/**
 * Fecha o modal removendo a classe 'active'.
 */
function fecharModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
}

/**
 * Preenche o modal dinamicamente com os dados do carrinho.
 * Exibe: lista de pizzas, quantidade total e valor total.
 */
function preencherModal() {
  const modalList = document.getElementById("modalList");
  const modalQuantity = document.getElementById("modalQuantity");
  const modalTotal = document.getElementById("modalTotal");

  // Limpa a lista atual do modal
  modalList.innerHTML = "";

  // Variáveis para calcular totais
  let total = 0;
  let quantidade = carrinho.length;

  // Cria um mapa para agrupar pizzas iguais e contar quantidades
  const pizzasAgrupadas = {};

  carrinho.forEach(item => {
    total += item.preco;

    // Agrupa pizzas pelo ID para mostrar quantidade
    if (pizzasAgrupadas[item.id]) {
      pizzasAgrupadas[item.id].quantidade++;
    } else {
      pizzasAgrupadas[item.id] = {
        nome: item.nome,
        emoji: item.emoji,
        preco: item.preco,
        quantidade: 1
      };
    }
  });

  // Renderiza cada tipo de pizza com sua quantidade
  Object.values(pizzasAgrupadas).forEach(pizza => {
    const li = document.createElement("li");
    
    li.innerHTML = `
      <span>${pizza.emoji} ${pizza.nome} x${pizza.quantidade}</span>
      <span class="item-price">R$ ${(pizza.preco * pizza.quantidade).toFixed(2)}</span>
    `;

    modalList.appendChild(li);
  });

  // Atualiza a quantidade total e o valor total no modal
  modalQuantity.textContent = quantidade;
  modalTotal.textContent = `R$ ${total.toFixed(2)}`;
}

/**
 * Confirma o pedido, exibe mensagem de sucesso e limpa o carrinho.
 */
function confirmarPedido() {
  // Calcula o total para exibir na mensagem
  let total = 0;
  carrinho.forEach(item => total += item.preco);

  // Exibe mensagem de confirmação
  alert(`🎉 Pedido confirmado com sucesso!\n\nTotal: R$ ${total.toFixed(2)}\n\nObrigado pela preferência!`);

  // Limpa o carrinho
  clearCart();

  // Fecha o modal
  fecharModal();
}