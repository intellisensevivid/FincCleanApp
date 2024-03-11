// given string "pickupAndDelivery" return "Pickup And Delivery"
export const translateString = (string) => {
  return string
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
};

// Convert the number to a fixed-point notation with two decimal places
export const roundToTwoDecimalPlaces = (number) => {
  if (!number) {
    number = 0;
  }
  const roundedNumber = number.toFixed(2);
  return roundedNumber;
};

//Delays execution of code in the callback according to the set delay
export const debounce = (callback, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
