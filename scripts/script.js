document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MODO ESCURO (DARK MODE) PERSISTENTE - COM ÍCONES VETORIAIS
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-btn-icon");
    const savedTheme = localStorage.getItem("theme");

    // Aplica o tema salvo ao carregar a página (injetando a tag do ícone)
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeIcon) {
            themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Sol em vetor
        }
    } else {
        if (themeIcon) {
            themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Lua em vetor
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            if (themeIcon) {
                themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Injeta o Sol em vetor no clique
            }
        } else {
            localStorage.setItem("theme", "light");
            if (themeIcon) {
                themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Injeta a Lua em vetor no clique
            }
        }
    });

    // ==========================================
    // 2. MENU LATERAL SELECIONADO (VERDE) ... REGRAS SEGUEM IGUAIS ABAIXO
    // ==========================================
    const sidebarLinks = document.querySelectorAll(".universal-sidebar ul li a");
    const sections = document.querySelectorAll(".cidts-conteudo .universal-painel-card, .universal-conteudo .universal-painel-card, .universal-conteudo .extensao_card, .universal-conteudo .impacto_extensao, .universal-conteudo .projetos_extensao, .universal-conteudo .contato-info, .universal-conteudo .contato-setores, .universal-conteudo .localizacao, .universal-conteudo .formulario-contato");
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