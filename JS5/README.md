# 🍕 Pizzaria FATEC - Aplicação React

Aplicação web completa desenvolvida em React que combina um sistema de carrinho de compras de pizzaria com formulário de contato.

## 📋 Funcionalidades

### Página de Cardápio (Pizzaria)
- ✅ **Cardápio de pizzas** - 6 opções de pizzas com emojis, nomes e preços
- ✅ **Carrinho de compras** - Adicionar/remover itens
- ✅ **LocalStorage** - Salvamento automático do carrinho
- ✅ **Modal de finalização** - Resumo detalhado do pedido
- ✅ **Agrupamento inteligente** - Conta quantidades de pizzas iguais
- ✅ **Cálculo de totais** - Atualização em tempo real

### Página de Contato
- ✅ **Formulário de contato** com validação
- ✅ **Validação em tempo real** (blur e submit)
- ✅ **Validação de email** com regex
- ✅ **Contador de caracteres** para mensagem
- ✅ **Feedback visual** - estados de erro e sucesso
- ✅ **Mensagem de confirmação** com animação
- ✅ **Design responsivo**

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript
- **Vite** - Build tool e dev server
- **Hooks** - useState, useEffect
- **CSS3** - Estilização moderna
- **LocalStorage API** - Persistência de dados

## 📂 Estrutura do Projeto

```
JS5/
├── src/
│   ├── components/
│   │   ├── Pizzaria.jsx    # Componente do cardápio e carrinho
│   │   └── Contato.jsx     # Componente do formulário
│   ├── styles/
│   │   ├── Pizzaria.css    # Estilos do cardápio
│   │   └── Contato.css     # Estilos do contato
│   ├── App.jsx             # Componente principal com navegação
│   ├── App.css             # Estilos globais e navegação
│   ├── main.jsx            # Entry point
│   └── index.css           # Reset CSS
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 💡 Conceitos React Aplicados

### Hooks
- **useState** - Gerenciamento de estado local
- **useEffect** - Efeitos colaterais (localStorage)

### Eventos
- **onClick** - Navegação e ações de botões
- **onChange** - Atualização de campos de formulário
- **onBlur** - Validação ao sair do campo
- **onSubmit** - Validação no envio do formulário

### Renderização Condicional
- Exibição de páginas baseada em estado
- Mensagens de erro/sucesso
- Modal do pedido
- Lista vazia vs. lista com itens

### Listas e Keys
- Renderização de pizzas no cardápio
- Itens do carrinho
- Campos do formulário

## 📱 Recursos

- Design responsivo para mobile e desktop
- Animações CSS suaves
- Feedback visual imediato
- Persistência de dados com localStorage
- Interface intuitiva e moderna

## 🎨 Paleta de Cores

### Pizzaria
- Primária: `#2563eb` (Azul)
- Fundo: `#eff6ff` (Azul claro)
- Sucesso: `#10b981` (Verde)
- Alerta: `#f97316` (Laranja)

### Contato
- Primária: `#667eea` (Roxo)
- Gradiente: `#764ba2`
- Erro: `#e74c3c` (Vermelho)
- Sucesso: `#10b981` (Verde)

## 📝 Validações Implementadas

### Nome
- Não pode estar vazio
- Mínimo de 3 caracteres

### Email
- Não pode estar vazio
- Formato válido (regex)

### Mensagem
- Não pode estar vazia
- Mínimo de 10 caracteres

## 🔄 Migração de JavaScript Vanilla para React

Este projeto foi migrado de JavaScript vanilla (JS3 e JS4) para React, aplicando:

- **Manipulação de DOM** → **Estado do React**
- **Event listeners** → **Event handlers**
- **innerHTML** → **JSX**
- **Funções globais** → **Funções de componente**
- **Classes CSS dinâmicas** → **Template literals com estado**

## 👨‍💻 Autor

Projeto desenvolvido para a disciplina de Frontend - FATEC

## 📄 Licença

Este projeto é de uso educacional.
