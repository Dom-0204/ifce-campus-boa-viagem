// ==========================================
// MENU DE NAVEGAÇÃO (drawer mobile + dropdowns desktop)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("menu-toggle");
    const menu = document.querySelector(".cabecalho_nav");
    const overlay = document.getElementById("nav-overlay");

    if (!botao || !menu) return;

    // Inicializa o estado de acessibilidade
    botao.setAttribute("aria-expanded", "false");

    function fecharMenu() {
        menu.classList.remove("ativo");
        if (overlay) overlay.classList.remove("ativo");

        botao.innerHTML = "☰";
        botao.style.transform = "rotate(0deg)";
        botao.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }

    function abrirMenu() {
        menu.classList.add("ativo");
        if (overlay) overlay.classList.add("ativo");

        botao.innerHTML = "✕";
        botao.style.transform = "rotate(180deg)";
        botao.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }

    botao.addEventListener("click", () => {
        if (menu.classList.contains("ativo")) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener("click", fecharMenu);
    }

    // Acessibilidade: Fechar menu mobile com a tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("ativo")) {
            fecharMenu();
        }
    });

    // Accordion: cada item do menu (Ensino, Pesquisa, Extensão) abre e fecha
    // de forma independente, apenas na versão mobile (drawer lateral).
    // No desktop o clique não tem efeito porque o dropdown já abre via hover.
    document.querySelectorAll(".cabecalho_nav .dropdown > .menu-title").forEach((titulo) => {
        titulo.addEventListener("click", (e) => {
            if (window.innerWidth > 768) return;

            e.preventDefault();
            const item = titulo.parentElement;
            const jaAberto = item.classList.contains("dropdown-ativo");

            document
                .querySelectorAll(".cabecalho_nav .dropdown")
                .forEach((d) => d.classList.remove("dropdown-ativo"));

            if (!jaAberto) item.classList.add("dropdown-ativo");
        });
    });

    // Fecha o menu mobile automaticamente se a janela for redimensionada
    // para uma largura de desktop (evita drawer "preso" aberto)
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && menu.classList.contains("ativo")) {
            fecharMenu();
        }
    });
});