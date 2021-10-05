// change temp after search
function showTemp(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);

  let h2 = document.querySelector("#current-city");
  h2.innerHTML = `Current City: ${city}`;

  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = `${temp}`;
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
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = "17";
}
//Change Temp from F to C
function changeToF(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = "66";
}

let makeCel = document.querySelector("#celcius");
makeCel.addEventListener("click", changeToC);

let makeFar = document.querySelector("#faren");
makeFar.addEventListener("click", changeToF);
