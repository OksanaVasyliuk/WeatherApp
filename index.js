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
  weatherDescription.innerHTML = description;
  displayTemp.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let appId = "aecae3506c82c2dee9330bd1a69e78e0";
  let searchInput = document.querySelector("#city");
  let currentCity = document.querySelector("#current-city");
  let city = searchInput.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`;

  if (searchInput.value) {
    currentCity.innerHTML = searchInput.value;
    axios.get(url).then(displayWeather);
  } else {
    currentCity.innerHTML = "Vienna";
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

