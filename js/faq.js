// ==========================================
// ACCORDION DE PERGUNTAS FREQUENTES (FAQ)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const perguntas = document.querySelectorAll(".faq-pergunta");

    perguntas.forEach((botao) => {
        botao.addEventListener("click", () => {
            const item = botao.closest(".faq-item");
            const jaAberto = item.classList.contains("faq-ativo");

            // Fecha os demais itens (comportamento de accordion exclusivo)
            document.querySelectorAll(".faq-item").forEach((outro) => {
                outro.classList.remove("faq-ativo");
            });

            if (!jaAberto) item.classList.add("faq-ativo");
        });
    });
});
