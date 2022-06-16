import { storedCity } from './dom';

const setErrorMsg = (onOrOff) => {
  const errorMsg = document.getElementById('error');

  if (onOrOff === 'on') {
    errorMsg.style.cssText = 'color: yellow; font-weight: bold; align-self: flex-start; background: red; padding: 3px; border-radius: 6px';
    errorMsg.innerText = 'City not Found...';
  } else if (onOrOff === 'off') {
    errorMsg.style.cssText = 'background: transparent; height: 24.5px';
    errorMsg.innerText = '';
  }
};

const startSpinner = () => {
  document.querySelector('body').style.visibility = 'hidden';
  document.getElementById('spinner').style.visibility = 'visible';
};

const stopSpinner = () => {
  document.querySelector('body').style.visibility = 'visible';
  document.getElementById('spinner').style.visibility = 'hidden';
};

// eslint-disable-next-line consistent-return
export const getData = async (location = 'Amsterdam', unit = 'metric') => {
  const apiKey = '8d8571b1c93bd4e2325c718b62e874dc';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

  try {
    startSpinner();
    const response = await fetch(url, { mode: 'cors' });
    const locationData = await response.json();

    const countryCode = locationData.sys.country;
    const city = locationData.name;
    const longitude = locationData.coord.lon;
    const latitude = locationData.coord.lat;
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely&units=${unit}&appid=${apiKey}`;

    const response2 = await fetch(url2, { mode: 'cors' });
    const forecast = await response2.json();

    setErrorMsg('off');
    return {
      city, countryCode, unit, forecast,
    };
  } catch (err) {
    setErrorMsg('on');
    // Reset local storage after wrong city entered
    while (storedCity.length > 0) storedCity.pop();
    localStorage.setItem('storedCity', JSON.stringify(storedCity));
    console.error('City Not Found');
  } finally {
    stopSpinner();
  }
};

export default { getData };
