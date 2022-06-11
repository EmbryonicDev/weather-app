export function changeTimeZone(date, timeZone) {
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
}

// Convert country code to full country name
export const countryName = new Intl.DisplayNames(['en'], { type: 'region' });

// Meters to km / mi
export const getDistance = (distanceInMeters, unit) => {
  let returnValue;
  if (unit === 'metric') returnValue = `${Math.round(distanceInMeters / 1000)} km`;
  if (unit === 'imperial') returnValue = `${Math.round(distanceInMeters / 1609)} mi`;
  return returnValue;
};

export const celOrFah = (temp, unit) => {
  let returnValue;
  if (unit === 'metric') returnValue = `${Math.round(temp)} °C`;
  if (unit === 'imperial') returnValue = `${Math.round(temp)} °F`;
  return returnValue;
};

export const titleCase = (str) => {
  const returnValue = str.toLowerCase().split(' ');
  for (let i = 0; i < returnValue.length; i += 1) {
    returnValue[i] = returnValue[i].charAt(0).toUpperCase() + returnValue[i].slice(1);
  }
  return returnValue.join(' ');
};

export default { changeTimeZone };
