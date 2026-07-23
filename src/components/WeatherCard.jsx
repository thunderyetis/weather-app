import React, {useState} from 'react';

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

function WeatherCard({weather}) {
    const[isFahrenheit, setIsFahrenheit] = useState(true);
    const weatherInfo = getWeatherInfo(weather.code);
    const temp = isFahrenheit
        ? Math.round(weather.temperature)
        : Math.round((weather.temperature - 32) * (5/9));
    const feelsLike = isFahrenheit
        ? Math.round(weather.feelsLike)
        : Math.round((weather.feelsLike - 32) * (5/9));
    const unitSymbol = isFahrenheit ? '°F' : '°C';
    return (
        <div className='weather-result'>
          <h2>{weather.city}, {weather.state}</h2>
          <div style={{fontSize: '3rem', margin: '10px 0'}}>
            {getWeatherInfo(weather.code).icon}
          </div>
          <p>{getWeatherInfo(weather.code).desc}</p>
          <p>{temp}{unitSymbol}</p>
          <button
            onClick={() => setIsFahrenheit(!isFahrenheit)}
            style={{margin: '10px 0', padding: '6px 12px', cursor: 'pointer'}}
          >
            Switch to °{isFahrenheit ? 'C' : 'F'}
          </button>
          <p>Feels Like: {feelsLike}{unitSymbol}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} mph</p>
        </div>
    );
}

export default WeatherCard;