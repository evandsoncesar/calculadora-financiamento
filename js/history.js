document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#history-table tbody');
    const noHistoryMessage = document.getElementById('no-history');
    const exportButton = document.getElementById('export-json');
    const clearButton = document.getElementById('clear-history');

    const history = JSON.parse(localStorage.getItem('financingHistory')) || [];

    if (history.length === 0) {
        noHistoryMessage.classList.remove('hidden');
        tableBody.parentElement.classList.add('hidden');
    } else {
        history.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${new Date(item.timestamp).toLocaleString('pt-BR')}</td>
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${formatCurrency(item.totalValue)}</td>
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${formatCurrency(item.downPayment)}</td>
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${item.institution}</td>
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${item.installments}</td>
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${formatCurrency(item.installmentValue)}</td>
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${formatCurrency(item.totalPaid)}</td>
                <td class="p-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">${formatCurrency(item.totalInterest)}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    exportButton.addEventListener('click', () => {
        const dataStr = JSON.stringify(history, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = 'history.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    });

    clearButton.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            localStorage.removeItem('financingHistory');
            location.reload();
        }
    });

    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
});
