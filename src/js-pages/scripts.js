import { format, fromUnixTime } from 'date-fns';
import { getData } from './main-async';

export const loadPage = {
  data: null,
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    console.log(loadPage.data);
    console.log(loadPage.data.forecast.current);

    loadPage.cacheDom();
    loadPage.getCity();
    loadPage.getCountry();
    loadPage.getDate();
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
  cacheDom() {
    loadPage.input = document.querySelector('input');
    loadPage.cityName = document.querySelector('#cityDate h2');
    loadPage.date = document.querySelector('#cityDate h4');
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
  getCity() {
    loadPage.cityName.innerText = loadPage.data.city;
  },
  getCountry() {
    loadPage.cityName.innerText += `, ${loadPage.data.countryCode}`;
  },
  getDate() {
    const date = new Date();
    const formattedDate = format(date, 'eeee, d MMMM yyyy | H:mm');
    loadPage.date.innerText = formattedDate;
  },
  getWind() {
    loadPage.wind.innerText = loadPage.data.forecast.current.wind_speed;
  },
  getHumidity() {
    loadPage.humidity.innerText = `${loadPage.data.forecast.current.humidity}%`;
  },
  getUvIndex() {
    loadPage.uvIndex.innerText = `${loadPage.data.forecast.current.uvi}`;
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
    const date = fromUnixTime(loadPage.data.forecast.current.sunrise);
    const extractedTime = format(date, 'H:mm');
    loadPage.sunrise.innerText = extractedTime;
  },
  getSunset() {
    const date = fromUnixTime(loadPage.data.forecast.current.sunset);
    const extractedTime = format(date, 'H:mm');
    loadPage.sunset.innerText = extractedTime;
  },
  getPressure() {
    loadPage.pressure.innerText = `${loadPage.data.forecast.current.pressure} hPa`;
  },
};

export default { loadPage };
