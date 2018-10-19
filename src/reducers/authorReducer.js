import * as types from '../actions/actionTypes';
import { initialAuthors } from './initialState';

export default (state = initialAuthors, action) => {
  switch (action.type) {
    case types.LOAD_AUTHORS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case types.LOAD_AUTHORS_SUCCESS:
      return { ...state, authors: action.authors };
    case types.SAVING_AUTHOR:
      return { ...state, isSaving: action.saving };
    case types.SAVE_AUTHOR_FAILURE:
      return { ...state, errors: action.errors };
    case types.UPDATE_AUTHOR_SUCCESS:
      return { ...state, authors: action.authors };
    case types.CREATE_AUTHOR_SUCCESS:
      return { ...state, authors: [...state.authors, action.author] };
    case types.DELETE_AUTHOR:
      return {
        ...state,
        authors: [...state.authors.filter(author => author.id !== action.id)]
      };
    case types.CHANGE_PAGE_AUTHORS:
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
};
