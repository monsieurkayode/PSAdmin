import * as types from '../actions/actionTypes';
import { initialAuthors } from './initialState';

export default (state = initialAuthors, action) => {
  switch (action.type) {
    case types.LOAD_AUTHORS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case types.LOAD_AUTHORS_SUCCESS:
      return { ...state, authors: action.authors };
    default:
      return state;
  }
};
