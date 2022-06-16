import { storedCity } from './dom';

// eslint-disable-next-line consistent-return
export const getData = async (location = 'Amsterdam', unit = 'metric') => {
  const errorMsg = document.getElementById('error');
  const apiKey = '8d8571b1c93bd4e2325c718b62e874dc';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

  try {
    const response = await fetch(url, { mode: 'cors' });
    const locationData = await response.json();

    const countryCode = locationData.sys.country;
    const city = locationData.name;
    const longitude = locationData.coord.lon;
    const latitude = locationData.coord.lat;
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely&units=${unit}&appid=${apiKey}`;

    const response2 = await fetch(url2, { mode: 'cors' });
    const forecast = await response2.json();

    errorMsg.style.cssText = 'color: transparent; font-weight: bold; align-self: flex-start; background: transparent; padding: 3px; border-radius: 6px';
    return {
      city, countryCode, unit, forecast,
    };
  } catch (err) {
    errorMsg.style.cssText = 'color: yellow; font-weight: bold; align-self: flex-start; background: red; padding: 3px; border-radius: 6px';
    while (storedCity.length > 0) storedCity.pop();
    localStorage.setItem('storedCity', JSON.stringify(storedCity));
    console.error('City Not Found');
  }
};

export default { getData };
