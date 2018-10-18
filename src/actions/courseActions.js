import toastr from 'toastr';
import courseApi from '../api/mockCourseApi';
import * as types from './actionTypes';

/**
 * @function loadCoursesLoading
 *
 * @param {boolean} isLoading
 *
 * @returns {object}
 */
const loadCoursesLoading = isLoading => ({
  type: types.LOAD_COURSES_LOADING,
  isLoading
});

/**
 * @function loadCoursesFailure
 *
 * @param {object} error
 *
 * @returns {object}
 */
const loadCoursesFailure = error => ({
  type: types.LOAD_COURSES_FAILURE,
  error
});

/**
 * @function loadCoursesSuccess
 *
 * @param {array} courses
 *
 * @returns {object}
 */
const loadCoursesSuccess = courses => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses
});

/**
 * @function loadCourses
 *
 * @returns {Promise}
 */
export const loadCourses = () => (dispatch) => {
  dispatch(loadCoursesLoading(true));
  return courseApi
    .getAllCourses()
    .then((courses) => {
      dispatch(loadCoursesSuccess(courses));
      dispatch(loadCoursesLoading(false));
    })
    .catch((error) => {
      dispatch(loadCoursesFailure(error));
      dispatch(loadCoursesLoading(false));
    });
};

/**
 * @function savingCourse
 *
 * @param {boolean} saving
 *
 * @returns {object}
 */
const savingCourse = saving => ({
  type: types.SAVING_COURSE,
  saving
});

/**
 * @function createCourseSuccess
 *
 * @param {object} course
 *
 * @returns {object}
 */
const createCourseSuccess = course => ({
  type: types.CREATE_COURSE_SUCCESS,
  course
});

/**
 * @function updateCourseSuccess
 *
 * @param {array} courses
 *
 * @returns {object}
 */
const updateCourseSuccess = courses => ({
  type: types.UPDATE_COURSE_SUCCESS,
  courses
});

/**
 * @function saveCourseFailure
 *
 * @param {object} courses
 *
 * @returns {object}
 */
const saveCourseFailure = errors => ({
  type: types.SAVE_COURSE_FAILURE,
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
  saveCourseFailure(error)
);

/**
 * @function saveCourse
 *
 * @param {object} course
 *
 * @returns {Promise}
 */
export const saveCourse = course => (dispatch, getState) => {
  toastr.clear();
  dispatch(savingCourse(true));
  return courseApi.saveCourse(course)
    .then((savedCourse) => {
      if (course.id) {
        const { allCourses: { courses } } = getState();
        const existingCourseIndex = courses
          .findIndex(a => a.id === course.id);
        courses.splice(existingCourseIndex, 1, course);

        toastr.success('Course updated');
        dispatch(updateCourseSuccess(courses));
      } else {
        toastr.success('Course saved');
        dispatch(createCourseSuccess(savedCourse));
      }

      dispatch(savingCourse(false));
    })
    .catch((errors) => {
      dispatch(saveCourseFailure(errors));
      toastr.error('Invalid form data');
      dispatch(savingCourse(false));
      throw (errors);
    });
};

/**
 * @function deleteCourse
 *
 * @param {number} id
 *
 * @returns {Function}
 */
export const deleteCourse = id => (dispatch) => {
  dispatch({ type: types.DELETE_COURSE, id });
  toastr.clear();
  toastr.success('Course Deleted');
};

/**
 * @function pageChange
 *
 * @param {number} page
 *
 * @returns {Function}
 */
export const pageChange = page => dispatch => dispatch({
  type: types.CHANGE_PAGE,
  page
});
