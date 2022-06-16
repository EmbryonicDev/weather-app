// Convert country code to full country name
export const countryName = new Intl.DisplayNames(['en'], { type: 'region' });

export const titleCase = (str) => {
  const returnValue = str.toLowerCase().split(' ');
  for (let i = 0; i < returnValue.length; i += 1) {
    returnValue[i] = returnValue[i].charAt(0).toUpperCase() + returnValue[i].slice(1);
  }
  return returnValue.join(' ');
};

export const setErrorMsg = (onOrOff) => {
  const errorMsg = document.getElementById('error');

  if (onOrOff === 'on') {
    errorMsg.style.cssText = 'color: yellow; font-weight: bold; align-self: flex-start; background: red; padding: 3px; border-radius: 6px';
    errorMsg.innerText = 'City not Found...';
  } else if (onOrOff === 'off') {
    errorMsg.style.cssText = 'background: transparent; height: 24.5px';
    errorMsg.innerText = '';
  }
};

export const startSpinner = () => {
  document.querySelector('body').style.visibility = 'hidden';
  document.getElementById('spinner').style.visibility = 'visible';
};

export const stopSpinner = () => {
  document.querySelector('body').style.visibility = 'visible';
  document.getElementById('spinner').style.visibility = 'hidden';
};
