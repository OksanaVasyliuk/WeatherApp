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

let fahrenheit = document.querySelector("#f-button");
let celcius = document.querySelector("#c-button");
let temp = document.querySelector("#temperature");
function getC() {
  temp.innerHTML = 20 + "°C";
}

function getF() {
  temp.innerHTML = 30 * 1.8 + 32 + "°F";
}
let celButton = document.querySelector("#cel-button");

fahrenheit.addEventListener("click", getF);
celcius.addEventListener("click", getC);

// Search-engine
function displayWeather(response) {
  let temperature = `${Math.round(response.data.main.temp)}°C`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  let displayTemp = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  weatherDescription.innerHTML = description;
  displayTemp.innerHTML = temperature;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconNumber = response.data.weather[0].icon.substr(0, 2);
  iconElement.setAttribute("src", `images/${iconNumber}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let appId = "aecae3506c82c2dee9330bd1a69e78e0";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`;
  let searchInput = document.querySelector("#city");
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
  let city = searchInput.value;
  search(city);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", getWeatherInformation);
search("Vienna");
