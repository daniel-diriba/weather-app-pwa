import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [error, setError] = useState(null);

    const search = async (e) => {
        if (e.key !== 'Enter' || !query.trim()) return;
        setError(null);
        try {
            const data = await fetchWeather(query.trim());
            setWeather(data);
            setQuery('');
        } catch (err) {
            setError(err?.response?.data?.message || 'City not found. Try again.');
            setWeather({});
        }
    };

    const bgUrl = `${process.env.PUBLIC_URL || ''}/images/bg.jpg`;
    const bgStyle = {
        backgroundColor: '#0a1f44',
        background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.418) ), url(${bgUrl})`,
    };
    return (
        <div className="main-container" style={bgStyle}>
            <input
                type="text"
                className="search"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={search}
            />
            {error && <p className="error">{error}</p>}
            {weather.main && weather.sys && weather.weather?.[0] && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;