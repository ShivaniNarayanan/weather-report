import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = "296197b54bdd899dd48f156532227b1a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-700 to-yellow-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center mb-6 tracking-wide text-white drop-shadow-md">
          🌦️ Weather Report
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Enter City Name"
          />
          <button
            onClick={fetchWeather}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg font-semibold shadow-md transition"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-red-300 font-medium">{error}</p>
        )}

        {weather && (
          <div className="mt-8 text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
            <p className="text-lg capitalize mb-1">
              {weather.weather[0].description}
            </p>
            <p className="text-4xl font-extrabold mb-2">
              {weather.main.temp}°C
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <span>Humidity: {weather.main.humidity}%</span>
              <span>Wind: {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
