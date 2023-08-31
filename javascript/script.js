function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let humidityValue = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let desciptionText = response.data.condition.description;
  let iconImage = response.data.condition.icon_url;

  temperatureToday.innerHTML = `${temperature}`;
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  description.innerHTML = `${desciptionText}`;
  iconToday.innerHTML = `img src="${iconImage}"`;
}

function submitFunction(event) {
  event.preventDefault();
  if (searchInput.value) {
    searchedCity.innerHTML = `${searchInput.value}`;

    let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=${units}`;

    axios.get(weatherApiUrl).then(showTemperature);
  }
}

function showTemperatureCurrentLocation(response) {
  let temperature = Math.round(response.data.temperature.current);
  let place = response.data.city;
  let humidityValue = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let desciptionText = response.data.condition.description;

  searchedCity.innerHTML = `${place}`;
  temperatureToday.innerHTML = `${temperature}`;
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  description.innerHTML = `${desciptionText}`;
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

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

let apiKey = "9fb66eat3c45068of64821d7cabe200f";
let units = "metric";

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
let iconToday = document.querySelector("#icon-today");
let description = document.querySelector("#description");

submitButton.addEventListener("click", submitFunction);
locationSelector.addEventListener("click", searchLocation);
addButton.addEventListener("click", addFunction);
