// ==========================================
// BUSCA DO PORTAL - autocomplete client-side
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    const buscaInput = document.getElementById("busca-portal");
    const buscaSugestoes = document.getElementById("busca-sugestoes");
    const buscaBtn = document.getElementById("busca-btn");

    if (!buscaInput || !buscaSugestoes || !buscaBtn) {
        console.warn(
            "Busca do portal: elemento ausente no HTML.",
            { buscaInput, buscaSugestoes, buscaBtn }
        );
        return;
    }

    // Índice simples das páginas do portal.
    // Adicione novas páginas aqui conforme forem criadas.
    const indicePortal = [
        { titulo: "Sobre o Curso de ADS", url: "Paginas/ads.html" },
        { titulo: "Professores", url: "Paginas/professores.html" },
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
        { titulo: "Links Úteis", url: "Paginas/links-uteis.html" },
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

    function irParaPrimeiroResultado() {
        const termo = buscaInput.value.trim().toLowerCase();
        if (!termo) return;
        const primeiro = indicePortal.find((item) =>
            item.titulo.toLowerCase().includes(termo)
        );
        if (primeiro) window.location.href = primeiro.url;
    }

    buscaBtn.addEventListener("click", irParaPrimeiroResultado);

    buscaInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            irParaPrimeiroResultado();
        }
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
