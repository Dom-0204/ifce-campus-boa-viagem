// ==========================================================
// SCRIPT GERAL DO PORTAL
// Funcionalidades compartilhadas por todas as páginas:
//   - Modo escuro (dark mode) persistente
//   - Scroll-spy da sidebar (páginas internas com sumário lateral)
//
// Funcionalidades específicas do menu de navegação e da busca
// estão isoladas em js/menu.js e js/busca.js — não duplicar
// aqui para evitar erros de "Identifier already declared".
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------
    // 1. MODO ESCURO (DARK MODE) PERSISTENTE
    // ----------------------------------------------------------
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-btn-icon");
    const savedTheme = localStorage.getItem("theme");

    if (themeToggleBtn) {
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            if (themeIcon) themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else if (themeIcon) {
            themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const ativo = document.body.classList.contains("dark-mode");

            localStorage.setItem("theme", ativo ? "dark" : "light");

            if (themeIcon) {
                themeIcon.innerHTML = ativo
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // ----------------------------------------------------------
    // 2. SCROLL-SPY DA SIDEBAR (CIDTS, Extensão, Contato etc.)
    // ----------------------------------------------------------
    const sidebarLinks = document.querySelectorAll(".universal-sidebar ul li a");

    if (sidebarLinks.length) {
        const sections = document.querySelectorAll(
            ".cidts-conteudo .universal-painel-card, " +
            ".universal-conteudo .universal-painel-card, " +
            ".universal-conteudo .extensao_card, " +
            ".universal-conteudo .impacto_extensao, " +
            ".universal-conteudo .projetos_extensao, " +
            ".universal-conteudo .contato-info, " +
            ".universal-conteudo .contato-setores, " +
            ".universal-conteudo .localizacao, " +
            ".universal-conteudo .formulario-contato"
        );

        function ativarLink(id) {
            sidebarLinks.forEach((link) => {
                link.classList.toggle(
                    "sidebar-link-ativo",
                    link.getAttribute("href") === `#${id}`
                );
            });
        }

        sidebarLinks.forEach((link) => {
            link.addEventListener("click", function () {
                sidebarLinks.forEach((l) => l.classList.remove("sidebar-link-ativo"));
                this.classList.add("sidebar-link-ativo");
            });
        });

        window.addEventListener("scroll", () => {
            let currentSectionId = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute("id");
                }
            });

            if (currentSectionId) ativarLink(currentSectionId);
        });
    }
});
