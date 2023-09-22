function formateDate(timestamp){

let date = new Date(timestamp);

let hours = date.getHours();

if(hours < 10) {
   hours = `0${hours}`;
}

let minutes = date.getMinutes();
if(minutes < 10) {
   minutes = `0${minutes}`
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday" ]
let day = days[date.getDay()];

return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response){
   let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if(index < 6) {
        forecastHTML = forecastHTML +
        `<div class="col-2">
            <div class="weather-forecst-date">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>
      <div class="weather-forecst-temperatures">
       <span class="weather-forecst-temperatures-max">${Math.round(forecastDay.temp.max)}°</span> 
    <span class="weather-forecst-temperatures-min">${Math.round(forecastDay.temp.min)}°</span>
</div>  
        </div>`;}
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
   console.log(coordinates);
let apiKey = "667d9f573c8af4c33457be5d561a9148";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&APPID=${apiKey}&units=metric`;

    console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {


    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemerature = response.data.main.temp;


    temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formateDate(response.data.dt * 1000);
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
}

function search(city){
    let apiKey = "667d9f573c8af4c33457be5d561a9148";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}


function heandleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFarhenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let farhenheitTemperature = (celsiusTemerature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(farhenheitTemperature); 
}
let celsiusTemerature = null;
function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemerature);
}



let form = document.querySelector("#search-form");
form.addEventListener("submit", heandleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFarhenheitTemperature);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("New York");

