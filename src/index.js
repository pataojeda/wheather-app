function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let conditionDescriptionElement = document.querySelector(
    "#condition-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  conditionDescriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-info-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ta63a75o619c8f44c75a3ad066b9bf63";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function useSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#seach-form-input");

  searchCity(searchInput.value);
}

function forecastFormatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return forecastDays[date.getDay()];
}

function getForecast(city) {
  let apiKey = "4040o4d2cfd656953bb07308ffet858a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="col">
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${forecastFormatDay(day.time)}</div>
      <div class="weather-forecast-icon"><img src="${
        day.condition.icon_url
      }"></div>
      <div class="weather-forecast-temperature">
      <div class="weather-forecast-max">${Math.round(
        day.temperature.maximum
      )}° </div>
        <div class="weather-forecast-min">${Math.round(
          day.temperature.minimum
        )}°</div>
          </div>
          </div>
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", useSearchSubmit);

searchCity("Pilar");
displayForecast();
