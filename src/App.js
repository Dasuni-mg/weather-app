import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const apiKey = '895284fb2d2c50a520ea537456963d9c';

  const weatherImages = {
    Clear: 'url(./assets/clear.jpg)',
    Clouds: 'url(./assets/clouds.jpg)',
    Rain: 'url(./assets/rain.jpg)',
    Snow: 'url(./assets/snow.jpg)'
    // Add more weather conditions as needed
  };

  const fetchWeatherData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
    axios.get(url)
      .then(response => {
        const weatherCondition = response.data.weather && response.data.weather.length > 0 ? response.data.weather[0].main : '';
        const imageUrl = weatherImages[weatherCondition] || 'url(./assets/clear.jpg)';
        setBackgroundImage(imageUrl);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
      setLocation('');
    }
  };

  return (
    <div className="app" style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: 'white' }}>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
