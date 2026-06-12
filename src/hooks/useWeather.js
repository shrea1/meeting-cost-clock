import { useState, useEffect } from 'react';
import axios from 'axios';

// Icon key matches the component in WeatherIcon.jsx
const WMO_CODES = {
  0:  { label: 'Clear sky',     icon: 'sun' },
  1:  { label: 'Mainly clear',  icon: 'sun-cloud' },
  2:  { label: 'Partly cloudy', icon: 'sun-cloud' },
  3:  { label: 'Overcast',      icon: 'cloud' },
  45: { label: 'Foggy',         icon: 'fog' },
  48: { label: 'Icy fog',       icon: 'fog' },
  51: { label: 'Light drizzle', icon: 'drizzle' },
  61: { label: 'Light rain',    icon: 'rain' },
  63: { label: 'Moderate rain', icon: 'rain' },
  71: { label: 'Light snow',    icon: 'snow' },
  80: { label: 'Rain showers',  icon: 'drizzle' },
  95: { label: 'Thunderstorm',  icon: 'thunder' },
}

export function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function initializeWeatherTracking() {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async ({coords}) => {
                const { latitude, longitude } = coords;
                try {
                    const [weatherRes, geoRes] = await Promise.all([
                        axios.get('https://api.open-meteo.com/v1/forecast', {
                            params: {
                                latitude,
                                longitude,
                                current: 'temperature_2m,weather_code',
                                timezone: 'auto',
                            },
                        }),
                        axios.get('https://nominatim.openstreetmap.org/reverse', {
                            params: {
                                lat: latitude,
                                lon: longitude,
                                format: 'json',
                            },
                            headers: {
                                'User-Agent': 'MeetingCostClock/1.0'
                            }
                        }),
                    ]);

                    const code = weatherRes.data.current.weather_code
                    const condition = WMO_CODES[code] || { label: 'Unknown', icon: 'sun' }
                    const address = geoRes.data.address || {}

                    setWeather({
                        temp: Math.round(weatherRes.data.current.temperature_2m),
                        condition: condition.label,
                        icon: condition.icon,
                        city:
                            address.city ||
                            address.town ||
                            address.village ||
                            address.hamlet ||
                            'Your location',
                    });
                }catch (err) {
                    setError('Failed to fetch weather data');
                    console.error(err);
                } finally {        
                    setLoading(false);
                }    
                
            },
            () => {
                setError('Your location access is denied');
                setLoading(false);
            }
        );
    }

    initializeWeatherTracking();
    }, []);

    return { weather, loading, error };
}