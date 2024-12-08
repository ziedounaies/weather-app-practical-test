// Define the API details
const apiKey = 'fe824cb856a37281c8c13e7a5fbbd488'; // Your OpenWeather API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Select HTML elements
const searchButton = document.querySelector('button');
const cityInput = document.getElementById('city-data');
const weatherIcon = document.querySelector('#weather-container img');
const weatherTemp = document.querySelector('#weather-details h2');
const weatherCity = document.querySelector('#weather-details h1');
const weatherDesc = document.querySelector('.description');

// Add click event listener for the search button
searchButton.addEventListener('click', async () => {
  const city = cityInput.value.trim(); // Get the city name from input
  if (!city) {
    alert('Please enter a city name.');
    return;
  }
  await fetchWeather(city); // Call the fetchWeather function
});

// Function to fetch weather data from the API
async function fetchWeather(city) {
  try {
    // Make the API request
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json(); // Parse the JSON response
    updateWeatherUI(data); // Update the UI with the fetched data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert(error.message); // Display an error message
  }
}

// Function to update the UI with fetched data
function updateWeatherUI(data) {
  weatherCity.textContent = data.name; // Set the city name
  weatherTemp.textContent = `${data.main.temp}°C`; // Set the temperature
  weatherDesc.textContent = data.weather[0].description; // Set the weather description
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Set the weather icon
}
