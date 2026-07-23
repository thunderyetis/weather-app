# React Weather Dashboard:

* A responsive React weather application built with Vite and powered by the Open-Meteo API. Users can search for any city to view current conditions, local metrics, and toggle beteween Fahrenheit and Celcius units.

# Features and Requirements Met:

* City Search and Geocoding: Converts location queries into precise latitude and longitude coordinates with Open-Meteo's Geocoding API
* Core Weather Metrics: Displays real-time temperature, "Feels like" temperature, humidity percentage, and wind speed.
* Visual Weather Icons: Maps weather condition codes using the World Meteorological Organization standard to a readable descriptions and visual indicators.
* Metric toggle: Dynamically recalculates temperature and "feels like" metrics instantly without making redundant API calls.
* Error and Loading States: Built-in safeguards for non-existent cities, empty searches, and network latency.
* Component-Based Architecture: Modular structure separating application state and API calling ('App.jsx') from presentation ('WeatherCard.jsx').

# Tech Stack and API Selection:

* Frontend: React, HTML, CSS, JavaScript
* Build Tool: Vite
* Weather Data Source: Open-Meteo API, (https://open-meteo.com/) Chosen for reliabity and open access without requiring hardcoded API.

# Architectural Trade-Offs and Decisions

* Client-Side Unit Conversions: Instead of triggering a fresh API request each time a user switches between °F or °C. Mathematical conversions are performed in real-time wihtin "Weather Card" state. This minimizes overhead and improves responsiveness.
* No Hardcoded Keys: Using Open-Meteo gets rid of key management, allowing users to clone and run the respository instantly out of the box.

# To run this project locally on your machine:

```
1. Clone the Repository
git clone https://github.com/thunderyetis/weather-app.git
cd weather-app

2. Install Dependencies
npm install

3. Start the local development server
npm run dev
```

