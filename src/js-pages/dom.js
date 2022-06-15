import { loadPage } from './scripts';

export const storedUnit = JSON.parse(localStorage.getItem('storedUnit')) || [];

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

    celBtn.addEventListener('click', () => {
      this.storeUnit('metric');
      this.cacheDom(); // get new city name after user input
      loadPage.init(this.city[0], 'metric');
    });
    fahBtn.addEventListener('click', () => {
      this.storeUnit('imperial');
      this.cacheDom(); // get new city name after user input
      loadPage.init(this.city[0], 'imperial');
    });
  },
  storeUnit(selectedUnit) {
    if (storedUnit[0]) storedUnit.pop();
    storedUnit.push(selectedUnit);
    localStorage.setItem('storedUnit', JSON.stringify(storedUnit));
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
