const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuButton.classList.toggle("open");
    });
}