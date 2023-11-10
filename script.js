$(document).ready(function() {

// API Key & Global Variables 
const apiKey = "cbf1eb157dfe792500592f3e9fd2056b";
const searchForm = $('#search-form');
const cityInput = $('#cityInput');
const searchHistory = $('#searchedCity');

// Function to fetch weather data

function getWeatherData(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response) {
        // forecast data and display it in HTML 
        const cityInfo = response.name;
        const dateInfo = new Date(response.dt * 1000).toLocaleDateString();
        const temperature = response.main.temp;
        const humidity = response.main.humidity;
        const windSpeed = response.wind.speed;
        const weatherIcon = response.weather[0].icon;

        // Update HTML elements with current weather data
        $('.city-result').text(`${cityInfo} (${dateInfo})`);
        $('#current-weather-icon').attr('src', `http://openweathermap.org/img/w/${weatherIcon}.png`);
        $('.temperature').text(`Temperature: ${temperature}°C`);
        $('.humidity').text(`Humidity: ${humidity}%`);
        $('.wind').text(`Wind: ${windSpeed} m/s`);
    });
}








});



