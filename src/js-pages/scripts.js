import { format, fromUnixTime } from 'date-fns';
import {
  celOrFah, changeTimeZone, countryName, getDistance, titleCase,
} from './functions';
import { getData } from './main-async';
import icon01d from '../assets/icons/01d.svg';
import icon01n from '../assets/icons/01n.svg';
import icon02d from '../assets/icons/02d.svg';
import icon02n from '../assets/icons/02n.svg';
import icon03d from '../assets/icons/03d.svg';
import icon03n from '../assets/icons/03n.svg';
import icon04d from '../assets/icons/04d.svg';
import icon04n from '../assets/icons/04n.svg';
import icon09d from '../assets/icons/09d.svg';
import icon09n from '../assets/icons/09n.svg';
import icon10d from '../assets/icons/10d.svg';
import icon10n from '../assets/icons/10n.svg';
import icon11d from '../assets/icons/11d.svg';
import icon11n from '../assets/icons/11n.svg';
import icon13d from '../assets/icons/13d.svg';
import icon13n from '../assets/icons/13n.svg';
import icon50d from '../assets/icons/50d.svg';
import icon50n from '../assets/icons/50n.svg';
import icon1232n from '../assets/icons/1232n.svg';

export const loadPage = {
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    loadPage.unitUsed = loadPage.data.unit;
    loadPage.placeDate.init();
    loadPage.weatherNow.init();
    loadPage.dayDetails.init();

    console.log(loadPage.data);
    console.log(loadPage.data.forecast.current);
  },

  placeDate: {
    init: () => {
      loadPage.placeDate.cacheDom();
      loadPage.placeDate.getCity();
      loadPage.placeDate.getCountry();
      loadPage.placeDate.getDate();
    },
    cacheDom() {
      loadPage.placeDate.cityName = document.querySelector('#cityDate h2');
      loadPage.placeDate.date = document.querySelector('#cityDate h4');
    },
    getCity() {
      loadPage.placeDate.cityName.innerText = loadPage.data.city;
    },
    getCountry() {
      loadPage.placeDate.cityName.innerText += `, ${countryName.of(loadPage.data.countryCode)}`;
    },
    getDate() {
      let date = new Date();
      date = changeTimeZone(date, loadPage.data.forecast.timezone);
      const formattedDate = format(date, 'eeee, d MMMM yyyy | H:mm');
      loadPage.placeDate.date.innerText = formattedDate;
    },
  },

  weatherNow: {
    init: () => {
      loadPage.weatherNow.cacheDom();
      loadPage.weatherNow.getTemp();
      loadPage.weatherNow.getSky();
      loadPage.weatherNow.getIcon();
      loadPage.weatherNow.getFeelsLike();
    },
    cacheDom() {
      loadPage.weatherNow.temp = document.querySelector('#dayMain span');
      loadPage.weatherNow.sky = document.querySelector('#daySky');
      loadPage.weatherNow.weatherIcon = document.querySelector('#dayMain > p > img');
      loadPage.weatherNow.feelsLike = document.querySelector('#feelsLike span');
    },
    getTemp() {
      const temp = celOrFah(loadPage.data.forecast.current.temp, loadPage.unitUsed);
      loadPage.weatherNow.temp.innerText = temp;
    },
    getSky() {
      const sky = titleCase(loadPage.data.forecast.current.weather[0].description);
      loadPage.weatherNow.sky.innerText = sky;
    },
    getIcon() {
      const iconCode = loadPage.data.forecast.current.weather[0].icon;
      const { weatherIcon } = loadPage.weatherNow;
      if (iconCode === '01d') weatherIcon.src = icon01d;
      if (iconCode === '01n') weatherIcon.src = icon01n;
      if (iconCode === '02d') weatherIcon.src = icon02d;
      if (iconCode === '02n') weatherIcon.src = icon02n;
      if (iconCode === '02d') weatherIcon.src = icon02d;
      if (iconCode === '03n') weatherIcon.src = icon03n;
      if (iconCode === '03d') weatherIcon.src = icon03d;
      if (iconCode === '04n') weatherIcon.src = icon04n;
      if (iconCode === '04d') weatherIcon.src = icon04d;
      if (iconCode === '10n') weatherIcon.src = icon10n;
      if (iconCode === '10d') weatherIcon.src = icon10d;
      if (iconCode === '11n') weatherIcon.src = icon11n;
      if (iconCode === '11d') weatherIcon.src = icon11d;
      if (iconCode === '09n') weatherIcon.src = icon09n;
      if (iconCode === '09d') weatherIcon.src = icon09d;
      if (iconCode === '13n') weatherIcon.src = icon13n;
      if (iconCode === '13d') weatherIcon.src = icon13d;
      if (iconCode === '50n') weatherIcon.src = icon50n;
      if (iconCode === '50d') weatherIcon.src = icon50d;
      if (iconCode === '1232n') weatherIcon.src = icon1232n;
    },
    getFeelsLike() {
      const temp = celOrFah(loadPage.data.forecast.current.feels_like, loadPage.unitUsed);
      loadPage.weatherNow.feelsLike.innerText = temp;
    },
  },

  dayDetails: {
    init: () => {
      loadPage.dayDetails.cacheDom();
      loadPage.dayDetails.getWind();
      loadPage.dayDetails.getHumidity();
      loadPage.dayDetails.getUvIndex();
      loadPage.dayDetails.getVisibility();
      loadPage.dayDetails.getClouds();
      loadPage.dayDetails.getChanceOfRain();
      loadPage.dayDetails.getSunrise();
      loadPage.dayDetails.getSunset();
      loadPage.dayDetails.getPressure();
    },
    cacheDom() {
      loadPage.dayDetails.wind = document.querySelector('#wind .dayData');
      loadPage.dayDetails.humidity = document.querySelector('#humidity .dayData');
      loadPage.dayDetails.uvIndex = document.querySelector('#uv .dayData');
      loadPage.dayDetails.visibility = document.querySelector('#visibility .dayData');
      loadPage.dayDetails.clouds = document.querySelector('#clouds .dayData');
      loadPage.dayDetails.rainChance = document.querySelector('#rainChance .dayData');
      loadPage.dayDetails.sunrise = document.querySelector('#sunrise .dayData');
      loadPage.dayDetails.sunset = document.querySelector('#sunset .dayData');
      loadPage.dayDetails.pressure = document.querySelector('#pressure .dayData');
    },
    getWind() {
      if (loadPage.unitUsed === 'metric') {
        loadPage.dayDetails.wind.innerText = `${Math.round((loadPage.data.forecast.current.wind_speed) * 3.6)} km/h`;
      } else if (loadPage.data.unit === 'imperial') {
        loadPage.dayDetails.wind.innerText = `${Math.round(loadPage.data.forecast.current.wind_speed)} mph`;
      }
    },
    getHumidity() {
      loadPage.dayDetails.humidity.innerText = `${loadPage.data.forecast.current.humidity}%`;
    },
    getUvIndex() {
      loadPage.dayDetails.uvIndex.innerText = `${Math.round(loadPage.data.forecast.current.uvi)}`;
    },
    getVisibility() {
      const visDistance = getDistance(loadPage.data.forecast.current.visibility, loadPage.unitUsed);
      loadPage.dayDetails.visibility.innerText = visDistance;
    },
    getClouds() {
      loadPage.dayDetails.clouds.innerText = `${loadPage.data.forecast.current.clouds}%`;
    },
    getChanceOfRain() {
      const rainPercentage = loadPage.data.forecast.daily[0].pop;
      loadPage.dayDetails.rainChance.innerText = `${Math.round(rainPercentage * 100)}%`;
    },
    getSunrise() {
      let date = fromUnixTime(loadPage.data.forecast.current.sunrise);
      date = changeTimeZone(date, loadPage.data.forecast.timezone);
      const extractedTime = format(date, 'H:mm');
      loadPage.dayDetails.sunrise.innerText = extractedTime;
    },
    getSunset() {
      let date = fromUnixTime(loadPage.data.forecast.current.sunset);
      date = changeTimeZone(date, loadPage.data.forecast.timezone);
      const extractedTime = format(date, 'H:mm');
      loadPage.dayDetails.sunset.innerText = extractedTime;
    },
    getPressure() {
      loadPage.dayDetails.pressure.innerText = `${loadPage.data.forecast.current.pressure} hPa`;
    },
  },
};

export default { loadPage };
