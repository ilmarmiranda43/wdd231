import { escapeHTML, formatHours, getCategories, readStoredArray, writeStoredArray } from "./catalog-utils.js";

const listElement = document.querySelector("#automation-list");
const summaryElement = document.querySelector("#result-summary");
const searchInput = document.querySelector("#automation-search");
const categoryFilter = document.querySelector("#category-filter");
const complexityFilter = document.querySelector("#complexity-filter");
const favoritesFilter = document.querySelector("#favorites-filter");
const viewButtons = document.querySelectorAll("[data-view]");
const emptyState = document.querySelector("#empty-state");
const clearFiltersButton = document.querySelector("#clear-filters");
const dialog = document.querySelector("#automation-dialog");
const closeDialogButton = document.querySelector("#close-dialog");

const favoriteKey = "automation-atlas-favorites";
const viewKey = "automation-atlas-view";
let automations = [];
let favorites = new Set(readStoredArray(favoriteKey));
let showFavoritesOnly = false;
let lastDialogTrigger = null;

function showLoadingCards() {
  listElement.innerHTML = Array.from({ length: 6 }, () => '<div class="loading-card" aria-hidden="true"></div>').join("");
}

function createCard(automation) {
  const article = document.createElement("article");
  const isFavorite = favorites.has(automation.id);
  article.className = "automation-card";
  article.dataset.id = automation.id;
  article.innerHTML = `
    <div class="card-topline">
      <span class="category-chip">${escapeHTML(automation.category)}</span>
      <button class="favorite-button" type="button" aria-pressed="${isFavorite}" aria-label="${isFavorite ? "Remove" : "Save"} ${escapeHTML(automation.title)} ${isFavorite ? "from" : "to"} favorites" data-favorite="${escapeHTML(automation.id)}"><span aria-hidden="true">${isFavorite ? "♥" : "♡"}</span></button>
    </div>
    <h2>${escapeHTML(automation.title)}</h2>
    <p>${escapeHTML(automation.summary)}</p>
    <div class="card-metrics">
      <div><span>Complexity</span><strong>${escapeHTML(automation.complexity)}</strong></div>
      <div><span>Time saved</span><strong>${formatHours(automation.hoursSaved)}</strong></div>
      <div><span>Frequency</span><strong>${escapeHTML(automation.frequency)}</strong></div>
      <div><span>Systems</span><strong>${escapeHTML(automation.systems)}</strong></div>
    </div>
    <button class="details-button" type="button" data-details="${escapeHTML(automation.id)}">View details <span aria-hidden="true">→</span></button>`;
  return article;
}

function getFilteredAutomations() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  return automations.filter((automation) => {
    const searchableText = `${automation.title} ${automation.summary} ${automation.category} ${automation.outcome}`.toLowerCase();
    const matchesCategory = categoryFilter.value === "All" || automation.category === categoryFilter.value;
    const matchesComplexity = complexityFilter.value === "All" || automation.complexity === complexityFilter.value;
    return searchableText.includes(searchTerm) && matchesCategory && matchesComplexity && (!showFavoritesOnly || favorites.has(automation.id));
  });
}

function renderAutomations() {
  const filtered = getFilteredAutomations();
  const savedHours = filtered.reduce((total, automation) => total + automation.hoursSaved, 0);
  const fragment = document.createDocumentFragment();
  filtered.map(createCard).forEach((card) => fragment.append(card));
  listElement.replaceChildren(fragment);
  listElement.setAttribute("aria-busy", "false");
  emptyState.hidden = filtered.length !== 0;
  summaryElement.textContent = `${filtered.length} ${filtered.length === 1 ? "idea" : "ideas"} · up to ${savedHours} combined hours saved per week`;
}

function populateCategories() {
  getCategories(automations).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
  const categoryFromUrl = new URLSearchParams(window.location.search).get("category");
  if (categoryFromUrl && getCategories(automations).includes(categoryFromUrl)) categoryFilter.value = categoryFromUrl;
}

function toggleFavorite(id) {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  writeStoredArray(favoriteKey, [...favorites]);
  renderAutomations();
}

function openDetails(id, trigger) {
  const automation = automations.find((item) => item.id === id);
  if (!automation) return;
  lastDialogTrigger = trigger;
  document.querySelector("#dialog-category").textContent = automation.category;
  document.querySelector("#dialog-title").textContent = automation.title;
  document.querySelector("#dialog-description").textContent = automation.summary;
  document.querySelector("#dialog-workflow").textContent = automation.workflow;
  document.querySelector("#dialog-outcome").textContent = automation.outcome;
  document.querySelector("#dialog-metrics").innerHTML = `<div><span>Complexity</span><strong>${escapeHTML(automation.complexity)}</strong></div><div><span>Time saved</span><strong>${formatHours(automation.hoursSaved)}</strong></div><div><span>Frequency</span><strong>${escapeHTML(automation.frequency)}</strong></div>`;
  document.querySelector("#dialog-action").href = `contact.html?automation=${encodeURIComponent(automation.title)}`;
  dialog.showModal();
}

function closeDetails() {
  dialog.close();
  lastDialogTrigger?.focus();
}

function setView(view) {
  const chosenView = view === "list" ? "list" : "grid";
  listElement.classList.toggle("list-view", chosenView === "list");
  viewButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.view === chosenView)));
  localStorage.setItem(viewKey, chosenView);
}

function clearFilters() {
  searchInput.value = "";
  categoryFilter.value = "All";
  complexityFilter.value = "All";
  showFavoritesOnly = false;
  favoritesFilter.setAttribute("aria-pressed", "false");
  renderAutomations();
  searchInput.focus();
}

async function loadAutomations() {
  showLoadingCards();
  try {
    const response = await fetch("data/automations.json");
    if (!response.ok) throw new Error(`Data request failed with status ${response.status}.`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 15) throw new Error("The automation data is incomplete.");
    automations = data;
    populateCategories();
    setView(localStorage.getItem(viewKey) ?? "grid");
    renderAutomations();
  } catch (error) {
    console.error("Unable to load automation ideas.", error);
    listElement.setAttribute("aria-busy", "false");
    listElement.innerHTML = '<div class="error-state"><h2>We could not load the automation library.</h2><p>Please refresh the page or try again in a moment.</p></div>';
    summaryElement.textContent = "Automation library unavailable";
  }
}

searchInput.addEventListener("input", renderAutomations);
categoryFilter.addEventListener("change", renderAutomations);
complexityFilter.addEventListener("change", renderAutomations);
favoritesFilter.addEventListener("click", () => { showFavoritesOnly = !showFavoritesOnly; favoritesFilter.setAttribute("aria-pressed", String(showFavoritesOnly)); renderAutomations(); });
listElement.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const detailsButton = event.target.closest("[data-details]");
  if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite);
  if (detailsButton) openDetails(detailsButton.dataset.details, detailsButton);
});
viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
clearFiltersButton.addEventListener("click", clearFilters);
closeDialogButton.addEventListener("click", closeDetails);
dialog.addEventListener("click", (event) => { if (event.target === dialog) closeDetails(); });
dialog.addEventListener("close", () => lastDialogTrigger?.focus());
loadAutomations();
