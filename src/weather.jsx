import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Import your CSS file for styling

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = 'd301e36cdd3b7f1fd55601d8beefadc8';

    const fetchWeather = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (err) {
            setError('City Not Found');
            setWeatherData(null);
        }
    }

    // Determine the background image based on the weather description
    const getBackgroundImage = () => {
        if (!weatherData) return '';

        const description = weatherData.weather[0].description.toLowerCase();
        if (description.includes('clear')) {
            return 'url("/images/clear.jpeg")'; // Path to your sunny image
        } else if (description.includes('clouds')) {
            return 'url("/images/cloudy.jpeg")'; // Path to your cloudy image
        } else if (description.includes('rain')) {
            return 'url("/images/rainy.jpeg")'; // Path to your rainy image
        } else if (description.includes('snow')) {
            return 'url("/images/snowy.jpeg")'; // Path to your snowy image
        } else {
            return 'url("/images/default.jpg")'; // Default image if no match
        }
    };

    return (
        <div className='weather-container'>
            <h1>Weather App</h1>
            <form onSubmit={fetchWeather}>
                <input 
                    type="text" 
                    placeholder='Enter City' 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    required 
                />
                <button type="submit">Submit here</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-info" style={{ backgroundImage: getBackgroundImage() }}>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
