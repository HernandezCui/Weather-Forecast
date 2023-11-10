$(document).ready(function() {

// API Key & Global Variables 
const apiKey = "cbf1eb157dfe792500592f3e9fd2056b";
const searchForm = $('#search-form');
const cityInput = $('#cityInput');
const searchHistory = $('#searchedCity');

// Function to fetch weather data

function getWeatherData(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

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

// function for 5-day forecast 
function getForecastData(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response) {
        const forecastList = response.list; 
        for (let i = 0; i < forecastList.length; i += 8) {
            const dateInfo = new Date(forecastList[i].dt * 1000).toLocaleDateString();
            const temperature = forecastList[i].main.temp;
            const humidity = forecastList[i].main.humidity;
            const windSpeed = forecastList[i].wind.speed;
            const weatherIcon = forecastList[i].weather[0].icon;

            $(`.future-date-${i / 8 + 1}`).text(dateInfo);
            $(`#future-icon-${i / 8 + 1}`).attr('src', `http://openweathermap.org/img/w/${weatherIcon}.png`);
            $(`.future-temperature-${i / 8 + 1}`).text(`Temperature: ${temperature}°C`);
            $(`.future-humidity-${i / 8 + 1}`).text(`Humidity: ${humidity}%`);
            $(`.future-wind-${i / 8 + 1}`).text(`Wind: ${windSpeed} m/s`);
        }
    });
}

// function to add city to searh history 
function addToSearchHistory(city) {
    const listItem = $('<li class="list-group-item border-0>');
    const historyButton = $('<button class="btn history-btn w-100" type="button">');
    historyButton.text(city);
    listItem.append(histoyButton);
    searchHistory.append(listItem);

// Event listener to search history 
    historyButton.on('click', function() {
        const cityName = $(this).text();
        getWeatherData(cityName);
        getForecastData(cityName);
    });
}








});



