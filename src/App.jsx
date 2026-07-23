import { useState } from 'react';
import './App.css';

function getWeatherInfo(code) {
  const weatherCodes = {
    0: {desc: 'Clear sky', icon: '☀️'},
    1: {desc: 'Mainly clear', icon: '🌤️'},
    2: {desc: 'Partly cloudy', icon: '⛅️'},
    3: {desc: 'Overcast', icon: '☁️'},
    45: {desc: 'Foggy', icon: '🌫️'},
    61: {desc: 'Light rain', icon: '🌧️'},
    63: {desc: 'Moderate rain', icon: '🌧️'},
    65: {desc: 'Heavy rain', icon: '🌧️'},
    71: {desc: 'Light snow', icon: '🌨️'},
    80: {desc: 'Rain showers', icon: '🌦️'},
    95: {desc: 'Thunderstorm', icon: '⛈️'}
  };
  return weatherCodes[code] || {desc: 'Unknown', icon: '🌡️'};
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    setIsLoading(true);
    setError(null);
    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0){
        throw new Error('City not found');
      }
      const {latitude, longitude, name: cityName, admin1: state} = geoData.results[0];
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`);
      const weatherData = await weatherResponse.json();
    
      setWeather({
        city: cityName,
        state: state,
        temperature: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        code: weatherData.current.weather_code,
      });
    } catch (err){
      setError(err.message);
      setWeather(null);
    }
    setIsLoading(false);
  }

  return (
    <div className='app-container'>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder='Enter a city'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{color: 'red' }}>{error}</p>}

      {weather && !isLoading && (
        <div className='weather-result'>
          <h2>{weather.city}, {weather.state}</h2>
          <div style={{fontSize: '3rem', margin: '10px 0'}}>
            {getWeatherInfo(weather.code).icon}
          </div>
          <p>{getWeatherInfo(weather.code).desc}</p>
          <p>{weather.temperature}°F</p>
          <p>{getWeatherDescription(weather.code)}</p>
          <p>Feels Like: {weather.feelsLike}°F</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} mph</p>
        </div>
      )}
    </div>
  );
}

export default App;