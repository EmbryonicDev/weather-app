import { loadPage } from './scripts';

export const toggleCelFah = {
  init() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom() {
    this.city = document.querySelector('#cityDate h2').innerText.split(', ');
    this.unitBtn = document.querySelectorAll('.unitBtn');
  },
  bindEvents() {
    const celBtn = this.unitBtn[0];
    const fahBtn = this.unitBtn[1];

    celBtn.addEventListener('click', loadPage.init.bind(loadPage.init.bind, this.city[0], 'metric'));
    fahBtn.addEventListener('click', loadPage.init.bind(loadPage.init.bind, this.city[0], 'imperial'));
  },
};

export const userInput = {
  searchCity: null,
  init() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom() {
    this.input = document.querySelector('input');
    this.form = document.querySelector('form');
  },
  bindEvents() {
    this.input.addEventListener('input', this.getInput.bind());
    this.form.addEventListener('submit', this.submitCity.bind());
  },
  getInput() {
    userInput.searchCity = userInput.input.value;
  },
  submitCity(e) {
    e.preventDefault();
    loadPage.init(userInput.searchCity);
  },
};

export default { toggleCelFah, userInput };
