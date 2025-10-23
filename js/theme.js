// Gerenciamento de Tema (Dark Mode / Light Mode)

class ThemeManager {
  constructor() {
    this.docElement = document.documentElement;
    this.themeToggleBtn = null;
    this.sunIcon = null;
    this.moonIcon = null;
    this.init();
  }

  init() {
    // Aplicar tema imediatamente para evitar flash de conteúdo sem estilo
    this.applyInitialTheme();

    // Configurar listeners e ícones quando o DOM estiver pronto
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.themeToggleBtn = document.getElementById("theme-toggle");
    this.sunIcon = document.getElementById("theme-toggle-sun");
    this.moonIcon = document.getElementById("theme-toggle-moon");

    if (!this.themeToggleBtn) {
      console.warn("Botão de tema não encontrado");
      return;
    }

    // Adicionar listener ao botão
    this.themeToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleTheme();
    });

    // Atualizar ícones para refletir o tema inicial
    this.updateIconsDisplay();
  }

  applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      this.docElement.classList.add("dark");
    } else {
      this.docElement.classList.remove("dark");
    }
  }

  toggleTheme() {
    this.docElement.classList.toggle("dark");

    if (this.docElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    this.updateIconsDisplay();
  }

  updateIconsDisplay() {
    if (!this.sunIcon || !this.moonIcon) return;

    const isDark = this.docElement.classList.contains("dark");

    if (isDark) {
      this.sunIcon.classList.add("hidden");
      this.moonIcon.classList.remove("hidden");
    } else {
      this.sunIcon.classList.remove("hidden");
      this.moonIcon.classList.add("hidden");
    }
  }
}

// Inicializar gerenciador de tema imediatamente
const themeManager = new ThemeManager();
