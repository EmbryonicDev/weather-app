import { format, fromUnixTime } from 'date-fns';
import { changeTimeZone, countryName } from './functions';
import { getData } from './main-async';

export const loadPage = {
  data: null,
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    loadPage.placeDate.init();
    console.log(loadPage.data);
    console.log(loadPage.data.forecast.current);

    loadPage.cacheDom();
    loadPage.getWind();
    loadPage.getHumidity();
    loadPage.getUvIndex();
    loadPage.getVisibility();
    loadPage.getClouds();
    loadPage.getChanceOfRain();
    loadPage.getSunrise();
    loadPage.getSunset();
    loadPage.getPressure();
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

  cacheDom() {
    loadPage.input = document.querySelector('input');
    loadPage.wind = document.querySelector('#wind .dayData');
    loadPage.humidity = document.querySelector('#humidity .dayData');
    loadPage.uvIndex = document.querySelector('#uv .dayData');
    loadPage.visibility = document.querySelector('#visibility .dayData');
    loadPage.clouds = document.querySelector('#clouds .dayData');
    loadPage.rainChance = document.querySelector('#rainChance .dayData');
    loadPage.sunrise = document.querySelector('#sunrise .dayData');
    loadPage.sunset = document.querySelector('#sunset .dayData');
    loadPage.pressure = document.querySelector('#pressure .dayData');
  },
  getWind() {
    if (loadPage.data.unit === 'metric') {
      loadPage.wind.innerText = `${Math.round((loadPage.data.forecast.current.wind_speed) * 3.6)} km/h`;
    } else if (loadPage.data.unit === 'imperial') {
      loadPage.wind.innerText = `${Math.round(loadPage.data.forecast.current.wind_speed)} mi/h`;
    }
  },
  getHumidity() {
    loadPage.humidity.innerText = `${loadPage.data.forecast.current.humidity}%`;
  },
  getUvIndex() {
    loadPage.uvIndex.innerText = `${Math.round(loadPage.data.forecast.current.uvi)}`;
  },
  getVisibility() {
    loadPage.visibility.innerText = `${loadPage.data.forecast.current.visibility}`;
  },
  getClouds() {
    loadPage.clouds.innerText = `${loadPage.data.forecast.current.clouds}%`;
  },
  getChanceOfRain() {
    const rainPercentage = loadPage.data.forecast.daily[0].pop;
    loadPage.rainChance.innerText = `${rainPercentage * 100}%`;
  },
  getSunrise() {
    let date = fromUnixTime(loadPage.data.forecast.current.sunrise);
    date = changeTimeZone(date, this.data.forecast.timezone);
    const extractedTime = format(date, 'H:mm');
    loadPage.sunrise.innerText = extractedTime;
  },
  getSunset() {
    let date = fromUnixTime(loadPage.data.forecast.current.sunset);
    date = changeTimeZone(date, this.data.forecast.timezone);
    const extractedTime = format(date, 'H:mm');
    loadPage.sunset.innerText = extractedTime;
  },
  getPressure() {
    loadPage.pressure.innerText = `${loadPage.data.forecast.current.pressure} hPa`;
  },
};

export default { loadPage };
