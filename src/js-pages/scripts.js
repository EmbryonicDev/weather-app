import { format, fromUnixTime } from 'date-fns';
import { changeTimeZone, countryName } from './functions';
import { getData } from './main-async';

export const loadPage = {
  data: null,
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    loadPage.placeDate.init();
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
      if (loadPage.data.unit === 'metric') {
        loadPage.dayDetails.wind.innerText = `${Math.round((loadPage.data.forecast.current.wind_speed) * 3.6)} km/h`;
      } else if (loadPage.data.unit === 'imperial') {
        loadPage.dayDetails.wind.innerText = `${Math.round(loadPage.data.forecast.current.wind_speed)} mi/h`;
      }
    },
    getHumidity() {
      loadPage.dayDetails.humidity.innerText = `${loadPage.data.forecast.current.humidity}%`;
    },
    getUvIndex() {
      loadPage.dayDetails.uvIndex.innerText = `${Math.round(loadPage.data.forecast.current.uvi)}`;
    },
    getVisibility() {
      loadPage.dayDetails.visibility.innerText = `${loadPage.data.forecast.current.visibility}`;
    },
    getClouds() {
      loadPage.dayDetails.clouds.innerText = `${loadPage.data.forecast.current.clouds}%`;
    },
    getChanceOfRain() {
      const rainPercentage = loadPage.data.forecast.daily[0].pop;
      loadPage.dayDetails.rainChance.innerText = `${rainPercentage * 100}%`;
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
