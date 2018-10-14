import {
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_LOADING
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COURSES_LOADING:
      return { ...state, isLoading: action.isLoading };
    case LOAD_COURSES_SUCCESS:
      return { ...state, courses: action.courses };
    default:
      return state;
  }
};
