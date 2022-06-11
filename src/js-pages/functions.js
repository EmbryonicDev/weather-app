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

export default { changeTimeZone };
