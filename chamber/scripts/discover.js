const cardsContainer = document.getElementById("discoverCards");
const visitMessage = document.getElementById("visitMessage");

function showVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - Number(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

async function loadCards() {
  const response = await fetch("data/discover.json");
  const data = await response.json();

  data.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `discover-card card-${index + 1}`;

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    cardsContainer.appendChild(card);
  });
}

showVisitMessage();
loadCards();