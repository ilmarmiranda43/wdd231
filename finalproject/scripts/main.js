const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".primary-navigation");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector(".visually-hidden").textContent = "Open navigation";
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.querySelector(".visually-hidden").textContent = willOpen ? "Close navigation" : "Open navigation";
    navigation.classList.toggle("open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });
  navigation.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 720) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-last-modified]").forEach((element) => {
  element.textContent = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(document.lastModified));
});

const visitKey = "movewell-visits";
const visits = Number.parseInt(localStorage.getItem(visitKey) ?? "0", 10) + 1;
localStorage.setItem(visitKey, String(visits));
