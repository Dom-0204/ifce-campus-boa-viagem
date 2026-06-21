document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // MENU LATERAL SELECIONADO (VERDE)
    // ==========================================
    const sidebarLinks = document.querySelectorAll(".universal-sidebar ul li a");
    const sections = Array.from(sidebarLinks)
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    function ativarLink(id) {
        sidebarLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("sidebar-link-ativo");
            } else {
                link.classList.remove("sidebar-link-ativo");
            }
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            sidebarLinks.forEach(l => l.classList.remove("sidebar-link-ativo"));
            this.classList.add("sidebar-link-ativo");
        });
    });

    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            ativarLink(currentSectionId);
        }
    });
});