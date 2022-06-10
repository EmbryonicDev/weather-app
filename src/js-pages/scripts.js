import { format } from 'date-fns';
import { getData } from './main-async';

export const loadPage = {
  data: null,
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    console.log(loadPage.data);

    loadPage.cacheDom();
    loadPage.getCity();
    loadPage.getCountry();
    loadPage.getDate();
    loadPage.getWind();
    loadPage.getHumidity();
  },
  cacheDom() {
    loadPage.input = document.querySelector('input');
    loadPage.cityName = document.querySelector('#cityDate h2');
    loadPage.date = document.querySelector('#cityDate h4');
    loadPage.wind = document.querySelector('#wind .dayData');
    loadPage.humidity = document.querySelector('#humidity .dayData');
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
};

export default { loadPage };
