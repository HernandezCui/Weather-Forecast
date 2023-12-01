const apiKey = `7b25c2abcd02f063202b03c9975aa808`;
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('cityInput');
const searchedCityList = document.getElementById('searchedCity');
const currentWeatherDiv = document.querySelector('.current-weather');
const forecastDiv = document.getElementById('forecast');


// search form event listener
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
      fetchWeatherData(city);
      cityInput.value = '';
  }
});

// function to fetch weather data
function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Update current weather UI
          updateCurrentWeather(data);
          // Add city to search history
          addToSearchHistory(city);
      })
      .catch(error => console.error('Error fetching current weather:', error));

 // Fetch 5-day forecast
 const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
 fetch(forecastUrl)
     .then(response => response.json())
     .then(data => {
         // Update forecast UI
         updateForecast(data);
     })
     .catch(error => console.error('Error fetching forecast:', error));
}
 // Update UI with current weather data
function updateCurrentWeather(data) {
  currentWeatherDiv.innerHTML = `
      <div class="row">
          <div class="col-sm-4">
              <h3 class="city-result">${data.name} (${getCurrentDate()}) <img id="current-weather-icon" class="d-inline" src="" alt=""></h3>
          </div>
      </div>
      <div class="row">
          <div class="col-sm-4">
              <p class="temperature">Temperature: ${kelvinToCelsius(data.main.temp)}°C</p>
              <p class="humidity">Humidity: ${data.main.humidity}%</p>
              <p class="wind">Wind: ${data.wind.speed} m/s</p>
          </div>
      </div>
  `;
}
