import courseApi from '../api/mockCourseApi';
import {
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILURE,
  LOAD_COURSES_LOADING
} from './actionTypes';

export const loadCoursesLoading = isLoading => ({
  type: LOAD_COURSES_LOADING,
  isLoading
});

export const loadCoursesFailure = error => ({
  type: LOAD_COURSES_FAILURE,
  error
});

export const loadCoursesSuccess = courses => ({
  type: LOAD_COURSES_SUCCESS,
  courses
});


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
