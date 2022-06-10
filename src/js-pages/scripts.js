import { getData } from './main-async';

export const loadPage = {
  data: null,
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    console.log(loadPage.data);

    loadPage.cacheDom();
    loadPage.getCity();
    loadPage.getCountry();
  },
  cacheDom() {
    loadPage.input = document.querySelector('input');
    loadPage.cityName = document.querySelector('#cityDate h2');
    loadPage.date = document.querySelector('#cityDate h4');
  },
  getCity() {
    loadPage.cityName.innerText = loadPage.data.city;
  },
  getCountry() {
    loadPage.cityName.innerText += `, ${loadPage.data.countryCode}`;
  },
};

export default { loadPage };
