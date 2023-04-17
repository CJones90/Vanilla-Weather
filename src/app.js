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

function displayTemperture(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptor = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed")
    let dateElement = document.querySelector("#date");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptor.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Regina&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperture)