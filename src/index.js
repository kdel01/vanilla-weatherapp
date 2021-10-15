// Display Current Date and Time
function currentDate() {
  let now = new Date();
  let hour = now.getHours();
  let mins = now.getMinutes();

  if (mins < 10) {
    mins = `0${mins}`;
  }

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = week[now.getDay()];

  return `${day}, ${hour}:${mins}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return week[day];
}

// Display Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="50"
        />
        <div class="forecast-temp">
          <span class="forecast-temp-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span> | 
          <span class="forecast-temp-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coord) {
  let apiKey = "f300ea07549b278ccdffad6a05e9faa5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// change temp after search
function showTemp(response) {
  let city = response.data.name;
  tempC = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#current-icon");
  console.log(description);
  let h2 = document.querySelector("#current-city");
  h2.innerHTML = `Current City: ${city}`;

  let dateElement = document.querySelector("#date");
  let displayTemp = document.querySelector("#temperature");
  let displayDescrip = document.querySelector("#describe");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  displayTemp.innerHTML = `${tempC}`;
  displayDescrip.innerHTML = `${description}`;
  displayHumidity.innerHTML = `${humidity}`;
  displayWind.innerHTML = `${wind}`;
  dateElement.innerHTML = currentDate();
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Display City Name After Search
function searchCity(city) {
  let units = "metric";
  let apiKey = "f300ea07549b278ccdffad6a05e9faa5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

function buttonClick(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let form = document.querySelector("#form");
form.addEventListener("submit", buttonClick);

// Weather for my Location
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f300ea07549b278ccdffad6a05e9faa5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector("#myLocation");
locationButton.addEventListener("click", findLocation);

searchCity("Sydney");
displayForecast();
