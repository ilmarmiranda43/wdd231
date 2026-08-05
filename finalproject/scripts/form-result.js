const params = new URLSearchParams(window.location.search);
const nameElement = document.querySelector("#result-name");
const summaryElement = document.querySelector("#submission-summary");
const labels = new Map([
  ["email", "Email"],
  ["date", "Workout date"],
  ["type", "Exercise type"],
  ["routine", "Routine or activity"],
  ["duration", "Duration"],
  ["intensity", "Intensity"],
  ["notes", "Workout notes"],
  ["confirmed", "Completed"],
  ["submitted", "Saved"]
]);

const submittedName = params.get("name")?.trim();
if (submittedName) nameElement.textContent = submittedName.split(" ")[0];

const visibleEntries = [...params.entries()].filter(([key, value]) => key !== "name" && labels.has(key) && value.trim() !== "");
if (visibleEntries.length === 0) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = "Workout details";
  description.textContent = "No form values were provided.";
  wrapper.append(term, description);
  summaryElement.append(wrapper);
} else {
  visibleEntries.forEach(([key, value]) => {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = labels.get(key);
    if (key === "submitted") {
      const date = new Date(value);
      description.textContent = Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
    } else if (key === "date") {
      const date = new Date(`${value}T12:00:00`);
      description.textContent = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
    } else if (key === "duration") description.textContent = `${value} minutes`;
    else description.textContent = value;
    wrapper.append(term, description);
    summaryElement.append(wrapper);
  });
}
