
/**
 * @function caps
 *
 * @param {string} str
 *
 * @returns {string}
 */
export const caps = (str) => {
  const temp = str.toLowerCase();
  return `${temp[0].toUpperCase()}${temp.substr(1)}`;
};

/**
 * @function validateLength
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export const validateLength = (value) => {
  const format = /^([0-9]{1,3}:[0-5][0-9]{1})$/;
  return format.test(value);
};

/**
 * @function validateInput
 *
 * @param {object} formData
 *
 * @returns {object}
 */
export const validateInput = (formData, course = true) => {
  const minLength = 3;
  const skip = ['id', 'watchHref', 'authorId'];
  const errors = {};

  Object.entries(formData).forEach(([name, value]) => {
    if (skip.includes(name)) {
      name === 'authorId' && value.toString().length === 0
        ? errors[name] = 'Select an author' : false;
      return;
    }

    value.toString().trim().length < minLength
      ? errors[name] = `${caps(name)} must be at least ${minLength} characters.`
      : false;
  });

  if (!errors.length && course) {
    !validateLength(formData.length)
      ? errors.length = 'Invalid format for length e.g 5:59' : null;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
