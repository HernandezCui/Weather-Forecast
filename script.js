const apiKey = '7b25c2abcd02f063202b03c9975aa808';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('cityInput');
const searchedCityList = document.getElementById('searchedCity');
const currentWeatherDiv = document.querySelector('.current-weather');
const forecastDiv = document.getElementById('forecast');















// // function to fetch current weather data
// async function fetchCurrentWeather(city) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

// // Function to update the current weather section
// function updateCurrentWeather(data) {
//     const cityResult = document.querySelector('.city-result');
//     const temperature = document.querySelector('.temperature');
//     const humidity = document.querySelector('.humidity');
//     const wind = document.querySelector('.wind');
//     const icon = document.getElementById('current-weather-icon');
  
//     cityResult.textContent = `${data.name} (${new Date().toLocaleDateString()})`;
//     temperature.textContent = `Temperature: ${data.main.temp} °C`;
//     humidity.textContent = `Humidity: ${data.main.humidity}%`;
//     wind.textContent = `Wind: ${data.wind.speed} m/s`;
//     icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//   }
  
//   // Function to fetch 5-day forecast data
//   async function fetchForecast(latitude, longitude) {
//     const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.daily;
//   }
  
//   // Function to process and display 5-day forecast
//   function updateForecast(forecastData) {
//     const forecastSection = document.getElementById('forecast');
//     forecastSection.innerHTML = ''; // Clear previous forecast data
  
//     forecastData.forEach((day, index) => {
//       const date = new Date(day.dt * 1000);
//       const dayContainer = document.createElement('div');
//       dayContainer.classList.add('col-sm-2');
//       dayContainer.innerHTML = `
//         <div class="card">
//           <div class="card-section">
//             <h5 class="card-title future-date-${index + 1}">${date.toLocaleDateString()}</h5>
//             <img id="future-icon-${index + 1}" src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="">
//             <p class="card-info future-temperature-${index + 1}">Temperature: ${day.temp.day} °C</p>
//             <p class="card-info future-wind-${index + 1}">Wind: ${day.wind_speed} m/s</p>
//             <p class="card-info future-humidity-${index + 1}">Humidity: ${day.humidity}%</p>
//           </div>
//         </div>
//       `;
//       forecastSection.appendChild(dayContainer);
//     });
//   }
  
//   // Function to store a city in local storage
//   function storeCityInLocalStorage(city) {
//     let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
//     if (!searchHistory.includes(city)) {
//       searchHistory.push(city);
//       localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
//       updateSearchHistoryUI();
//     }
//   }
  
//   // Function to update the search history UI

//   function updateSearchHistoryUI() {
//     const searchHistoryList = document.getElementById('searchedCity');
//     searchHistoryList.innerHTML = ''; // Clear existing search history UI
  
//     const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
//     searchHistory.forEach((city) => {
//       const listItem = document.createElement('li');
//       listItem.classList.add('list-group-item', 'border-0');
//       listItem.innerHTML = `<button class="btn history-btn w-100" type="button">${city}</button>`;
//       searchHistoryList.appendChild(listItem);
//     });
  
//     // Add event listener to the list item to allow clicking on a city in the history
//     searchHistoryList.addEventListener('click', (event) => {
//       if (event.target.classList.contains('history-btn')) {
//         const selectedCity = event.target.textContent;
//         searchWeather(selectedCity);
//       }
//     });
//   }
  
//   // Function to check if local storage is available
//   function isLocalStorageAvailable() {
//     try {
//       localStorage.setItem('test', 'test');
//       localStorage.removeItem('test');
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }
  
//   // Function to search weather for a city
//   async function searchWeather(city) {
//     try {
//       const weatherData = await fetchCurrentWeather(city);
//       const { lat, lon } = weatherData.coord;
  
//       const forecastData = await fetchForecast(lat, lon);
  
//       updateCurrentWeather(weatherData);
//       updateForecast(forecastData);
//       storeCityInLocalStorage(city);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   }
  
//   // Event listener for the search button
//   const searchForm = document.getElementById('search-form');
//   searchForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const cityInput = document.getElementById('cityInput');
//     const city = cityInput.value.trim();
  
//     if (city) {
//       searchWeather(city);
//       cityInput.value = ''; // Clear input field
//     }
//   });
  
//   // Check if local storage is available and update search history UI
//   if (isLocalStorageAvailable()) {
//     updateSearchHistoryUI();
//   } else {
//     console.warn('Local storage is not available on this browser.');
//   }
