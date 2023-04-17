function displayTemperture(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptor = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed")
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptor.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Regina&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperture)