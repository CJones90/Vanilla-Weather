function formatDate (timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours()
        if(hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = [
     "Sunday",
     "Monday",
     "Tueday",
     "Wednesday",
      "Thursday",
        "Friday",
       "Saturday"
    ]; 
    let day = days[date.getDay()];
    return `${day}  ${hours}:${minutes}`;
}

function displayForecast(){
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    days.forEach (function(day){
            forecastHTML = forecastHTML + `
              <div class="col">
                <div class="forecast-date">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/04d@2x.png"
                  alt="forecast icon"
                  width="42"
                />
                <div class="forecast-temp">
                  <span class="highTemp">18° </span> |<span class="lowTemp"
                    >12°</span>
                </div>             
            </div>`;
    });
            forecastHTML = forecastHTML+`</div>`
    forecastElement.innerHTML = forecastHTML
    }

function displayTemperture(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptor = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed")
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");



    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptor.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)
}

function searchCity(city){
    let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperture)
}

function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function displayFahrenheitTemperature (event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active")
    fahrenheitLink.classList.add("active")
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active")
    fahrenheitLink.classList.remove("active")
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search)

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature)

searchCity("Regina")
displayForecast();