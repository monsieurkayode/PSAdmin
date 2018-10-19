import * as types from '../actions/actionTypes';
import { initialCourses } from './initialState';

export default (state = initialCourses, action) => {
  switch (action.type) {
    case types.LOAD_COURSES_LOADING:
      return { ...state, isLoading: action.isLoading };
    case types.LOAD_COURSES_SUCCESS:
      return { ...state, courses: action.courses };
    case types.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.course]
      };
    case types.UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.courses
      };
    case types.SAVING_COURSE:
      return { ...state, isSaving: action.saving };
    case types.SAVE_COURSE_FAILURE:
      return { ...state, errors: action.errors };
    case types.DELETE_COURSE:
      return {
        ...state,
        courses: [...state.courses.filter(course => course.id !== action.id)]
      };
    case types.CHANGE_PAGE_COURSES:
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
};
