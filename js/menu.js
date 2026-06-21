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

const barraPesquisa = document.querySelector(".barra-de-pesquisa");
const inputPesquisa = document.querySelector("#inputpesquisa");

barraPesquisa.addEventListener("click", () => {

    barraPesquisa.classList.add("aberta");

    inputPesquisa.focus();

});

document.addEventListener("click", (e) => {

    if (!barraPesquisa.contains(e.target)) {

        barraPesquisa.classList.remove("aberta");

        inputPesquisa.blur();

    }

});