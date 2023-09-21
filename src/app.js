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

function displayForecast(){
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML +
        `<div class="col-2">
            <div class="weather-forecst-date">${day}</div>
            <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="" width="42"/>
      <div class="weather-forecst-temperatures">
       <span class="weather-forecst-temperatures-max">18°</span> 
    <span class="weather-forecst-temperatures-min">12°</span>
</div>  
        </div>`;
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
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
}

function search(city){
    let apiKey = "f9a03396395e77596cdd41ea58a7f663";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    console.log(apiUrl);
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
displayForecast();
