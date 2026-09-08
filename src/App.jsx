import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Forecast from "./forecast";

const API_KEY = "0d9d6fa642662e53t328bfec1ado0b77";
const DEFAULT_CITY = "Boston";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getWeather(city);
  }

  function getWeather(cityName) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${API_KEY}`;
    axios.get(apiUrl).then(showWeather);
  }

  function showWeather(response) {
    setWeatherData({
      city: response.data.city,
      description: response.data.condition.description,
      humidity: Math.round(response.data.temperature.humidity),
      temperature: Math.round(response.data.temperature.current),
      wind: Math.round(response.data.wind.speed).toFixed(1),
      icon: (
        <img
          src={response.data.condition.icon_url}
          alt={response.data.condition.description}
        />
      ),
    });
  }

  useEffect(() => {
    getWeather(DEFAULT_CITY);
  }, []);

  if (!weatherData) {
    return null;
  }

  return (
    <div>
      <div className="weather-app">
        <header>
          <form id="search-form" onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Enter a city.."
              required
              className="search-input"
              id="search-input"
              onChange={handleCityChange}
            />
            <input type="submit" value="Search" className="search-button" />
          </form>
        </header>
        <main>
          <div className="current-weather">
            <div>
              <h1 className="current-city" id="current-city">
                {weatherData.city}
              </h1>
              <div className="current-day">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "numeric",
                  day: "numeric",
                })}
              </div>

              <p className="current-details">
                {weatherData.description} <br />
                Humidity: <strong>{weatherData.humidity}%</strong>, Wind:{" "}
                <strong>{weatherData.wind} km/h</strong>
              </p>
            </div>
            <div className="current-temperature">
              <span className="current-temperature-icon">
                {weatherData.icon}
              </span>
              <span
                className="current-temperature-value"
                id="current-temperature"
              >
                {weatherData.temperature}
              </span>
              <span className="current-temperature-unit">°C</span>
            </div>
          </div>
          <Forecast city={weatherData.city} />
        </main>
        <footer>
          <p>
            This project was coded by{" "}
            <a
              href="https://github.com/FabianaResstel"
              target="_blank"
              rel="noreferrer"
            >
              Fabiana Resstel
            </a>{" "}
            and is{" "}
            <a
              href="https://github.com/FabianaResstel/ReactTest"
              target="_blank"
              rel="noreferrer"
            >
              on GitHub
            </a>{" "}
            and{" "}
            <a href="#" target="_blank" rel="noreferrer">
              hosted on Netlify
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
