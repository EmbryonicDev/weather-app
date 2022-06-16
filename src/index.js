import {
  userInput, toggleCelFah, storedCity, storedUnit,
} from './js-pages/dom';
import { loadPage, setStaticIcons } from './js-pages/scripts';
import './styles/modern-normalize.css';
import './styles/style.css';

(async () => {
  // Check local storage to load first page
  if (storedCity[0] && storedUnit[0]) {
    await loadPage.init(storedCity[0], storedUnit[0]);
  } else if (storedCity[0] && !storedUnit[0]) {
    await loadPage.init(storedCity[0]);
  } else {
    await loadPage.init();
  }
  setStaticIcons();
  toggleCelFah.init();
  userInput.init();
})();
