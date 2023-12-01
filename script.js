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


// Update UI with 5-day forecast data
function updateForecast(data) {
  forecastDiv.innerHTML = '';

  for (let i = 0; i < data.list.length; i += 8) {
      const forecastData = data.list[i];
      const date = formatDate(forecastData.dt_txt);

      forecastDiv.innerHTML += `
          <div class="col-sm-2">
              <div class="card">
                  <div class="card-section">
                      <h5 class="card-title future-date-${i}">${date}</h5>
                      <img id="future-icon-${i}" src="" alt="">
                      <p class="card-info future-temperature-${i}">Temperature: ${kelvinToCelsius(forecastData.main.temp)}°C</p>
                      <p class="card-info future-wind-${i}">Wind: ${forecastData.wind.speed} m/s</p>
                      <p class="card-info future-humidity-${i}">Humidity: ${forecastData.main.humidity}%</p>
                  </div>
              </div>
          </div>
      `;
  }
}

// function for search history 
function addToSearchHistory(city) {
  // Check if the city is already in the search history
  const existingCities = Array.from(searchedCityList.children).map(item => item.innerText.toLowerCase());
  const lowercaseCity = city.toLowerCase();

  if (!existingCities.includes(lowercaseCity)) {

  const listItem = document.createElement('li');
  listItem.className = 'list-group-item border-0';
  listItem.innerHTML = `<button class="btn history-btn w-100" type="button">${city}</button>`;
  searchedCityList.appendChild(listItem);

  // Add click event to the new button
  const cityButton = listItem.querySelector('button');
  cityButton.addEventListener('click', function () {
      fetchWeatherData(city);
    });
  }
}

// function to get date of weather
function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  return `${month}/${day}/${year}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  return `${month}/${day}`;
}

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}