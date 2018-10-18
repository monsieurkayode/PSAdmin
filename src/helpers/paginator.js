/**
 *
 * @function validatePagination
 *
 * @param {any} value
 * @param {any} replacer
 *
 * @returns {number}
 */
const validatePagination = (value, replacer) => (!isNaN(Number(value)) // eslint-disable-line
  && value >= 1 ? parseInt(value, 10)
  : replacer
);

/**
 *
 * @function paginator
 *
 * @param {array} data
 * @param {number} page
 * @param {number} limit
 *
 * @returns {object}
 */
const paginator = (data, page, limit) => {
  const pageNumber = validatePagination(page, 1);
  const queryLimit = validatePagination(limit, 4);
  const offset = (pageNumber - 1) * queryLimit;
  const temp = Object.assign([], data);
  const results = temp.splice(offset, queryLimit);

  return {
    pageCount: Math.ceil(data.length / queryLimit),
    offset,
    pageSize: results.length,
    page: pageNumber,
    results
  };
};

export default paginator;
