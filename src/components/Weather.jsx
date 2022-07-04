import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import img from '../assets/img'
import '../App.css'
import SearchCity from './SearchCity';


const Weather = () => {

    const apiKey = 'ec54de4495bcf32900fb1d67d890376d'

    const [isCelcius, setIsCelcius] = useState(true)

    const { data: weatherData, getData: getWeatherData } = useAxios(`https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=${apiKey}&units=metric`)

    const togggleTemperature = () => {
        if (isCelcius) {
            weatherData.main.temp = ((weatherData.main.temp * 9 / 5) + 32).toFixed(2)
            weatherData.main.feels_like = ((weatherData.main.feels_like * 9 / 5) + 32).toFixed(2)
        } else {
            weatherData.main.temp = ((weatherData.main.temp - 32) * 5 / 9).toFixed(2)
            weatherData.main.feels_like = ((weatherData.main.feels_like - 32) * 5 / 9).toFixed(2)
        }
        setIsCelcius(!isCelcius)
    }

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            const crd = pos.coords;
            const lat = crd.latitude
            const lon = crd.longitude
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            getWeatherData(url)
        }

        function error(err) {
            const lat = 51.51
            const lon = -0.13
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            getWeatherData(url)
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

    }, [])

    const getNewCity = (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec54de4495bcf32900fb1d67d890376d&units=metric`
        getWeatherData(url)
    }

    let now = new Date();

    now = now.toDateString()

    return (
        <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', backgroundImage: `url(${img[weatherData.weather?.[0].main]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', color: 'white', height: '100vh', display: 'grid', placeContent: 'center' }}>
                <div className='text-center bg-dark bg-opacity-50 p-3 border rounded-4'>
                    <h1>Weather App</h1>
                    <h2 className='text-end'>{weatherData.name}, {weatherData.sys?.country}</h2>
                    <h3 className='text-end'>{now}</h3>
                    <div className='d-flex text-start gap-3'>
                        <div className='m-auto'>
                            <p style={{ fontSize: '3rem', color:'aquamarine' }}>{weatherData.main?.temp}{isCelcius ? '°C' : '°F'}</p>
                        </div>
                        <div style={{ fontSize: '1.2rem' }} className='m-auto'>
                            <p style={{ textTransform: 'capitalize'}}>{weatherData.weather?.[0].description}</p>
                            <p>Feels like: <span>{weatherData.main?.feels_like}°</span></p>
                        </div>
                        <img style={{ height: '8rem' }} className='m-auto' src={`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`} alt="" />
                    </div>
                    <div className='d-flex justify-content-between icon-container'>
                        <div className='border rounded-5 p-3 col-3'>
                            <i style={{ transform: `rotate(${(weatherData.wind?.deg - 90)}deg)` }} className="fa-solid fa-wind"></i>
                            <p><span>Wind Speed</span></p>
                            <p>{weatherData.wind?.speed} m/s</p>
                        </div>
                        <div className='border rounded-5 p-3 col-3'>
                            <i className="fa-solid fa-cloud"></i>
                            <p><span>Clouds</span></p>
                            <p>{weatherData.clouds?.all}%</p>
                        </div>

                        <div className='border rounded-5 p-3 col-3'>
                            <i className="fa-solid fa-temperature-full"></i>
                            <p><span>Pressure</span></p>
                            <p>{weatherData.main?.pressure} hPa</p>
                        </div>
                    </div>
                    <div className='my-4'>
                        <button onClick={togggleTemperature} className='btn btn-primary'><p>Convert to {isCelcius ? '°F' : '°C'}</p></button>
                    </div>
                    <SearchCity getNewCity={getNewCity} />
                </div>
            </div>
        </div>
    );
};

export default Weather;