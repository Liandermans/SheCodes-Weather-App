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

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
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

  return `${day}`;
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      let iconURL = forecastDay.condition.icon_url;
      let iconDescription = forecastDay.condition.description;
      let tempMax = Math.round(forecastDay.temperature.maximum);
      let tempMin = Math.round(forecastDay.temperature.minimum);
      let day = formatDayForecast(forecastDay.time);

      forecastHTML =
        forecastHTML +
        `<div class="row align-items-center">
      <div class="col-6 day-forecast">${day}</div>
      <div class="col-2 icon-forecast">
        <img
          src=${iconURL}
          alt=${iconDescription}
          class="weather-icon"
        />
      </div>
      <div class="col-4 temp-forecast">
        <span class="temp-forecast-max">${tempMax}</span> |
        <span class="temp-forecast-min">${tempMin}</span>
        <span class="degree-forecast">°C</span>
      </div>
    </div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coordinates) {
  let apiKey = "9fb66eat3c45068of64821d7cabe200f";
  let units = "metric";
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(showForecast);
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
  wind.innerHTML = `Wind: ${windSpeed} m/s`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  description.innerHTML = `${desciptionText}`;
  currentDateTime.innerHTML = formatDate(response.data.time * 1000);
  iconToday.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconDescription}.png`
  );

  getForecast(response.data.coordinates);
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

  getForecast(response.data.coordinates);
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
let celsiusTemp = null;

form.addEventListener("submit", submitSearch);
locationSelector.addEventListener("click", searchLocation);

search("Berlin");
