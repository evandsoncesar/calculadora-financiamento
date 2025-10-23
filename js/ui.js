// Gerenciamento da Interface do Usuário

class UIManager {
   constructor() {
      this.form = null;
      this.institutionSelect = null;
      this.institutionSearch = null;
      this.rateDisplay = null;
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
      this.institutionSelect = document.getElementById('institution-select');
      this.institutionSearch = document.getElementById('institution-search');
      this.rateDisplay = document.getElementById('rate-display');

      this.renderForm();
      this.setupInstitutionSearch();
      this.setupInstitutionSelect();
   }

   renderForm() {
      const formHTML = `
         <!-- Valor Total do Veículo -->
         <div>
            <label for="total-value" class="flex items-center text-sm font-semibold text-slate-700 mb-2 dark:text-slate-200">
               <svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"></path>
               </svg>
               Valor Total do Veículo
            </label>
            <div class="relative">
               <span class="absolute left-4 top-3.5 text-slate-500 dark:text-slate-400 font-semibold pointer-events-none">R$</span>
               <input type="number" id="total-value" step="0.01" min="0" class="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 dark:focus:ring-blue-600 transition-smooth" placeholder="60000.00" required>
            </div>
         </div>

         <!-- Valor de Entrada -->
         <div>
            <label for="down-payment" class="flex items-center text-sm font-semibold text-slate-700 mb-2 dark:text-slate-200">
               <svg class="w-4 h-4 mr-2 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path d="M12 8v8m-4-4h8M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
               </svg>
               Valor de Entrada
            </label>
            <div class="relative">
               <span class="absolute left-4 top-3.5 text-slate-500 dark:text-slate-400 font-semibold pointer-events-none">R$</span>
               <input type="number" id="down-payment" step="0.01" min="0" class="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 dark:focus:ring-green-600 transition-smooth" placeholder="15000.00" required>
            </div>
         </div>

         <!-- Instituição Financeira -->
         <div>
            <label for="institution-search" class="flex items-center text-sm font-semibold text-slate-700 mb-2 dark:text-slate-200">
               <svg class="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
               </svg>
               Instituição Financeira
            </label>
            <input type="text" id="institution-search" placeholder="Buscar instituição..." class="w-full px-4 py-3 mb-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 dark:focus:ring-purple-600 transition-smooth">
            <select id="institution-select" class="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:focus:ring-purple-600 transition-smooth" required>
               <option value="">Selecione uma instituição...</option>
            </select>
            <div id="rate-display" class="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg border border-purple-200 dark:border-purple-700 hidden">
               <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Taxa Anual:</span>
                  <span id="rate-annual" class="text-lg font-bold text-purple-700 dark:text-purple-300"></span>
               </div>
               <div class="flex items-center justify-between mt-2">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Taxa Mensal:</span>
                  <span id="rate-monthly" class="text-lg font-bold text-blue-700 dark:text-blue-300"></span>
               </div>
            </div>
         </div>

         <!-- Número de Parcelas -->
         <div>
            <label for="installments" class="flex items-center text-sm font-semibold text-slate-700 mb-2 dark:text-slate-200">
               <svg class="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
               </svg>
               Número de Parcelas
            </label>
            <input type="number" id="installments" min="1" max="84" value="60" class="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 dark:focus:ring-orange-600 transition-smooth" required>
         </div>

         <!-- Botão Calcular -->
         <button type="submit" class="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-smooth flex items-center justify-center gap-2">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
               <polyline points="12 1 22 8 22 16 12 23 2 16 2 8 12 1"></polyline>
               <polyline points="2 8 12 14 22 8"></polyline>
               <polyline points="12 14 12 23"></polyline>
            </svg>
            Calcular Financiamento
         </button>
      `;

      this.form.innerHTML = formHTML;
      this.institutionSelect = document.getElementById('institution-select');
      this.institutionSearch = document.getElementById('institution-search');
      this.rateDisplay = document.getElementById('rate-display');
   }

   setupInstitutionSearch() {
      this.institutionSearch.addEventListener('input', (e) => {
         const searchTerm = e.target.value.toLowerCase();
         const options = this.institutionSelect.querySelectorAll('option');
         let found = false;

         options.forEach(option => {
            if (option.value === '') return;
            const text = option.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
               option.style.display = '';
               found = true;
            } else {
               option.style.display = 'none';
            }
         });

         if (found && searchTerm.length > 0) {
            for (let option of options) {
               if (option.style.display !== 'none' && option.value !== '') {
                  this.institutionSelect.value = option.value;
                  this.updateRateDisplay();
                  break;
               }
            }
         }
      });
   }

   setupInstitutionSelect() {
      fetch('dados_bancarios.json')
         .then(response => {
            if (!response.ok) {
               throw new Error('Erro ao carregar os dados dos bancos.');
            }
            return response.json();
         })
         .then(bankData => {
            // Preencher select com dados
            bankData.forEach(bank => {
               const option = document.createElement('option');
               option.value = bank.taxa_anual;
               option.dataset.instituicao = bank.instituicao;
               option.dataset.taxaMensal = bank.taxa_mensal;
               option.textContent = `${bank.posicao}. ${bank.instituicao}`;
               this.institutionSelect.appendChild(option);
            });

            this.institutionSelect.addEventListener('change', () => this.updateRateDisplay());
         })
         .catch(error => {
            console.error('Falha na requisição:', error);
            const calculator = new FinancingCalculator();
            calculator.showError('Não foi possível carregar a lista de instituições financeiras.');
         });
   }

   updateRateDisplay() {
      const selectedOption = this.institutionSelect.options[this.institutionSelect.selectedIndex];
      if (selectedOption.value === '') {
         this.rateDisplay.classList.add('hidden');
         return;
      }

      document.getElementById('rate-annual').textContent = selectedOption.value;
      document.getElementById('rate-monthly').textContent = selectedOption.dataset.taxaMensal;
      this.rateDisplay.classList.remove('hidden');
   }
}

// Inicializar gerenciador de UI
const uiManager = new UIManager();

