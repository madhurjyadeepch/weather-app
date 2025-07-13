const input = document.querySelector('.cityInput');

const button = document.querySelector ('.getWeatherButton');

const resultDiv = document.querySelector('.weatherResult');
const apiKey = "a2742d63baea084c1a2f3fdcc082121b";

console.log(apiKey);

button.addEventListener ('click', function (){
    const cityName = input.value.trim();

    if (cityName === '') {
        alert("Please enter a city.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then (response => {
        if (!response.ok) throw new Error ('City not found!');
        return response.json();
    })
    .then (data => {
        const temp = data.main.temp.toFixed(1);
        const feelsLikeTemp = data.main.feels_like.toFixed(1);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

        resultDiv.innerHTML = `
                <h2>${data.name}</h2>
                <div class="temperature-styling">
                    <p>${temp}<span class="degree">  &deg;C</span></p>
                    <img src="${iconUrl}">
                </div>

                <div class="content">
                    <p><strong>Feels like: </strong>${feelsLikeTemp}&deg;C</p>
                    <p><strong>Description: </strong>${description}</p>
                </div>
        `;
    })
    .catch (error => {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });

    

});