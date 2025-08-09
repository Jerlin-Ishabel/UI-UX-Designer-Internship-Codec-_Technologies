const apiKey = "cad69307c8b5ac20544c2bef1c3a3a68"; // ← Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name!");

  const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const weatherData = await weatherRes.json();

  if (weatherData.cod !== 200) {
    document.getElementById("weatherResult").innerHTML = `<p>City not found!</p>`;
    return;
  }

  document.getElementById("weatherResult").innerHTML = `
    <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
    <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
    <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
  `;

  // 5-Day Forecast
  const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
  const forecastData = await forecastRes.json();

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "<h3>5-Day Forecast</h3>";

  // Take one forecast every 24 hours (every 8th record)
  for (let i = 0; i < forecastData.list.length; i += 8) {
    const day = forecastData.list[i];
    const date = new Date(day.dt_txt).toDateString();

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <strong>${date.split(" ").slice(0, 3).join(" ")}</strong>
        <p>${day.main.temp}°C</p>
        <p>${day.weather[0].main}</p>
      </div>
    `;
  }
}
