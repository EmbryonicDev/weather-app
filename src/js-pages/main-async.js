const apiKey = '8d8571b1c93bd4e2325c718b62e874dc';

// eslint-disable-next-line consistent-return
const getLocation = async (location = 'Amsterdam', unit = 'metric') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;
  try {
    const response = await fetch(url, { mode: 'cors' });
    const locationData = await response.json();
    return locationData;
  } catch (err) {
    console.error(err);
  }
};

export const getForecast = async (cityInput, unit = 'metric') => {
  const firstData = await getLocation(cityInput);

  const countryCode = firstData.sys.country;
  const city = firstData.name;
  const longitude = firstData.coord.lon;
  const latitude = firstData.coord.lat;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely&units=${unit}&appid=${apiKey}&lang=en`;

  const response = await fetch(url, { mode: 'cors' });
  const forecast = await response.json();
  return { city, countryCode, forecast };
};

export default { getForecast };
