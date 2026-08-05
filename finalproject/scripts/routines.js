import { escapeHTML, formatMinutes, getCategories, readStoredArray, writeStoredArray } from "./routine-utils.js";

const listElement = document.querySelector("#routine-list");
const summaryElement = document.querySelector("#result-summary");
const searchInput = document.querySelector("#routine-search");
const categoryFilter = document.querySelector("#category-filter");
const levelFilter = document.querySelector("#level-filter");
const favoritesFilter = document.querySelector("#favorites-filter");
const viewButtons = document.querySelectorAll("[data-view]");
const emptyState = document.querySelector("#empty-state");
const clearFiltersButton = document.querySelector("#clear-filters");
const dialog = document.querySelector("#routine-dialog");
const closeDialogButton = document.querySelector("#close-dialog");

const favoriteKey = "movewell-favorite-routines";
const viewKey = "movewell-routine-view";
let routines = [];
let favorites = new Set(readStoredArray(favoriteKey));
let showFavoritesOnly = false;
let lastDialogTrigger = null;

function showLoadingCards() {
  listElement.innerHTML = Array.from({ length: 6 }, () => '<div class="loading-card" aria-hidden="true"></div>').join("");
}

function createCard(routine) {
  const article = document.createElement("article");
  const isFavorite = favorites.has(routine.id);
  article.className = "routine-card";
  article.dataset.id = routine.id;
  article.innerHTML = `
    <div class="card-topline">
      <span class="category-chip">${escapeHTML(routine.category)}</span>
      <button class="favorite-button" type="button" aria-pressed="${isFavorite}" aria-label="${isFavorite ? "Remove" : "Save"} ${escapeHTML(routine.title)} ${isFavorite ? "from" : "to"} favorites" data-favorite="${escapeHTML(routine.id)}"><span aria-hidden="true">${isFavorite ? "♥" : "♡"}</span></button>
    </div>
    <h2>${escapeHTML(routine.title)}</h2>
    <p>${escapeHTML(routine.summary)}</p>
    <div class="card-metrics">
      <div><span>Level</span><strong>${escapeHTML(routine.level)}</strong></div>
      <div><span>Duration</span><strong>${formatMinutes(routine.duration)}</strong></div>
      <div><span>Focus</span><strong>${escapeHTML(routine.focus)}</strong></div>
      <div><span>Equipment</span><strong>${escapeHTML(routine.equipment)}</strong></div>
    </div>
    <button class="details-button" type="button" data-details="${escapeHTML(routine.id)}">View routine <span aria-hidden="true">→</span></button>`;
  return article;
}

function getFilteredRoutines() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  return routines.filter((routine) => {
    const searchableText = `${routine.title} ${routine.summary} ${routine.category} ${routine.benefit} ${routine.focus}`.toLowerCase();
    const matchesCategory = categoryFilter.value === "All" || routine.category === categoryFilter.value;
    const matchesLevel = levelFilter.value === "All" || routine.level === levelFilter.value;
    return searchableText.includes(searchTerm) && matchesCategory && matchesLevel && (!showFavoritesOnly || favorites.has(routine.id));
  });
}

function renderRoutines() {
  const filtered = getFilteredRoutines();
  const totalMinutes = filtered.reduce((total, routine) => total + routine.duration, 0);
  const fragment = document.createDocumentFragment();
  filtered.map(createCard).forEach((card) => fragment.append(card));
  listElement.replaceChildren(fragment);
  listElement.setAttribute("aria-busy", "false");
  emptyState.hidden = filtered.length !== 0;
  summaryElement.textContent = `${filtered.length} ${filtered.length === 1 ? "routine" : "routines"} · ${totalMinutes} combined minutes`;
}

function populateCategories() {
  const categories = getCategories(routines);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
  const categoryFromUrl = new URLSearchParams(window.location.search).get("category");
  if (categoryFromUrl && categories.includes(categoryFromUrl)) categoryFilter.value = categoryFromUrl;
}

function toggleFavorite(id) {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  writeStoredArray(favoriteKey, [...favorites]);
  renderRoutines();
}

function openDetails(id, trigger) {
  const routine = routines.find((item) => item.id === id);
  if (!routine) return;
  lastDialogTrigger = trigger;
  document.querySelector("#dialog-category").textContent = routine.category;
  document.querySelector("#dialog-title").textContent = routine.title;
  document.querySelector("#dialog-description").textContent = routine.summary;
  document.querySelector("#dialog-steps").textContent = routine.steps;
  document.querySelector("#dialog-benefit").textContent = routine.benefit;
  document.querySelector("#dialog-metrics").innerHTML = `<div><span>Level</span><strong>${escapeHTML(routine.level)}</strong></div><div><span>Duration</span><strong>${formatMinutes(routine.duration)}</strong></div><div><span>Equipment</span><strong>${escapeHTML(routine.equipment)}</strong></div>`;
  document.querySelector("#dialog-action").href = `log.html?routine=${encodeURIComponent(routine.title)}&type=${encodeURIComponent(routine.category)}&duration=${routine.duration}`;
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
  levelFilter.value = "All";
  showFavoritesOnly = false;
  favoritesFilter.setAttribute("aria-pressed", "false");
  renderRoutines();
  searchInput.focus();
}

async function loadRoutines() {
  showLoadingCards();
  try {
    const response = await fetch("data/routines.json");
    if (!response.ok) throw new Error(`Data request failed with status ${response.status}.`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 15) throw new Error("The routine data is incomplete.");
    routines = data;
    populateCategories();
    setView(localStorage.getItem(viewKey) ?? "grid");
    renderRoutines();
  } catch (error) {
    console.error("Unable to load exercise routines.", error);
    listElement.setAttribute("aria-busy", "false");
    listElement.innerHTML = '<div class="error-state"><h2>We could not load the exercise library.</h2><p>Please refresh the page or try again in a moment.</p></div>';
    summaryElement.textContent = "Exercise library unavailable";
  }
}

searchInput.addEventListener("input", renderRoutines);
categoryFilter.addEventListener("change", renderRoutines);
levelFilter.addEventListener("change", renderRoutines);
favoritesFilter.addEventListener("click", () => { showFavoritesOnly = !showFavoritesOnly; favoritesFilter.setAttribute("aria-pressed", String(showFavoritesOnly)); renderRoutines(); });
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
loadRoutines();
