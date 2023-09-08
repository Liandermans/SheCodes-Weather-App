function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${day}, ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row align-items-center">
      <div class="col-6 day-forecast">${day}</div>
      <div class="col-2 icon-forecast">
        <img
          src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
          alt="Weather icon"
          class="weather-icon"
          id="icon-friday"
        />
      </div>
      <div class="col-4 temp-forecast">
        <span class="temp-forecast-max">20</span> |
        <span class="temp-forecast-min">15</span>
        <span class="degree-forecast">°C</span>
      </div>
    </div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let humidityValue = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let desciptionText = response.data.condition.description;
  let iconDescription = response.data.condition.icon;
  let place = response.data.city;

  celsiusTemp = Math.round(response.data.temperature.current);

  searchedCity.innerHTML = `${place}`;
  temperatureToday.innerHTML = `${temperature}`;
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  description.innerHTML = `${desciptionText}`;
  currentDateTime.innerHTML = formatDate(response.data.time * 1000);
  iconToday.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconDescription}.png`
  );
}

function search(city) {
  let apiKey = "9fb66eat3c45068of64821d7cabe200f";
  let units = "metric";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(showTemperature);
}

function submitSearch(event) {
  event.preventDefault();
  search(searchInput.value);
}

function showTemperatureCurrentLocation(response) {
  let temperature = Math.round(response.data.temperature.current);
  let place = response.data.city;
  let humidityValue = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let desciptionText = response.data.condition.description;
  let iconDescription = response.data.condition.icon;

  celsiusTemp = Math.round(response.data.temperature.current);

  searchedCity.innerHTML = `${place}`;
  temperatureToday.innerHTML = `${temperature}`;
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  description.innerHTML = `${desciptionText}`;
  currentDateTime.innerHTML = formatDate(response.data.time * 1000);
  iconToday.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconDescription}.png`
  );
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9fb66eat3c45068of64821d7cabe200f";
  let units = "metric";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(weatherApiUrl).then(showTemperatureCurrentLocation);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round(celsiusTemp * 1.8 + 32);
  temperatureToday.innerHTML = fahrenheitTemp;
}

function convertToCelsius(event) {
  event.preventDefault();
  temperatureToday.innerHTML = celsiusTemp;
}

let currentDateTime = document.querySelector("#current-date-time");
let form = document.querySelector("#search-form");
let searchedCity = document.querySelector("#searched-city");
let wind = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let temperatureToday = document.querySelector("#temperature-today");
let searchInput = document.querySelector("#entered-value");
let locationSelector = document.querySelector("#get-location");
let iconToday = document.querySelector("#icon-today");
let description = document.querySelector("#description");
let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");
let celsiusTemp = null;

form.addEventListener("submit", submitSearch);
locationSelector.addEventListener("click", searchLocation);
fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

search("Berlin");
displayForecast();
