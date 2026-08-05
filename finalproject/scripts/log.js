import { readStoredArray, writeStoredArray } from "./routine-utils.js";

const form = document.querySelector(".assessment-form");
const submittedAt = document.querySelector("#submitted-at");
const notes = document.querySelector("textarea[name='notes']");
const notesCount = document.querySelector("#notes-count");
const routineField = document.querySelector("#routine-field");
const dateField = document.querySelector("#workout-date");
const typeField = document.querySelector("select[name='type']");
const durationField = document.querySelector("input[name='duration']");
const parameters = new URLSearchParams(window.location.search);

function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const todayKey = toLocalDateKey(new Date());
dateField.value = todayKey;
dateField.max = todayKey;

if (parameters.get("routine")) routineField.value = parameters.get("routine");
if (parameters.get("type") && [...typeField.options].some((option) => option.value === parameters.get("type"))) typeField.value = parameters.get("type");
if (parameters.get("duration")) durationField.value = parameters.get("duration");

function updateCharacterCount() {
  notesCount.textContent = notes.value.length;
}

function saveWorkout() {
  const formData = new FormData(form);
  const workouts = readStoredArray("movewell-workouts");
  const workout = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    date: formData.get("date"),
    type: formData.get("type"),
    routine: formData.get("routine"),
    duration: Number(formData.get("duration")),
    intensity: formData.get("intensity"),
    notes: formData.get("notes"),
    submitted: new Date().toISOString()
  };
  writeStoredArray("movewell-workouts", [...workouts, workout]);
  submittedAt.value = workout.submitted;
}

notes.addEventListener("input", updateCharacterCount);
form.addEventListener("submit", saveWorkout);
updateCharacterCount();
