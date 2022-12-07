//Display the current date and time

/*
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

*/

//Add a search engine, when searching for a city , display the city name on the page after the user submits the form.
//And display the name of the city on the result page and the current temperature of the city

// Displaying the updated date data
function formatDate(timestamp) {
  //calculate the date
  let dayAndHour = new Date(timestamp);

  let hours = dayAndHour.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dayAndHour.getMinutes();
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
  let day = days[dayAndHour.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.city;
  document.querySelector("#current_temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#day-and-hour").innerHTML = formatDate(
    response.data.time * 1000
  );
  //Display matching icon
  let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`) ;
iconElement.setAttribute("alt", response.data.condition.description);
}

//Searching for specific city and collecting the relevant data from the API then using the displayWeather function
function searchCity(city) {
  let apiKey = "ba343db2f0ad4f9tf60594e471o8bea3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

// Searching for current location using coordinates then using the displayWeather function
function searchLocation(position) {
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let apiKey = "ba343db2f0ad4f9tf60594e471o8bea3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;

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

function displayFahrenheitTemp(event){
  event.preventDefault();
  alert("button cliked");
}

//Click event for the form- in order to take the input (city)
let form = document.querySelector("#search-form");
form.addEventListener("submit", inputSubmit);

let fahrenheitbutton = Document.querySelector("#fahrenheit");
fahrenheitbutton.addEventListener("click",displayFahrenheitTemp);

//Default city (using the searchCity function)
searchCity("Tel aviv");

//Display the city and current temperature by using the current Location button

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

