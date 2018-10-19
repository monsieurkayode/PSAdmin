import toastr from 'toastr';
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

/**
 * @function savingAuthor
 *
 * @param {boolean} saving
 *
 * @returns {object}
 */
const savingAuthor = saving => ({
  type: types.SAVING_AUTHOR,
  saving
});

/**
 * @function createAuthorSuccess
 *
 * @param {object} author
 *
 * @returns {object}
 */
const createAuthorSuccess = author => ({
  type: types.CREATE_AUTHOR_SUCCESS,
  author
});

/**
 * @function updateAuthorSuccess
 *
 * @param {object} authors
 *
 * @returns {object}
 */
const updateAuthorSuccess = authors => ({
  type: types.UPDATE_AUTHOR_SUCCESS,
  authors
});

/**
 * @function saveAuthorFailure
 *
 * @param {object} errors
 *
 * @returns {object}
 */
const saveAuthorFailure = errors => ({
  type: types.SAVE_AUTHOR_FAILURE,
  errors
});

/**
 * @function setSaveErrors
 *
 * @param {object} error
 *
 * @returns {Function}
 */
export const setSaveErrors = error => dispatch => dispatch(
  saveAuthorFailure(error)
);

/**
 * @function saveAuthor
 *
 * @param {object} author
 *
 * @returns {Promise}
 */
export const saveAuthor = author => (dispatch, getState) => {
  dispatch(savingAuthor(true));
  return authorApi.saveAuthor(author)
    .then((savedAuthor) => {
      if (author.id) {
        const { allAuthors: { authors } } = getState();
        const existingAuthorIndex = authors
          .findIndex(a => a.id === author.id);
        authors.splice(existingAuthorIndex, 1, author);

        toastr.success('Author updated');
        dispatch(updateAuthorSuccess(authors));
      } else {
        toastr.success('Author saved');
        dispatch(createAuthorSuccess(savedAuthor));
      }

      dispatch(savingAuthor(false));
    })
    .catch((errors) => {
      dispatch(saveAuthorFailure(errors));
      toastr.error('Invalid form data');
      dispatch(savingAuthor(false));
      throw (errors);
    });
};

/**
 * @function deleteAuthor
 *
 * @param {number} id
 *
 * @returns {Function}
 */
export const deleteAuthor = id => (dispatch, getState) => {
  const { allCourses: { courses } } = getState();
  if (courses.findIndex(course => course.authorId === id) >= 0) {
    toastr.clear();
    toastr.error('Can\'t delete author with existing course(s)', 'Forbidden');
    return;
  }
  dispatch({ type: types.DELETE_AUTHOR, id });
  toastr.clear();
  toastr.success('Author Deleted');
};

/**
 * @function pageChange
 *
 * @param {number} page
 *
 * @returns {Function}
 */
export const pageChange = page => dispatch => dispatch({
  type: types.CHANGE_PAGE_AUTHORS,
  page
});
