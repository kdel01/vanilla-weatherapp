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

  let displayTemp = document.querySelector("#temperature");
  let displayDescrip = document.querySelector("#describe");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  displayTemp.innerHTML = `${tempC}`;
  displayDescrip.innerHTML = `${description}`;
  displayHumidity.innerHTML = `${humidity}`;
  displayWind.innerHTML = `${wind}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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

// Display Current Date and Time

function checkMins(i) {
  if (i < 10) {
    i = "0" + i;
  } else {
    i = i;
  }
  return i;
}

let now = new Date();
let hour = now.getHours();
let minute = checkMins(now.getMinutes());

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

let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${hour}:${minute}`;

//Temp Translations
// Change temp from F to C
function changeToC(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let unit = document.querySelector("#current-units");

  celcius.classList.add("active");
  faren.classList.remove("active");

  temp.innerHTML = Math.round(tempC);
  unit.innerHTML = " ºC";
}
//Change Temp from C to F
function changeToF(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let unit = document.querySelector("#current-units");

  celcius.classList.remove("active");
  faren.classList.add("active");

  let tempF = (tempC * 9) / 5 + 32;
  temp.innerHTML = Math.round(tempF);
  unit.innerHTML = " ºF";
}

let tempC = null;

let makeCel = document.querySelector("#celcius");
makeCel.addEventListener("click", changeToC);

let makeFar = document.querySelector("#faren");
makeFar.addEventListener("click", changeToF);

searchCity("Sydney");
