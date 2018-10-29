/**
 * @function getData
 *
 * @param {array} state
 * @param {string} id
 *
 * @returns {any}
 */
const getData = (state, id) => state.find(data => data.id === id);

export default getData;
