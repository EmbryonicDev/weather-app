import { getData } from './main-async';

export const loadPage = {
  data: null,
  init: async (city, unit) => {
    loadPage.data = await getData(city, unit);
    console.log(loadPage.data);
  },
};

export default { loadPage };
