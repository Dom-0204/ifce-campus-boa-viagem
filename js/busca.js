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

    // Função utilitária para remover acentos e ignorar maiúsculas/minúsculas
    const normalizarTexto = (texto) => {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    // Índice do portal padronizado
    const indicePortal = [
        { titulo: "Sobre o Curso de ADS", url: "Paginas/ads.html", tags: "tecnologia programacao grade matriz" },
        { titulo: "Professores", url: "Paginas/professores.html", tags: "docentes corpo coordenacao" },
        { titulo: "Formas de Ingresso", url: "Paginas/ingresso.html", tags: "sisu enem matricula entrar" },
        { titulo: "CIDTS", url: "Paginas/cidts.html", tags: "inovacao centro" },
        { titulo: "Projetos de Pesquisa", url: "Paginas/pesquisas.html", tags: "ciencia artigos publicacoes" },
        { titulo: "Extensão", url: "Paginas/extensao.html", tags: "comunidade sociedade" },
        { titulo: "IFCE Internacional", url: "Paginas/ifinternacional.html", tags: "intercambio exterior" },
        { titulo: "Institucional", url: "Paginas/institucional.html", tags: "campus boa viagem historia" },
        { titulo: "Cursos", url: "Paginas/cursos.html", tags: "tecnico superior graduacao" },
        { titulo: "Contato", url: "Paginas/contato.html", tags: "telefone email localizacao mapa falar" },
        { titulo: "Links Úteis", url: "Paginas/links-uteis.html", tags: "suap q-academico biblioteca" },
    ];

    // CORREÇÃO MESTRE: Validação de rota agora ignora se "paginas" está maiúsculo ou minúsculo
    function obterUrlCorrigida(urlOriginal) {
        if (urlOriginal.startsWith("#")) return urlOriginal;

        const estouEmPaginas = window.location.pathname.toLowerCase().includes("/paginas/");
        let urlCorrigida = urlOriginal;

        if (estouEmPaginas) {
            if (urlCorrigida.startsWith("Paginas/")) {
                urlCorrigida = urlCorrigida.replace("Paginas/", "");
            } else if (urlCorrigida === "index.html") {
                urlCorrigida = "../index.html"; // Garante retorno correto para a raiz de qualquer lugar
            }
        } else {
            if (!urlCorrigida.startsWith("Paginas/") && urlCorrigida !== "index.html") {
                urlCorrigida = "Paginas/" + urlCorrigida;
            }
        }
        return urlCorrigida;
    }

    function buscar(termoOriginal) {
        const termoOriginalLimpo = termoOriginal.trim();
        const termoNormalizado = normalizarTexto(termoOriginalLimpo);

        if (!termoNormalizado) {
            buscaSugestoes.hidden = true;
            buscaSugestoes.innerHTML = "";
            return;
        }

        const resultados = indicePortal.filter((item) => {
            const tituloNormalizado = normalizarTexto(item.titulo);
            const tagsNormalizadas = normalizarTexto(item.tags || "");
            return tituloNormalizado.includes(termoNormalizado) || tagsNormalizadas.includes(termoNormalizado);
        });

        if (resultados.length === 0) {
            buscaSugestoes.innerHTML = `<span class="busca-vazio">Nenhum resultado encontrado</span>`;
        } else {
            buscaSugestoes.innerHTML = resultados
                .map((r) => {
                    const urlFinal = obterUrlCorrigida(r.url);
                    return `<a href="${urlFinal}">${r.titulo}</a>`;
                })
                .join("");
        }

        buscaSugestoes.hidden = false;
    }

    buscaInput.addEventListener("input", () => buscar(buscaInput.value));

    buscaInput.addEventListener("focus", () => {
        if (buscaInput.value.trim()) buscar(buscaInput.value);
    });

    function irParaPrimeiroResultado() {
        const termoOriginalLimpo = buscaInput.value.trim();
        if (!termoOriginalLimpo) return;

        const termoNormalizado = normalizarTexto(termoOriginalLimpo);

        const primeiro = indicePortal.find((item) => {
            const tituloNormalizado = normalizarTexto(item.titulo);
            const tagsNormalizadas = normalizarTexto(item.tags || "");
            return tituloNormalizado.includes(termoNormalizado) || tagsNormalizadas.includes(termoNormalizado);
        });

        if (primeiro) {
            window.location.href = obterUrlCorrigida(primeiro.url);
        }
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

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".cabecalho-busca")) {
            buscaSugestoes.hidden = true;
        }
    });
});