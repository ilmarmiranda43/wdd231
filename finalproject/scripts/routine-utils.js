export function readStoredArray(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn(`Could not read stored value for ${key}.`, error);
    return [];
  }
}

export function writeStoredArray(key, values) {
  localStorage.setItem(key, JSON.stringify(values));
}

export function getCategories(items) {
  return [...new Set(items.map((item) => item.category))].sort();
}

export function formatMinutes(minutes) {
  return `${minutes} min`;
}

export function escapeHTML(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
