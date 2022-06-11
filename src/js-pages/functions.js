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

export const getDistance = (distanceInMeters, unit) => {
  let returnValue;
  if (unit === 'metric') returnValue = `${Math.round(distanceInMeters / 1000)} km`;
  if (unit === 'imperial') returnValue = `${Math.round(distanceInMeters / 1609)} mi`;
  return returnValue;
};

export default { changeTimeZone };
