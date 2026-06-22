// ==========================================
// ACCORDION DE PERGUNTAS FREQUENTES (FAQ) E DISCIPLINAS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const perguntas = document.querySelectorAll(".faq-pergunta");

    if (perguntas.length === 0) {
        console.warn("Nenhum item de FAQ/Disciplina encontrado nesta página.");
        return;
    }

    perguntas.forEach((botao) => {
        botao.addEventListener("click", () => {
            const item = botao.closest(".faq-item");
            const jaAberto = item.classList.contains("faq-ativo");

            // Fecha todos os outros itens (efeito sanfona/accordion)
            document.querySelectorAll(".faq-item").forEach((outro) => {
                outro.classList.remove("faq-ativo");
                const outroBotao = outro.querySelector(".faq-pergunta");
                if (outroBotao) outroBotao.setAttribute("aria-expanded", "false");
            });

            // Se o item que eu cliquei estava fechado, ele abre agora
            if (!jaAberto) {
                item.classList.add("faq-ativo");
                botao.setAttribute("aria-expanded", "true");
            }
        });
    });
});