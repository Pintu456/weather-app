
import { useEffect, useState } from 'react';
import coldbg from './bgimages/cold.jpg';
import hotbg from './bgimages/hot.jpg';
//import img from './bgimages/images.jpg';
import Description from './components/Description';
import { getFormattedWeatherDta } from './WeatherService';

function App() {
  const [city, setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(coldbg);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherDta(city, units);
      //console.log(data);
      setWeather(data);
      const thresold = units === "metric" ? 20 : 60;
      if (data.temp <= thresold) {
        setBg(coldbg);
      } else {
        setBg(hotbg);
      }

    }
    fetchWeatherData();
  }, [units, city])
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    console.log(currentUnit);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }
  return (
    <div className="App" style={{ backgroundImage: `url(${bg}` }}>

      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section_inputs">
              <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter city......' />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temprature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temprature">
                <h3>{`${weather.temp.toFixed()}°${units === "metric" ? "C" : "F"}`} </h3>
              </div>

            </div>
            <Description weather={weather} units={units} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
