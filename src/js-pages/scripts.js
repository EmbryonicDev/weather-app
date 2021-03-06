import { format, fromUnixTime } from 'date-fns';
// eslint-disable-next-line import/no-cycle
import { getData } from './main-async';
import icon01d from '../assets/icons/01d.svg';
import icon01n from '../assets/icons/01n.svg';
import icon02d from '../assets/icons/02d.svg';
import icon02n from '../assets/icons/02n.svg';
import icon03d from '../assets/icons/03d.svg';
import icon03n from '../assets/icons/03n.svg';
import icon04d from '../assets/icons/04d.svg';
import icon04n from '../assets/icons/04n.svg';
import icon09d from '../assets/icons/09d.svg';
import icon09n from '../assets/icons/09n.svg';
import icon10d from '../assets/icons/10d.svg';
import icon10n from '../assets/icons/10n.svg';
import icon11d from '../assets/icons/11d.svg';
import icon11n from '../assets/icons/11n.svg';
import icon13d from '../assets/icons/13d.svg';
import icon13n from '../assets/icons/13n.svg';
import icon50d from '../assets/icons/50d.svg';
import icon50n from '../assets/icons/50n.svg';
import icon1232n from '../assets/icons/1232n.svg';
import mainIcon from '../assets/icons/weather-icon.svg';
import magIcon from '../assets/icons/search-icon.svg';
import favicon from '../assets/icons/favicon.png';

export const setStaticIcons = () => {
  const searchIcon = document.getElementById('searchIcon');
  const headerIcon = document.getElementById('mainIcon');

  searchIcon.src = magIcon;
  headerIcon.src = mainIcon;
};

export const setFavicon = () => {
  const headTitle = document.querySelector('head');
  const faviconIcon = document.createElement('link');
  faviconIcon.setAttribute('rel', 'shortcut icon');
  faviconIcon.setAttribute('href', favicon);
  headTitle.appendChild(faviconIcon);
};

// Convert country code to full country name
export const countryName = new Intl.DisplayNames(['en'], { type: 'region' });

