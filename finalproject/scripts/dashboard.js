import { readStoredArray } from "./routine-utils.js";

const workouts = readStoredArray("movewell-workouts");
const totalWorkouts = document.querySelector("#total-workouts");
const weeklyMinutes = document.querySelector("#weekly-minutes");
const currentStreak = document.querySelector("#current-streak");
const chartElement = document.querySelector("#weekly-chart");
const chartStatus = document.querySelector("#chart-status");
const weekRange = document.querySelector("#week-range");

function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = new Date();
today.setHours(0, 0, 0, 0);
const days = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(today);
  date.setDate(today.getDate() - (6 - index));
  return { date, key: toLocalDateKey(date), minutes: 0 };
});

workouts.forEach((workout) => {
  const day = days.find((item) => item.key === workout.date);
  if (day) day.minutes += Number(workout.duration) || 0;
});

const minutesThisWeek = days.reduce((total, day) => total + day.minutes, 0);
const maxMinutes = Math.max(...days.map((day) => day.minutes), 30);

function calculateStreak(entries) {
  const activeDates = new Set(entries.map((entry) => entry.date));
  let streak = 0;
  const cursor = new Date(today);
  while (activeDates.has(toLocalDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function renderChart() {
  const fragment = document.createDocumentFragment();
  days.forEach((day) => {
    const column = document.createElement("li");
    const label = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(day.date);
    const height = day.minutes === 0 ? 4 : Math.max(12, Math.round((day.minutes / maxMinutes) * 100));
    column.className = "chart-day";
    column.innerHTML = `<span class="visually-hidden">${label}: ${day.minutes} minutes.</span><span class="chart-value" aria-hidden="true">${day.minutes}</span><div class="chart-track" aria-hidden="true"><span style="height:${height}%"></span></div><strong aria-hidden="true">${label}</strong>`;
    fragment.append(column);
  });
  chartElement.replaceChildren(fragment);
}

totalWorkouts.textContent = workouts.length;
weeklyMinutes.textContent = minutesThisWeek;
currentStreak.textContent = calculateStreak(workouts);
weekRange.textContent = `${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(days[0].date)}–${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(today)}`;
chartStatus.textContent = minutesThisWeek > 0 ? `${minutesThisWeek} active minutes recorded during the last seven days.` : "Log your first workout to begin the weekly chart.";
renderChart();
