# Calculadora de Financiamento de Veículos

Uma aplicação web moderna para calcular financiamento de veículos com suporte a tema claro/escuro, busca de instituições financeiras e cálculo preciso do IOF.

## 📁 Estrutura do Projeto

```
calculadora financiamento/
├── index.html              # Arquivo HTML principal
├── css/
│   └── styles.css         # Estilos customizados
├── js/
│   ├── data.js            # Dados das 43 instituições financeiras
│   ├── theme.js           # Gerenciamento de tema (dark/light)
│   ├── ui.js              # Interface do usuário
│   └── calculator.js      # Lógica de cálculo
└── README.md              # Este arquivo
```

## 🚀 Como Usar

### 1. Iniciar o Servidor

```bash
# Na pasta do projeto
python -m http.server 8888
```

Depois acesse: `http://localhost:8888`

### 2. Usar a Aplicação

1. **Preencha os campos:**
   - Valor Total do Veículo (R$)
   - Valor de Entrada (R$)
   - Selecione uma Instituição Financeira
   - Número de Parcelas (1-84)

2. **Busque uma instituição:**
   - Digite o nome do banco no campo de busca
   - A lista filtra em tempo real

3. **Clique em "Calcular Financiamento"**

4. **Veja os resultados:**
   - Valor Financiado
   - Valor da Parcela
   - Total Pago
   - Total de Juros
   - Total IOF

## 🎨 Tema Claro/Escuro

Clique no botão no canto superior direito para alternar entre:
- ☀️ **Modo Claro** (padrão)
- 🌙 **Modo Escuro**

O tema é salvo no localStorage e persiste entre sessões.

## 💰 Cálculos Implementados

### IOF (Imposto sobre Operações Financeiras)
- **Alíquota Fixa:** 0,38% sobre o valor financiado
- **Alíquota Diária:** 0,0082% ao dia (máximo 365 dias)
- **Total IOF:** Fixa + Diária

### Parcelas (Tabela Price)
- **Fórmula:** PMT = PV × [i × (1 + i)^n] / [(1 + i)^n - 1]
- Onde:
  - PV = Valor Presente (valor financiado)
  - i = Taxa de juros mensal
  - n = Número de parcelas

### Conversão de Taxa
- **De Anual para Mensal:** i = (1 + TaxaAnual/100)^(1/12) - 1

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Mobile:** < 640px
- **Tablet:** 640px - 768px
- **Desktop:** > 768px

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura
- **Tailwind CSS** - Estilos (via CDN)
- **JavaScript (ES6+)** - Lógica
- **Feather Icons** - Ícones (via CDN)

## 📊 Instituições Financeiras

A aplicação inclui 43 instituições financeiras com suas respectivas taxas:
- Banco do Brasil
- Caixa Econômica Federal
- Itaú Unibanco
- Bradesco
- Santander
- E muitas outras...

## ✨ Funcionalidades

✅ Tema claro/escuro com persistência
✅ Busca de instituições em tempo real
✅ Cálculo preciso do IOF
✅ Cálculo de parcelas (Tabela Price)
✅ Interface responsiva
✅ Validação de dados
✅ Mensagens de erro claras
✅ Código modular e organizado

## 🐛 Troubleshooting

### Tema não muda?
1. Abra o console do navegador (F12)
2. Verifique se há erros
3. Limpe o cache do navegador (Ctrl+Shift+Delete)
4. Recarregue a página (Ctrl+F5)

### Busca não funciona?
1. Verifique se digitou corretamente
2. Tente com parte do nome do banco
3. Recarregue a página

### Cálculos incorretos?
1. Verifique se preencheu todos os campos
2. Verifique se selecionou uma instituição
3. Verifique se o número de parcelas está entre 1 e 84

## 📝 Notas Importantes

- Valores são simulados e podem variar conforme análise de crédito
- O IOF é incluído no cálculo total
- Máximo de 84 parcelas
- Mínimo de 1 parcela

## 👨‍💻 Desenvolvimento

Cada arquivo JavaScript tem uma responsabilidade específica:

- **data.js** - Dados estáticos
- **theme.js** - Gerenciamento de tema
- **ui.js** - Renderização da interface
- **calculator.js** - Lógica de cálculo

## 📄 Licença

Projeto livre para uso pessoal e comercial.

