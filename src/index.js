// import { getForecast } from './js-pages/main-async';
import { toggleCelFah } from './js-pages/dom';
import { loadPage } from './js-pages/scripts';
import './styles/modern-normalize.css';
import './styles/style.css';

(async () => {
  await loadPage.init();
  toggleCelFah.init();
})();
