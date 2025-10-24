// Aplicação do tema escuro fixo

// Função para aplicar o tema escuro
function applyDarkTheme() {
  // Forçar tema escuro sempre
  localStorage.setItem("theme", "dark");
  document.documentElement.classList.add("dark");
  
  // Aplicar estilos específicos para o tema escuro
  document.body.style.background = 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)';
}

// Aplicar tema escuro imediatamente
applyDarkTheme();

// Garantir que o tema escuro seja aplicado quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyDarkTheme);
} else {
  applyDarkTheme();
}
