// =============================================
// Seleção de Elementos do DOM
// =============================================

// Formulário e campos
const form = document.getElementById('contactForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');
const charCount = document.getElementById('charCount');

// Mensagens de erro
const nomeError = document.getElementById('nomeError');
const emailError = document.getElementById('emailError');
const mensagemError = document.getElementById('mensagemError');

// Grupos de formulário
const nomeGroup = nomeInput.parentElement;
const emailGroup = emailInput.parentElement;
const mensagemGroup = mensagemInput.parentElement;

// Mensagem de sucesso
const successMessage = document.getElementById('successMessage');

// =============================================
// Expressão Regular para Validação de E-mail
// =============================================

/**
 * Regex simples para validar e-mail.
 * Verifica: nome@dominio.extensao
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =============================================
// Funções de Validação
// =============================================

/**
 * Valida o campo Nome.
 * Regra: Não pode estar vazio.
 * @returns {boolean} - true se válido, false se inválido
 */
function validarNome() {
  const nome = nomeInput.value.trim();
  
  // Remove estados anteriores
  nomeGroup.classList.remove('has-error', 'is-valid');
  nomeError.classList.remove('active');
  
  // Verifica se está vazio
  if (nome === '') {
    // Campo inválido
    nomeGroup.classList.add('has-error');
    nomeError.textContent = 'Por favor, preencha seu nome completo.';
    nomeError.classList.add('active');
    return false;
  }
  
  // Verifica se tem pelo menos 3 caracteres
  if (nome.length < 3) {
    nomeGroup.classList.add('has-error');
    nomeError.textContent = 'O nome deve ter pelo menos 3 caracteres.';
    nomeError.classList.add('active');
    return false;
  }
  
  // Campo válido
  nomeGroup.classList.add('is-valid');
  return true;
}

/**
 * Valida o campo E-mail.
 * Regras: Não pode estar vazio e deve ser um e-mail válido (regex).
 * @returns {boolean} - true se válido, false se inválido
 */
function validarEmail() {
  const email = emailInput.value.trim();
  
  // Remove estados anteriores
  emailGroup.classList.remove('has-error', 'is-valid');
  emailError.classList.remove('active');
  
  // Verifica se está vazio
  if (email === '') {
    emailGroup.classList.add('has-error');
    emailError.textContent = 'Por favor, preencha seu e-mail.';
    emailError.classList.add('active');
    return false;
  }
  
  // Valida formato do e-mail usando regex
  if (!emailRegex.test(email)) {
    emailGroup.classList.add('has-error');
    emailError.textContent = 'Por favor, insira um e-mail válido (exemplo@dominio.com).';
    emailError.classList.add('active');
    return false;
  }
  
  // Campo válido
  emailGroup.classList.add('is-valid');
  return true;
}

/**
 * Valida o campo Mensagem.
 * Regras: Não pode estar vazio e deve ter pelo menos 10 caracteres.
 * @returns {boolean} - true se válido, false se inválido
 */
function validarMensagem() {
  const mensagem = mensagemInput.value.trim();
  const tamanho = mensagem.length;
  
  // Remove estados anteriores
  mensagemGroup.classList.remove('has-error', 'is-valid');
  mensagemError.classList.remove('active');
  
  // Verifica se está vazio
  if (mensagem === '') {
    mensagemGroup.classList.add('has-error');
    mensagemError.textContent = 'Por favor, escreva sua mensagem.';
    mensagemError.classList.add('active');
    return false;
  }
  
  // Verifica se tem menos de 10 caracteres
  if (tamanho < 10) {
    mensagemGroup.classList.add('has-error');
    mensagemError.textContent = `Sua mensagem deve ter pelo menos 10 caracteres. Faltam ${10 - tamanho} caractere(s).`;
    mensagemError.classList.add('active');
    return false;
  }
  
  // Campo válido
  mensagemGroup.classList.add('is-valid');
  return true;
}

/**
 * Valida todos os campos do formulário.
 * @returns {boolean} - true se todos forem válidos, false se houver algum inválido
 */
function validarFormulario() {
  const nomeValido = validarNome();
  const emailValido = validarEmail();
  const mensagemValida = validarMensagem();
  
  // Retorna true apenas se TODOS os campos forem válidos
  return nomeValido && emailValido && mensagemValida;
}

// =============================================
// Atualização do Contador de Caracteres
// =============================================

