import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' },
    });
    return response.data;
  } catch (error) {
    throw new Error('City not found');
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch weather for your location');
  }
};

export const getForecastByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: 'metric' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch forecast');
  }
};