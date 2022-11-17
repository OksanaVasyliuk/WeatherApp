let date = document.querySelector("#date");
var now = new Date();
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "OCt",
  "Nov",
  "Dec",
];
date.innerHTML = `${now.getDate()} ${months[now.getMonth()]}`;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheiTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="container overflow-hidden text-center">
        <div class="row gx-4">`;

  forecast.forEach(function (forecastDay, index) {
    let iconNumber = forecastDay.weather[0].icon.substr(0, 2);
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="p-1">
              <p>
                <img
                  class="weather-conditions"
                  src="images/${iconNumber}.png"
                />
              </p>
              <p class="temperature">${Math.round(forecastDay.temp.day)}°C</p>
              <p class="date">${formatDay(forecastDay.dt)}</p>
            </div>
          </div>`;
    }
  });

  forecastHTML =
    forecastHTML +
    `</div>
        </div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Search-engine
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth();
  let day = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "OCt",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[month]}`;
}

function getForecast(coordinates) {
  let appId = "aecae3506c82c2dee9330bd1a69e78e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appId}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function displayWeather(response) {
  let temperature = `${Math.round(response.data.main.temp)}°C`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  let displayTemp = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  weatherDescription.innerHTML = description;
  displayTemp.innerHTML = temperature;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconNumber = response.data.weather[0].icon.substr(0, 2);
  iconElement.setAttribute("src", `images/${iconNumber}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let appId = "aecae3506c82c2dee9330bd1a69e78e0";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`;

  let currentCity = document.querySelector("#current-city");
  if (city) {
    currentCity.innerHTML = city;
    axios.get(url).then(displayWeather);
  } else {
    currentCity.innerHTML = "Vienna";
    alert("Please type a city");
  }
}

function getWeatherInformation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let city = searchInput.value;

  search(city);
}

let celsiusTemperature = null;
let form = document.querySelector("#search-city");
form.addEventListener("submit", getWeatherInformation);

let fahrenheitLink = document.querySelector("#f-button");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#c-button");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Vienna");

getForecast();
