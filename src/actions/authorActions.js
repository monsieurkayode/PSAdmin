import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';

/**
 * @function loadAuthorsLoading
 *
 * @param {boolean} isLoading
 *
 * @returns {object}
 */
const loadAuthorsLoading = isLoading => ({
  type: types.LOAD_AUTHORS_LOADING,
  isLoading
});

/**
 * @function loadAuthorsFailure
 *
 * @param {object} error
 *
 * @returns {object}
 */
const loadAuthorsFailure = error => ({
  type: types.LOAD_AUTHORS_FAILURE,
  error
});

/**
 * @function loadAuthorsSuccess
 *
 * @param {array} authors
 *
 * @returns {object}
 */
export const loadAuthorsSuccess = authors => ({
  type: types.LOAD_AUTHORS_SUCCESS,
  authors
});

/**
 * @function loadAuthors
 *
 * @returns {Promise}
 */
export const loadAuthors = () => (dispatch) => {
  dispatch(loadAuthorsLoading(true));
  return authorApi.getAllAuthors()
    .then((authors) => {
      dispatch(loadAuthorsSuccess(authors));
      dispatch(loadAuthorsLoading(false));
    })
    .catch((error) => {
      dispatch(loadAuthorsFailure(error));
      dispatch(loadAuthorsLoading(false));
    });
};
