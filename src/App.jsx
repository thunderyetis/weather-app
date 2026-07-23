import { useState } from 'react';
import './App.css';

function getWeatherDescription(code) {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Light snow',
    80: 'Rain showers',
    95: 'Thunderstorm',
  };
  return weatherCodes[code] || 'Unknown';
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
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`);
      const weatherData = await weatherResponse.json();
    
      setWeather({
        city: cityName,
        state: state,
        temperature: weatherData.current.temperature_2m,
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
          <p>{weather.temperature}°F</p>
          <p>{getWeatherDescription(weather.code)}</p>
        </div>
      )}
    </div>
  );
}

export default App;