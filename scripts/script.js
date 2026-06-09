document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MODO ESCURO (DARK MODE) PERSISTENTE
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-btn-icon");
    const savedTheme = localStorage.getItem("theme");

    // Aplica o tema salvo ao carregar a página
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeIcon) themeIcon.textContent = "☀️";
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            if (themeIcon) themeIcon.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            if (themeIcon) themeIcon.textContent = "🌙";
        }
    });

    // ==========================================
    // 2. MENU LATERAL SELECIONADO (VERDE)
    // ==========================================
    const sidebarLinks = document.querySelectorAll(".universal-sidebar ul li a");
    const sections = document.querySelectorAll(".lisa-conteudo .universal-painel-card");

    // Função para ativar o link correto baseado no ID
    function ativarLink(id) {
        sidebarLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("sidebar-link-ativo");
            } else {
                link.classList.remove("sidebar-link-ativo");
            }
        });
    }

    // Clique manual nos links da sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            sidebarLinks.forEach(l => l.classList.remove("sidebar-link-ativo"));
            this.classList.add("sidebar-link-ativo");
        });
    });

    // BÔNUS: Ativa o menu verde conforme o usuário rola a página (Scroll)
    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Ajuste para a altura do cabeçalho fixo
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            ativarLink(currentSectionId);
        }
    });
});