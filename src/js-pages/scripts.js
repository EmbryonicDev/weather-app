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
    loadPage.formatBtn();
    loadPage.placeDate.init();
    loadPage.weatherNow.init();
    loadPage.dayDetails.init();
    loadPage.weekly.init();
  },

  formatBtn() {
    const unitBtn = document.querySelectorAll('.unitBtn');
    const celBtn = unitBtn[0];
    const fahBtn = unitBtn[1];

    if (loadPage.unitUsed === 'imperial') {
      fahBtn.classList.add('selectedBtn');
      celBtn.classList.remove('selectedBtn');
    }
  },

  getTemp(temperature, element) {
    const dummyElement = element;
    const temp = celOrFah(temperature, loadPage.unitUsed);
    dummyElement.innerText = temp;
  },

  getWind(windSpeed, element) {
    const dummyElement = element;
    if (loadPage.unitUsed === 'metric') {
      dummyElement.innerText = `${Math.round((windSpeed) * 3.6)} km/h`;
    } else if (loadPage.data.unit === 'imperial') {
      dummyElement.innerText = `${Math.round(windSpeed)} mph`;
    }
  },

  getIcon(iconCode, element) {
    const dummyElement = element;
    if (iconCode === '01d') dummyElement.src = icon01d;
    if (iconCode === '01n') dummyElement.src = icon01n;
    if (iconCode === '02d') dummyElement.src = icon02d;
    if (iconCode === '02n') dummyElement.src = icon02n;
    if (iconCode === '02d') dummyElement.src = icon02d;
    if (iconCode === '03n') dummyElement.src = icon03n;
    if (iconCode === '03d') dummyElement.src = icon03d;
    if (iconCode === '04n') dummyElement.src = icon04n;
    if (iconCode === '04d') dummyElement.src = icon04d;
    if (iconCode === '10n') dummyElement.src = icon10n;
    if (iconCode === '10d') dummyElement.src = icon10d;
    if (iconCode === '11n') dummyElement.src = icon11n;
    if (iconCode === '11d') dummyElement.src = icon11d;
    if (iconCode === '09n') dummyElement.src = icon09n;
    if (iconCode === '09d') dummyElement.src = icon09d;
    if (iconCode === '13n') dummyElement.src = icon13n;
    if (iconCode === '13d') dummyElement.src = icon13d;
    if (iconCode === '50n') dummyElement.src = icon50n;
    if (iconCode === '50d') dummyElement.src = icon50d;
    if (iconCode === '1232n') dummyElement.src = icon1232n;
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
      // get current temp
      loadPage.getTemp(loadPage.data.forecast.current.temp, loadPage.weatherNow.temp);
      // get feels like temp
      loadPage.getTemp(loadPage.data.forecast.current.feels_like, loadPage.weatherNow.feelsLike);
      loadPage.weatherNow.getSky();
      loadPage.getIcon(
        loadPage.data.forecast.current.weather[0].icon,
        loadPage.weatherNow.weatherIcon,
      );
    },
    cacheDom() {
      loadPage.weatherNow.temp = document.querySelector('#dayMain span');
      loadPage.weatherNow.sky = document.querySelector('#daySky');
      loadPage.weatherNow.weatherIcon = document.querySelector('#dayMain > p > img');
      loadPage.weatherNow.feelsLike = document.querySelector('#feelsLike span');
    },
    getSky() {
      const sky = titleCase(loadPage.data.forecast.current.weather[0].description);
      loadPage.weatherNow.sky.innerText = sky;
    },
  },

  dayDetails: {
    init: () => {
      loadPage.dayDetails.cacheDom();
      loadPage.getWind(loadPage.data.forecast.current.wind_speed, loadPage.dayDetails.wind);
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

  weekly: {
    init() {
      loadPage.weekly.getWeekForecast();
    },
    getWeekForecast() {
      const weekDay = document.querySelectorAll('.day');
      const icon = document.querySelectorAll('.dayIcon');
      const maxTemp = document.querySelectorAll('.dayMax');
      const minTemp = document.querySelectorAll('.dayMin');
      const wind = document.querySelectorAll('.dayWind');

      for (let i = 1; i < 8; i += 1) {
        // get weekday from date
        let date = fromUnixTime(loadPage.data.forecast.daily[i].dt);
        date = changeTimeZone(date, loadPage.data.forecast.timezone);
        const dayName = format(date, 'eeee');
        weekDay[i - 1].innerText = dayName;

        loadPage.getIcon(loadPage.data.forecast.daily[i].weather[0].icon, icon[i - 1]);
        loadPage.getTemp(loadPage.data.forecast.daily[i].temp.max, maxTemp[i - 1]);
        loadPage.getTemp(loadPage.data.forecast.daily[i].temp.min, minTemp[i - 1]);
        loadPage.getWind(loadPage.data.forecast.daily[i].wind_speed, wind[i - 1]);
      }
    },
  },

};

export default { loadPage };
