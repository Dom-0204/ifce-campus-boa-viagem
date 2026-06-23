const buttons = document.querySelectorAll(".botao-pop-up");
const dialogs = document.querySelectorAll("dialog");

buttons.forEach((button, index) => {
    button.onclick = function () {
        dialogs[index].showModal();
    };
});

dialogs.forEach((dialog) => {
    const buttonClose = dialog.querySelector("button");
    buttonClose.onclick = function () {
        dialog.close();
    };
});