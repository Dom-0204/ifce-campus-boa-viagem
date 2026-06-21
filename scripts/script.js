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

// ==========================================
// BUSCA DO PORTAL - autocomplete client-side
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    const buscaInput = document.getElementById("busca-portal");
    const buscaSugestoes = document.getElementById("busca-sugestoes");
    const buscaBtn = document.getElementById("busca-btn");

    if (!buscaInput || !buscaSugestoes) return;

    // Índice simples das páginas do portal.
    // Adicione novas páginas aqui conforme forem criadas.
    const indicePortal = [
        { titulo: "Sobre o Curso de ADS", url: "Paginas/ads.html" },
        { titulo: "Formas de Ingresso", url: "Paginas/ingresso.html" },
        { titulo: "Bolsas", url: "Paginas/bolsas.html" },
        { titulo: "CIDTS", url: "Paginas/cidts.html" },
        { titulo: "Projetos de Pesquisa", url: "Paginas/pesquisas.html" },
        { titulo: "Extensão", url: "Paginas/extensao.html" },
        { titulo: "IFCE Internacional", url: "Paginas/ifinternacional.html" },
        { titulo: "Institucional", url: "Paginas/institucional.html" },
        { titulo: "Cursos", url: "Paginas/cursos.html" },
        { titulo: "Notícias", url: "Paginas/noticias.html" },
        { titulo: "Contato", url: "Paginas/contato.html" },
    ];

    function buscar(termoOriginal) {
        const termo = termoOriginal.trim().toLowerCase();

        if (!termo) {
            buscaSugestoes.hidden = true;
            buscaSugestoes.innerHTML = "";
            return;
        }

        const resultados = indicePortal.filter((item) =>
            item.titulo.toLowerCase().includes(termo)
        );

        if (resultados.length === 0) {
            buscaSugestoes.innerHTML = `<span class="busca-vazio">Nenhum resultado encontrado</span>`;
        } else {
            buscaSugestoes.innerHTML = resultados
                .map((r) => `<a href="${r.url}">${r.titulo}</a>`)
                .join("");
        }

        buscaSugestoes.hidden = false;
    }

    buscaInput.addEventListener("input", () => buscar(buscaInput.value));

    buscaInput.addEventListener("focus", () => {
        if (buscaInput.value.trim()) buscar(buscaInput.value);
    });

    buscaBtn.addEventListener("click", () => {
        const termo = buscaInput.value.trim().toLowerCase();
        const primeiro = indicePortal.find((item) =>
            item.titulo.toLowerCase().includes(termo)
        );
        if (primeiro) window.location.href = primeiro.url;
    });

    buscaInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") buscaBtn.click();
        if (e.key === "Escape") {
            buscaSugestoes.hidden = true;
            buscaInput.blur();
        }
    });

    // Fecha as sugestões ao clicar fora da barra de busca
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".cabecalho-busca")) {
            buscaSugestoes.hidden = true;
        }
    });
});

const botao = document.getElementById("menu-toggle");
const menu = document.querySelector(".cabecalho_nav");

botao.addEventListener("click", () => {
    menu.classList.toggle("ativo");

    if (menu.classList.contains("ativo")) {
        botao.innerHTML = "✕";
        botao.style.transform = "rotate(180deg)";
    } else {
        botao.innerHTML = "☰";
        botao.style.transform = "rotate(0deg)";
    }
});

const botao = document.getElementById("menu-toggle");
const menu = document.querySelector(".cabecalho_nav");

if (botao && menu) {
    botao.addEventListener("click", () => {
        menu.classList.toggle("ativo");

        if (menu.classList.contains("ativo")) {
            botao.innerHTML = "✕";
            botao.style.transform = "rotate(180deg)";
        } else {
            botao.innerHTML = "☰";
            botao.style.transform = "rotate(0deg)";
        }
    });
}