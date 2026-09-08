import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = "0d9d6fa642662e53t328bfec1ado0b77";
export default function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${API_KEY}`;
    axios.get(apiUrl).then((response) => {
      setForecast(response.data.daily.slice(1, 6));
    });
  }, [city]);
  return (
    <div className="forecast">
      {" "}
      {forecast.map((day, index) => (
        <div className="forecast-card" key={index}>
          {" "}
          <div className="forecast-day">
            {" "}
            {new Date(day.time * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}{" "}
          </div>{" "}
          <img
            src={day.condition.icon_url}
            alt={day.condition.description}
            className="forecast-icon"
          />{" "}
          <div className="forecast-temperature">
            {" "}
            {Math.round(day.temperature.day)}°C{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
