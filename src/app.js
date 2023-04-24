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

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay
    let days = ["SUn", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

    return days[day];
}

function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;    
    forecast.forEach (function(forecastDay, index){
        if (index < 7){
            forecastHTML = forecastHTML + `
              <div class="col">
                <div class="forecast-date">${forecastDay.dt}</div>
                ${index}
                <img
                  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt="forecast icon"
                  width="42"
                />
                <div class="forecast-temp">
                  <span class="highTemp">${Math.round(forcastDay.temp.max)}° </span> |<span class="lowTemp"
                    >${Math.round(forecastDay.temp.min)}°</span>
                </div>             
            </div>`;
}});
            forecastHTML = forecastHTML+`</div>`
    forecastElement.innerHTML = forecastHTML
    }

function getForecast(coordinates){
    let lat = (coordinates.lat);
    let lon = (coordinates.lon);
    let apiKey = "f03f22d23fb435c6762b36101833c83a";
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    axios.get(apiURL).then(displayForecast)
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

    getForecast(response.data.coord)
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
displayForecast()