export const loadPage = {
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    loadPage.unitUsed = loadPage.data.unit;
    loadPage.formatBtn();
    loadPage.placeDate.init();
    loadPage.weatherNow.init();
    loadPage.dayDetails.init();
    loadPage.weekly.init();
  },

  // Start of helper functions
  titleCase(str) {
    const returnValue = str.toLowerCase().split(' ');
    for (let i = 0; i < returnValue.length; i += 1) {
      returnValue[i] = returnValue[i].charAt(0).toUpperCase() + returnValue[i].slice(1);
    }
    return returnValue.join(' ');
  },

  getDistance(distanceInMeters, unit) {
    let returnValue;
    if (unit === 'metric') returnValue = `${Math.round(distanceInMeters / 1000)} km`;
    if (unit === 'imperial') returnValue = `${Math.round(distanceInMeters / 1609)} mi`;
    return returnValue;
  },

  formatBtn() {
    const unitBtn = document.querySelectorAll('.unitBtn');
    const celBtn = unitBtn[0];
    const fahBtn = unitBtn[1];

    if (loadPage.unitUsed === 'imperial') {
      fahBtn.classList.add('selectedBtn');
      celBtn.classList.remove('selectedBtn');
    }
  },

  changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
      return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone,
        }),
      );
    }
    return new Date(
      date.toLocaleString('en-US', {
        timeZone,
      }),
    );
  },

  celOrFah(temp, unit) {
    let returnValue;
    if (unit === 'metric') returnValue = `${Math.round(temp)} ??C`;
    if (unit === 'imperial') returnValue = `${Math.round(temp)} ??F`;
    return returnValue;
  },

  getTemp(temperature, element) {
    const dummyElement = element;
    const temp = loadPage.celOrFah(temperature, loadPage.unitUsed);
    dummyElement.innerText = temp;
  },

  getWind(windSpeed, element) {
    const dummyElement = element;
    if (loadPage.unitUsed === 'metric') {
      dummyElement.innerText = `${Math.round((windSpeed) * 3.6)} km/h`;
    } else if (loadPage.data.unit === 'imperial') {
      dummyElement.innerText = `${Math.round(windSpeed)} mph`;
    }
  },

  getTime(time, timeZone, dateFormat) {
    let date = fromUnixTime(time);
    date = loadPage.changeTimeZone(date, timeZone);
    return format(date, dateFormat);
  },

  getIcon(iconCode, element) {
    const dummyElement = element;
    if (iconCode === '01d') dummyElement.src = icon01d;
    if (iconCode === '01n') dummyElement.src = icon01n;
    if (iconCode === '02d') dummyElement.src = icon02d;
    if (iconCode === '02n') dummyElement.src = icon02n;
    if (iconCode === '02d') dummyElement.src = icon02d;
    if (iconCode === '03n') dummyElement.src = icon03n;
    if (iconCode === '03d') dummyElement.src = icon03d;
    if (iconCode === '04n') dummyElement.src = icon04n;
    if (iconCode === '04d') dummyElement.src = icon04d;
    if (iconCode === '10n') dummyElement.src = icon10n;
    if (iconCode === '10d') dummyElement.src = icon10d;
    if (iconCode === '11n') dummyElement.src = icon11n;
    if (iconCode === '11d') dummyElement.src = icon11d;
    if (iconCode === '09n') dummyElement.src = icon09n;
    if (iconCode === '09d') dummyElement.src = icon09d;
    if (iconCode === '13n') dummyElement.src = icon13n;
    if (iconCode === '13d') dummyElement.src = icon13d;
    if (iconCode === '50n') dummyElement.src = icon50n;
    if (iconCode === '50d') dummyElement.src = icon50d;
    if (iconCode === '1232n') dummyElement.src = icon1232n;
  },
  // End of helper functions

  placeDate: {
    init: () => {
      loadPage.placeDate.sharedDomEl();
      loadPage.placeDate.getCity();
      loadPage.placeDate.getCountry();
      loadPage.placeDate.getDate();
    },
    sharedDomEl() {
      loadPage.placeDate.cityName = document.querySelector('#cityDate h2');
    },
    getCity() {
      loadPage.placeDate.cityName.innerText = loadPage.data.city;
    },
    getCountry() {
      loadPage.placeDate.cityName.innerText += `, ${countryName.of(loadPage.data.countryCode)}`;
    },
    getDate() {
      const cityHeading = document.querySelector('#cityDate h4');
      let date = new Date();

      date = loadPage.changeTimeZone(date, loadPage.data.forecast.timezone);
      const formattedDate = format(date, 'eeee, d MMMM yyyy | H:mm');
      cityHeading.innerText = formattedDate;
    },
  },

  weatherNow: {
    init: () => {
      loadPage.weatherNow.sharedDomEl();
      // get current temp
      loadPage.getTemp(loadPage.data.forecast.current.temp, loadPage.weatherNow.temp);
      // get feels like temp
      loadPage.getTemp(loadPage.data.forecast.current.feels_like, loadPage.weatherNow.feelsLike);
      loadPage.weatherNow.getSky();
      loadPage.getIcon(
        loadPage.data.forecast.current.weather[0].icon,
        loadPage.weatherNow.weatherIcon,
      );
    },
    sharedDomEl() {
      loadPage.weatherNow.temp = document.querySelector('#dayMain span');
      loadPage.weatherNow.weatherIcon = document.querySelector('#dayMain > p > img');
      loadPage.weatherNow.feelsLike = document.querySelector('#feelsLike span');
    },
    getSky() {
      const skyEl = document.querySelector('#daySky');
      const sky = loadPage.titleCase(loadPage.data.forecast.current.weather[0].description);
      skyEl.innerText = sky;
    },
  },

  dayDetails: {
    init: () => {
      loadPage.dayDetails.sharedDomEl();
      loadPage.getWind(loadPage.data.forecast.current.wind_speed, loadPage.dayDetails.wind);
      loadPage.dayDetails.getHumidity();
      loadPage.dayDetails.getUvIndex();
      loadPage.dayDetails.getVisibility();
      loadPage.dayDetails.getClouds();
      loadPage.dayDetails.getChanceOfRain();
      loadPage.dayDetails.getSunrise();
      loadPage.dayDetails.getSunset();
      loadPage.dayDetails.getPressure();
    },
    sharedDomEl() {
      loadPage.dayDetails.wind = document.querySelector('#wind .dayData');
    },
    getHumidity() {
      const humidity = document.querySelector('#humidity .dayData');
      humidity.innerText = `${loadPage.data.forecast.current.humidity}%`;
    },
    getUvIndex() {
      const uvIndex = document.querySelector('#uv .dayData');
      uvIndex.innerText = `${Math.round(loadPage.data.forecast.current.uvi)}`;
    },
    getVisibility() {
      const visibility = document.querySelector('#visibility .dayData');
      const visDistance = loadPage.getDistance(
        loadPage.data.forecast.current.visibility,
        loadPage.unitUsed,
      );

      visibility.innerText = visDistance;
    },
    getClouds() {
      const clouds = document.querySelector('#clouds .dayData');
      clouds.innerText = `${loadPage.data.forecast.current.clouds}%`;
    },
    getChanceOfRain() {
      const rainChance = document.querySelector('#rainChance .dayData');
      const rainPercentage = loadPage.data.forecast.daily[0].pop;

      rainChance.innerText = `${Math.round(rainPercentage * 100)}%`;
    },
    getSunrise() {
      const sunrise = document.querySelector('#sunrise .dayData');
      sunrise.innerText = loadPage.getTime(
        loadPage.data.forecast.current.sunrise,
        loadPage.data.forecast.timezone,
        'H:mm',
      );
    },
    getSunset() {
      const sunset = document.querySelector('#sunset .dayData');
      sunset.innerText = loadPage.getTime(
        loadPage.data.forecast.current.sunset,
        loadPage.data.forecast.timezone,
        'H:mm',
      );
    },
    getPressure() {
      const pressure = document.querySelector('#pressure .dayData');
      pressure.innerText = `${loadPage.data.forecast.current.pressure} hPa`;
    },
  },

  weekly: {
    init() {
      loadPage.weekly.getWeekForecast();
    },
    getWeekForecast() {
      const weekDay = document.querySelectorAll('.day');
      const icon = document.querySelectorAll('.dayIcon');
      const maxTemp = document.querySelectorAll('.dayMax');
      const minTemp = document.querySelectorAll('.dayMin');
      const wind = document.querySelectorAll('.dayWind');

      for (let i = 1; i < 8; i += 1) {
        // get weekday from date
        weekDay[i - 1].innerText = loadPage.getTime(
          loadPage.data.forecast.daily[i].dt,
          loadPage.data.forecast.timezone,
          'eeee',
        );
        loadPage.getIcon(loadPage.data.forecast.daily[i].weather[0].icon, icon[i - 1]);
        loadPage.getTemp(loadPage.data.forecast.daily[i].temp.max, maxTemp[i - 1]);
        loadPage.getTemp(loadPage.data.forecast.daily[i].temp.min, minTemp[i - 1]);
        loadPage.getWind(loadPage.data.forecast.daily[i].wind_speed, wind[i - 1]);
      }
    },
  },
};

export default { loadPage };
