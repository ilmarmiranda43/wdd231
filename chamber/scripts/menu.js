const menuButton = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");
menuButton.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuButton.textContent = isOpen ? "✕" : "☰";
});
