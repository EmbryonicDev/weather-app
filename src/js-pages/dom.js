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

export default { toggleCelFah };
