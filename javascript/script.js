function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidityValue = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);

  temperatureToday.innerHTML = `${temperature}`;
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
}

function submitFunction(event) {
  event.preventDefault();
  if (searchInput.value) {
    searchedCity.innerHTML = `${searchInput.value}`;

    let apiKey = "f4fed22fd16ee467cdb0c7b4e8279568";
    let units = "metric";
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

    axios.get(weatherApiUrl).then(showTemperature);
  }
}

function showTemperatureCurrentLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  let humidityValue = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);

  searchedCity.innerHTML = `${place}`;
  temperatureToday.innerHTML = `${temperature}`;
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "f4fed22fd16ee467cdb0c7b4e8279568";
  let units = "metric";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(weatherApiUrl).then(showTemperatureCurrentLocation);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function addFunction(event) {
  event.preventDefault();
  if (searchInput.value) {
    let sel = document.getElementById("favourites-menu");
    let opt = document.createElement("option");
    opt.value = "4";
    opt.text = `${searchInput.value}`;
    sel.add(opt, null);
  }
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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let currentDateTime = document.querySelector("#current-date-time");

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

currentDateTime.innerHTML = `${day}, ${hour}:${minutes}`;

let form = document.querySelector("#search-form");
let submitButton = document.querySelector("#submit-button");
let addButton = document.querySelector("#add-button");
let searchedCity = document.querySelector("#searched-city");
let wind = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let temperatureToday = document.querySelector("#temperature-today");
let searchInput = document.querySelector("#entered-value");
let locationSelector = document.querySelector("#get-location");

submitButton.addEventListener("click", submitFunction);
locationSelector.addEventListener("click", searchLocation);
addButton.addEventListener("click", addFunction);
