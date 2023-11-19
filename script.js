// API keys and URL 

const apiKey = "";
const apiUrl = "";

// Event listener for Search button 
document.getElementById("searchbtn").addEventListener("click", function (event) {
    event.preventDefault();

// get city name 
    const city = document.getElementById("cityInput").value.trim();

//check if city name is not empty 
    if (city !== "") {
        getWeather(city);
        addToHistory(city);
// clear input field
        document.getElementById("cityInput").value = "";
    }
});




