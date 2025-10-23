// Lógica de Cálculo de Financiamento

class FinancingCalculator {
   constructor() {
      this.form = null;
      this.resultContainer = null;
      this.errorMessage = null;
      this.currentResults = null;
      this.init();
   }

   init() {
      if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
         this.setup();
      }
   }

   setup() {
      this.form = document.getElementById('financing-form');
      this.resultContainer = document.getElementById('result-container');
      this.errorMessage = document.getElementById('error-message');

      if (this.form) {
         this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }
   }

   handleSubmit(event) {
      event.preventDefault();

      // Limpar mensagens anteriores
      this.resultContainer.classList.add('hidden');
      this.errorMessage.classList.add('hidden');

      // Obter valores
      const totalValue = parseFloat(document.getElementById('total-value').value);
      const downPayment = parseFloat(document.getElementById('down-payment').value);
      const institutionSelect = document.getElementById('institution-select');
      const selectedOption = institutionSelect.options[institutionSelect.selectedIndex];
      const institution = selectedOption.dataset.instituicao;
      const annualRateString = institutionSelect.value;
      const annualRate = this.parseRate(annualRateString);
      const n = parseInt(document.getElementById('installments').value);

      // Validar
      if (!this.validate(totalValue, downPayment, annualRate, n)) {
         return;
      }

      // Calcular
      const results = this.calculate(totalValue, downPayment, annualRate, n);

      // Armazenar os resultados atuais para salvar no histórico
      this.currentResults = {
         totalValue,
         downPayment,
         institution,
         installments: n,
         ...results
      };

      // Exibir resultados
      this.displayResults(results);
   }

   validate(totalValue, downPayment, annualRate, n) {
      if (isNaN(totalValue) || isNaN(downPayment) || totalValue <= 0 || downPayment < 0) {
         this.showError('Por favor, preencha os campos de valor com números positivos.');
         return false;
      }
      if (isNaN(annualRate)) {
         this.showError('Por favor, selecione uma instituição financeira.');
         return false;
      }
      if (downPayment >= totalValue) {
         this.showError('O valor de entrada deve ser menor que o valor total do veículo.');
         return false;
      }
      if (isNaN(n) || n < 1 || n > 84) {
         this.showError('O número de parcelas deve estar entre 1 e 84.');
         return false;
      }
      return true;
   }

   calculate(totalValue, downPayment, annualRate, n) {
      const financedValue = totalValue - downPayment;

      // Cálculo do IOF
      const iofFixedRate = 0.0038; // 0,38%
      const iofDailyRate = 0.000082; // 0,0082% ao dia
      const maxDays = Math.min(n * 30, 365);

      const iofFixed = financedValue * iofFixedRate;
      const iofDaily = financedValue * iofDailyRate * maxDays;
      const totalIOF = iofFixed + iofDaily;

      // Conversão de taxa anual para mensal
      const monthlyRate = Math.pow(1 + (annualRate / 100), 1 / 12) - 1;

      // Cálculo da parcela
      let installmentValue;
      if (monthlyRate === 0) {
         installmentValue = financedValue / n;
      } else {
         const numerator = monthlyRate * Math.pow(1 + monthlyRate, n);
         const denominator = Math.pow(1 + monthlyRate, n) - 1;
         installmentValue = financedValue * (numerator / denominator);
      }

      const totalPaid = downPayment + (installmentValue * n);
      const totalInterest = totalPaid - totalValue;

      return {
         financedValue,
         installmentValue,
         totalPaid,
         totalInterest,
         totalIOF,
         totalWithIOF: totalPaid + totalIOF
      };
   }

   displayResults(results) {
      const resultsHTML = `
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Valor Financiado -->
            <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg border border-blue-200 dark:border-blue-700">
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Valor Financiado:</span>
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                     <path d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"></path>
                  </svg>
               </div>
               <span id="financed-value" class="text-2xl font-bold text-blue-700 dark:text-blue-300 block mt-2"></span>
            </div>

            <!-- Valor da Parcela -->
            <div class="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border border-green-200 dark:border-green-700">
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Valor da Parcela:</span>
                  <svg class="w-5 h-5 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                     <path d="M12 8v8m-4-4h8M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
               </div>
               <span id="installment-value" class="text-2xl font-bold text-green-700 dark:text-green-300 block mt-2"></span>
            </div>

            <!-- Total Pago -->
            <div class="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg border border-purple-200 dark:border-purple-700">
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Total Pago:</span>
                  <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                  </svg>
               </div>
               <span id="total-paid" class="text-2xl font-bold text-purple-700 dark:text-purple-300 block mt-2"></span>
            </div>

            <!-- Total de Juros -->
            <div class="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg border border-red-200 dark:border-red-700">
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Total de Juros:</span>
                  <svg class="w-5 h-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                     <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                     <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
               </div>
               <span id="total-interest" class="text-2xl font-bold text-red-700 dark:text-red-300 block mt-2"></span>
            </div>

            <!-- Total IOF -->
            <div class="p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg border border-amber-200 dark:border-amber-700">
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Total IOF:</span>
                  <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                     <circle cx="12" cy="12" r="10"></circle>
                     <path d="M12 6v6l4 2"></path>
                  </svg>
               </div>
               <span id="total-iof" class="text-2xl font-bold text-amber-700 dark:text-amber-300 block mt-2"></span>
            </div>
         </div>
         <div class="mt-6 text-center">
            <button id="save-history" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-smooth">Salvar no Histórico</button>
         </div>
      `;

      this.resultContainer.innerHTML = resultsHTML;
      this.resultContainer.classList.remove('hidden');
      this.resultContainer.classList.add('animate-fadeIn');

      // Preencher valores
      document.getElementById('financed-value').textContent = this.formatCurrency(results.financedValue);
      document.getElementById('installment-value').textContent = this.formatCurrency(results.installmentValue);
      document.getElementById('total-paid').textContent = this.formatCurrency(results.totalPaid);
      document.getElementById('total-interest').textContent = this.formatCurrency(results.totalInterest);
      document.getElementById('total-iof').textContent = this.formatCurrency(results.totalIOF);

      // Adicionar listener para o botão de salvar
      document.getElementById('save-history').addEventListener('click', () => this.saveToHistory());
   }

   saveToHistory() {
      if (!this.currentResults) {
         this.showError("Nenhum resultado para salvar.");
         return;
      }

      const history = JSON.parse(localStorage.getItem('financingHistory')) || [];
      
      const newEntry = {
         ...this.currentResults,
         timestamp: new Date().toISOString()
      };

      history.push(newEntry);
      localStorage.setItem('financingHistory', JSON.stringify(history));

      // Feedback para o usuário
      const saveButton = document.getElementById('save-history');
      saveButton.textContent = 'Salvo!';
      saveButton.disabled = true;
      setTimeout(() => {
         saveButton.textContent = 'Salvar no Histórico';
         saveButton.disabled = false;
      }, 2000);
   }

   parseRate(rateString) {
      return parseFloat(rateString.replace('%', '').replace(',', '.'));
   }

   formatCurrency(value) {
      return value.toLocaleString('pt-BR', {
         style: 'currency',
         currency: 'BRL'
      });
   }

   showError(message) {
      this.errorMessage.textContent = message;
      this.errorMessage.classList.remove('hidden');
   }
}

// Inicializar calculadora
const calculator = new FinancingCalculator();

