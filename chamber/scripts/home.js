const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");
const spotlightContainer = document.querySelector("#spotlight-container");

const weatherDescriptions = {
  0:["Clear sky","☀️"], 1:["Mainly clear","🌤️"], 2:["Partly cloudy","⛅"], 3:["Overcast","☁️"],
  45:["Fog","🌫️"], 48:["Fog","🌫️"], 51:["Light drizzle","🌦️"], 53:["Drizzle","🌦️"], 55:["Heavy drizzle","🌧️"],
  61:["Light rain","🌦️"], 63:["Rain","🌧️"], 65:["Heavy rain","🌧️"], 80:["Rain showers","🌦️"],
  81:["Rain showers","🌧️"], 82:["Heavy showers","⛈️"], 95:["Thunderstorm","⛈️"]
};

async function loadWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=-23.5228&longitude=-46.1883&current=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=4";
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather service unavailable");
    const data = await response.json();
    const [description, icon] = weatherDescriptions[data.current.weather_code] || ["Current conditions","🌡️"];
    currentWeather.innerHTML = `<div class="weather-now"><span class="weather-icon" aria-hidden="true">${icon}</span><div><p class="temperature">${Math.round(data.current.temperature_2m)}°C</p><p>${description}</p><p>Feels like ${Math.round(data.current.apparent_temperature)}°C</p></div></div>`;
    forecast.innerHTML = data.daily.time.slice(1,4).map((date,index) => {
      const offset = index + 1;
      const day = new Intl.DateTimeFormat("en-US", { weekday:"short", timeZone:"UTC" }).format(new Date(`${date}T12:00:00Z`));
      return `<div class="forecast-day"><span>${day}</span><strong>${Math.round(data.daily.temperature_2m_max[offset])}°</strong><span>${Math.round(data.daily.temperature_2m_min[offset])}° low</span></div>`;
    }).join("");
  } catch (error) {
    currentWeather.innerHTML = `<p class="error-message">Weather information is temporarily unavailable.</p>`;
    forecast.innerHTML = "";
    console.error(error);
  }
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Member data unavailable");
    const { members } = await response.json();
    const eligible = members.filter(member => member.membership === 2 || member.membership === 3);
    spotlightContainer.innerHTML = shuffle(eligible).slice(0,3).map(member => `
      <article class="spotlight-card">
        <div class="member-logo" aria-hidden="true">${member.name.split(" ").map(word => word[0]).slice(0,2).join("")}</div>
        <h3>${member.name}</h3>
        <span class="member-level">${member.membership === 3 ? "Gold" : "Silver"} Member</span>
        <p>${member.address}</p><p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit website</a>
      </article>`).join("");
  } catch (error) {
    spotlightContainer.innerHTML = `<p class="error-message">Member spotlights are temporarily unavailable.</p>`;
    console.error(error);
  }
}

loadWeather();
loadSpotlights();