/**
 * Atualiza o contador de caracteres da mensagem em tempo real.
 */
function atualizarContador() {
  const tamanho = mensagemInput.value.trim().length;
  charCount.textContent = `${tamanho} / 10 caracteres`;
  
  // Muda a cor do contador baseado no tamanho
  if (tamanho >= 10) {
    charCount.style.color = '#10b981'; // Verde quando atingir mínimo
  } else {
    charCount.style.color = '#888'; // Cinza quando abaixo do mínimo
  }
}

// =============================================
// Event Listeners
// =============================================

/**
 * Valida o nome quando o usuário sai do campo (blur).
 */
nomeInput.addEventListener('blur', validarNome);

/**
 * Remove erro do nome quando o usuário começa a digitar.
 */
nomeInput.addEventListener('input', function() {
  if (nomeGroup.classList.contains('has-error')) {
    nomeGroup.classList.remove('has-error');
    nomeError.classList.remove('active');
  }
});

/**
 * Valida o e-mail quando o usuário sai do campo (blur).
 */
emailInput.addEventListener('blur', validarEmail);

/**
 * Remove erro do e-mail quando o usuário começa a digitar.
 */
emailInput.addEventListener('input', function() {
  if (emailGroup.classList.contains('has-error')) {
    emailGroup.classList.remove('has-error');
    emailError.classList.remove('active');
  }
});

/**
 * Atualiza o contador de caracteres e valida ao sair do campo.
 */
mensagemInput.addEventListener('input', atualizarContador);
mensagemInput.addEventListener('blur', validarMensagem);

/**
 * Remove erro da mensagem quando o usuário começa a digitar.
 */
mensagemInput.addEventListener('input', function() {
  if (mensagemGroup.classList.contains('has-error')) {
    mensagemGroup.classList.remove('has-error');
    mensagemError.classList.remove('active');
  }
});

/**
 * Intercepta o envio do formulário para validação.
 */
form.addEventListener('submit', function(event) {
  // Previne o envio padrão do formulário
  event.preventDefault();
  
  // Valida todos os campos
  const formularioValido = validarFormulario();
  
  // Se houver erros, não envia
  if (!formularioValido) {
    // Foca no primeiro campo com erro
    if (!validarNome()) {
      nomeInput.focus();
    } else if (!validarEmail()) {
      emailInput.focus();
    } else if (!validarMensagem()) {
      mensagemInput.focus();
    }
    return;
  }
  
  // Se passou em todas as validações, "envia" o formulário
  enviarFormulario();
});

/**
 * Limpa todos os estados de validação quando o formulário é resetado.
 */
form.addEventListener('reset', function() {
  // Remove todas as classes de validação
  nomeGroup.classList.remove('has-error', 'is-valid');
  emailGroup.classList.remove('has-error', 'is-valid');
  mensagemGroup.classList.remove('has-error', 'is-valid');
  
  // Remove todas as mensagens de erro
  nomeError.classList.remove('active');
  emailError.classList.remove('active');
  mensagemError.classList.remove('active');
  
  // Reseta o contador de caracteres
  charCount.textContent = '0 / 10 caracteres';
  charCount.style.color = '#888';
  
  // Esconde mensagem de sucesso se estiver visível
  successMessage.classList.remove('active');
});

// =============================================
// Função de Envio do Formulário
// =============================================

/**
 * Simula o envio do formulário e exibe mensagem de sucesso.
 * Em um sistema real, aqui seria feita a requisição para o servidor.
 */
function enviarFormulario() {
  // Coleta os dados do formulário
  const dados = {
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    assunto: document.getElementById('assunto').value,
    mensagem: mensagemInput.value.trim()
  };
  
  // Log dos dados (em produção, seria enviado para um servidor)
  console.log('📧 Formulário enviado com sucesso!');
  console.log('Dados:', dados);
  
  // Exibe a mensagem de sucesso
  successMessage.classList.add('active');
  
  // Limpa o formulário após 3 segundos e esconde a mensagem
  setTimeout(function() {
    form.reset();
    successMessage.classList.remove('active');
  }, 3000);
}

// =============================================
// Inicialização
// =============================================

// Inicializa o contador de caracteres
atualizarContador();

// Log de inicialização
console.log('✓ Sistema de validação de formulário carregado com sucesso!');
console.log('Campos obrigatórios: Nome, E-mail, Mensagem (mín. 10 caracteres)');
