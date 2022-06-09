import { getForecast } from './main-async';

export const loadPage = async (city, unit) => {
  const forecast = await getForecast(city, unit);
  console.log(forecast);
};

export default { loadPage };
