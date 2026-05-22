import { useState } from 'react'
import '../styles/Contato.css'

function Contato() {
  // =============================================
  // Estados do Formulário
  // =============================================
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const [validFields, setValidFields] = useState({
    nome: false,
    email: false,
    mensagem: false
  });

  const [charCount, setCharCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // =============================================
  // Regex para Validação de E-mail
  // =============================================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // =============================================
  // Funções de Validação
  // =============================================

  const validarNome = (nome) => {
    const nomeValue = nome.trim();
    
    if (nomeValue === '') {
      return {
        isValid: false,
        errorMessage: 'Por favor, preencha seu nome completo.'
      };
    }
    
    if (nomeValue.length < 3) {
      return {
        isValid: false,
        errorMessage: 'O nome deve ter pelo menos 3 caracteres.'
      };
    }
    
    return { isValid: true, errorMessage: '' };
  };

  const validarEmail = (email) => {
    const emailValue = email.trim();
    
    if (emailValue === '') {
      return {
        isValid: false,
        errorMessage: 'Por favor, preencha seu e-mail.'
      };
    }
    
    if (!emailRegex.test(emailValue)) {
      return {
        isValid: false,
        errorMessage: 'Por favor, insira um e-mail válido (exemplo@dominio.com).'
      };
    }
    
    return { isValid: true, errorMessage: '' };
  };

  const validarMensagem = (mensagem) => {
    const mensagemValue = mensagem.trim();
    const tamanho = mensagemValue.length;
    
    if (mensagemValue === '') {
      return {
        isValid: false,
        errorMessage: 'Por favor, escreva sua mensagem.'
      };
    }
    
    if (tamanho < 10) {
      return {
        isValid: false,
        errorMessage: `Sua mensagem deve ter pelo menos 10 caracteres. Faltam ${10 - tamanho} caractere(s).`
      };
    }
    
    return { isValid: true, errorMessage: '' };
  };

  // =============================================
  // Handlers de Eventos
  // =============================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'mensagem') {
      setCharCount(value.trim().length);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
      setValidFields(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let validation;

    switch (name) {
      case 'nome':
        validation = validarNome(value);
        break;
      case 'email':
        validation = validarEmail(value);
        break;
      case 'mensagem':
        validation = validarMensagem(value);
        break;
      default:
        return;
    }

    setErrors(prev => ({ ...prev, [name]: validation.errorMessage }));
    setValidFields(prev => ({ ...prev, [name]: validation.isValid }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nomeValidation = validarNome(formData.nome);
    const emailValidation = validarEmail(formData.email);
    const mensagemValidation = validarMensagem(formData.mensagem);

    setErrors({
      nome: nomeValidation.errorMessage,
      email: emailValidation.errorMessage,
      mensagem: mensagemValidation.errorMessage
    });

    setValidFields({
      nome: nomeValidation.isValid,
      email: emailValidation.isValid,
      mensagem: mensagemValidation.isValid
    });

    if (!nomeValidation.isValid || !emailValidation.isValid || !mensagemValidation.isValid) {
      return;
    }

    console.log('📧 Formulário enviado com sucesso!');
    console.log('Dados:', formData);

    setShowSuccess(true);

    setTimeout(() => {
      handleReset();
    }, 3000);
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: ''
    });
    setErrors({ nome: '', email: '', mensagem: '' });
    setValidFields({ nome: false, email: false, mensagem: false });
    setCharCount(0);
    setShowSuccess(false);
  };

  // =============================================
  // Renderização
  // =============================================

  return (
    <div className="contato-main">
      <div className="contact-container">
        
        {/* Informações de Contato */}
        <aside className="contact-info">
          <h2>Fale Conosco</h2>
          <p>Tem dúvidas, sugestões ou elogios? Preencha o formulário ao lado e entraremos em contato em breve!</p>
          
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <strong>Telefone</strong>
              <p>(11) 99999-9999</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">📧</span>
            <div>
              <strong>E-mail</strong>
              <p>contato@pizzariafatec.com.br</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <strong>Endereço</strong>
              <p>Av. FATEC, 123 - São Paulo, SP</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">🕒</span>
            <div>
              <strong>Horário</strong>
              <p>Seg-Dom: 18h às 23h</p>
            </div>
          </div>
        </aside>

        {/* Formulário de Contato */}
        <section className="contact-form">
          <h2>Envie sua Mensagem</h2>
          
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Campo Nome */}
            <div className={`form-group ${errors.nome ? 'has-error' : ''} ${validFields.nome ? 'is-valid' : ''}`}>
              <label htmlFor="nome">Nome Completo <span className="required">*</span></label>
              <input 
                type="text" 
                id="nome" 
                name="nome" 
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Digite seu nome completo"
                autoComplete="name"
              />
              {errors.nome && <span className="error-message active">{errors.nome}</span>}
            </div>

            {/* Campo E-mail */}
            <div className={`form-group ${errors.email ? 'has-error' : ''} ${validFields.email ? 'is-valid' : ''}`}>
              <label htmlFor="email">E-mail <span className="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="seu@email.com"
                autoComplete="email"
              />
              {errors.email && <span className="error-message active">{errors.email}</span>}
            </div>

            {/* Campo Telefone (opcional) */}
            <div className="form-group">
              <label htmlFor="telefone">Telefone (opcional)</label>
              <input 
                type="tel" 
                id="telefone" 
                name="telefone" 
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                autoComplete="tel"
              />
            </div>

            {/* Campo Assunto (opcional) */}
            <div className="form-group">
              <label htmlFor="assunto">Assunto</label>
              <select 
                id="assunto" 
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
              >
                <option value="">Selecione um assunto</option>
                <option value="duvida">Dúvida</option>
                <option value="sugestao">Sugestão</option>
                <option value="elogio">Elogio</option>
                <option value="reclamacao">Reclamação</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Campo Mensagem */}
            <div className={`form-group ${errors.mensagem ? 'has-error' : ''} ${validFields.mensagem ? 'is-valid' : ''}`}>
              <label htmlFor="mensagem">Mensagem <span className="required">*</span></label>
              <textarea 
                id="mensagem" 
                name="mensagem" 
                rows="6" 
                value={formData.mensagem}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Digite sua mensagem aqui (mínimo 10 caracteres)"
              ></textarea>
              <span 
                className="char-count" 
                style={{ color: charCount >= 10 ? '#10b981' : '#888' }}
              >
                {charCount} / 10 caracteres
              </span>
              {errors.mensagem && <span className="error-message active">{errors.mensagem}</span>}
            </div>

            {/* Botões */}
            <div className="form-actions">
              <button type="submit" className="btn-submit">Enviar Mensagem 📤</button>
              <button type="button" onClick={handleReset} className="btn-reset">Limpar Formulário</button>
            </div>

          </form>

          {/* Mensagem de sucesso */}
          <div className={`success-message ${showSuccess ? 'active' : ''}`}>
            <span className="success-icon">✓</span>
            <h3>Mensagem enviada com sucesso!</h3>
            <p>Agradecemos seu contato. Responderemos em breve.</p>
          </div>

        </section>

      </div>
    </div>
  );
}

export default Contato;
