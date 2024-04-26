import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const apiKey = '895284fb2d2c50a520ea537456963d9c';

  const fetchWeatherData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=imperial&appid=${apiKey}`;
    axios
      .get(url)
      .then(response => {
        setData(response.data);
        if (response.data.weather && response.data.weather.length > 0) {
          setWeatherBackground(response.data.weather[0].main);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const setWeatherBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        setBackgroundImage('./assets/sunset.jpg');
        break;
      case 'Clouds':
        setBackgroundImage('./assets/sunset.jpg');
        break;
      case 'Rain':
        setBackgroundImage('./assets/rainy.jpg');
        break;
      default:
        setBackgroundImage('./assets/default.jpg');
        break;
    }
  };

  const searchLocation = event => {
    if (event.key === 'Enter') {
      fetchWeatherData();
      setLocation('');
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">{data.main && <h1>{data.main.temp.toFixed()}°F</h1>}</div>
          <div className="description">
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main && (
                <>
                  <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                  <p>Feels Like</p>
                </>
              )}
            </div>
            <div className="humidity">
              {data.main && (
                <>
                  <p className="bold">{data.main.humidity}%</p>
                  <p>Humidity</p>
                </>
              )}
            </div>
            <div className="wind">
              {data.wind && (
                <>
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                  <p>Wind Speed</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
