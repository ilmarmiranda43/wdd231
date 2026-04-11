const cardsContainer = document.getElementById("discoverCards");
const visitMessage = document.getElementById("visitMessage");

function displayVisitMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = now - Number(lastVisit);
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}

function createCard(item, index) {
    const card = document.createElement("article");
    card.classList.add("discover-card", `card-${index + 1}`);

    card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
            <img 
                src="${item.image}" 
                alt="${item.title}" 
                loading="lazy" 
                width="300" 
                height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <a class="learn-more-btn" href="${item.link}" target="_blank" rel="noopener noreferrer">Learn More</a>
    `;

    cardsContainer.appendChild(card);
}

async function loadDiscoverCards() {
    try {
        const response = await fetch("data/discover.json");
        if (!response.ok) {
            throw new Error("Failed to load discover data.");
        }

        const data = await response.json();
        data.forEach((item, index) => createCard(item, index));
    } catch (error) {
        cardsContainer.innerHTML = `<p>Sorry, the discover content could not be loaded at this time.</p>`;
        console.error(error);
    }
}

displayVisitMessage();
loadDiscoverCards();