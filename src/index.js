//Display the current date and time

let now = new Date();

let updatedDate = document.querySelector("p.date");
let updatedDay = document.querySelector("#current-day");
let updatedHour = document.querySelector("#current-hour");

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

let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = `${month} ${date}, ${year}`;
let currentHour = `${hours}: ${minutes}`;

updatedDate.innerHTML = `${currentDate}`;
updatedDay.innerHTML = `${day}`;
updatedHour.innerHTML = `${currentHour}`;

//Add a search engine, when searching for a city , display the city name on the page after the user submits the form.
//And display the name of the city on the result page and the current temperature of the city

// Displaying the updated data

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current_temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

//Searching for specific city and collecting the relevant data from the API then using the displayWeather function
function searchCity(city) {
  let apiKey = "07c4d8a7e28dc84944d3aa2c9c29b432";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

// Searching for current location using coordinates then using the displayWeather function
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "07c4d8a7e28dc84944d3aa2c9c29b432";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

//Taking the input value (city) from the web form and using the searchCity function
function inputSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searched-city").value;
  searchCity(city);
}

//Get the current location by using the searchLocation function
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Click event for the form- in order to take the input (city)
let form = document.querySelector("#search-form");
form.addEventListener("submit", inputSubmit);

//Default city (using the searchCity function)
searchCity("Tel aviv");

//Display the city and current temperature by using the current Location button

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
