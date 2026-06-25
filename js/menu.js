document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("menu-toggle");
    const menu = document.querySelector(".cabecalho_nav");
    const overlay = document.getElementById("nav-overlay");

    if (!botao || !menu) return;

    botao.setAttribute("aria-expanded", "false");

    function fecharMenu() {
        menu.classList.remove("ativo");
        overlay?.classList.remove("ativo");

        document.querySelectorAll(".dropdown").forEach(dropdown => {
            dropdown.classList.remove("dropdown-ativo");
        });

        botao.innerHTML = "☰";
        botao.style.transform = "rotate(0deg)";
        botao.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }

    function abrirMenu() {
        menu.classList.add("ativo");
        overlay?.classList.add("ativo");

        botao.innerHTML = "✕";
        botao.style.transform = "rotate(180deg)";
        botao.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }

    // Menu hambúrguer
    botao.addEventListener("click", () => {
        if (menu.classList.contains("ativo")) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });

    // Overlay{ titulo: "Cursos", url: "Paginas/cursos.html", tags: "tecnico superior graduacao" },
    overlay?.addEventListener("click", fecharMenu);

    // ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            fecharMenu();
        }
    });

    // Dropdowns do mobile
    document.querySelectorAll(".cabecalho_nav_ancoras").forEach((link) => {
        link.addEventListener("click", (e) => {

            if (window.innerWidth > 768) return;

            const dropdown = link.closest(".dropdown");

            if (!dropdown) return;

            e.preventDefault();

            const aberto = dropdown.classList.contains("dropdown-ativo");

            // Fecha os outros
            document.querySelectorAll(".dropdown").forEach((item) => {
                item.classList.remove("dropdown-ativo");
            });

            // Abre o clicado
            if (!aberto) {
                dropdown.classList.add("dropdown-ativo");
            }
        });
    });

    // Fecha ao voltar para desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            fecharMenu();
        }
    });
});