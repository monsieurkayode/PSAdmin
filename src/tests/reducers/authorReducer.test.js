import * as types from '../../actions/actionTypes';
import authorReducer from '../../reducers/authorReducer';
import { initialAuthors } from '../../reducers/initialState';
import mockAuthors from '../__mocks__/mockAuthors';

describe('Author Reducer', () => {
  it('returns initial state', () => {
    expect(authorReducer(undefined, {})).toEqual(initialAuthors);
  });

  describe('LOAD_AUTHORS_LOADING', () => {
    it('should update allAuthors isLoading state in store', () => {
      const action = {
        type: types.LOAD_AUTHORS_LOADING,
        isLoading: true
      };

      const newState = authorReducer(initialAuthors, action);
      expect(newState.isLoading).toBe(true);
    });
  });

  describe('LOAD_AUTHORS_SUCCESS', () => {
    it('should add authors', () => {
      const action = {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors: mockAuthors
      };

      const newState = authorReducer(initialAuthors, action);
      expect(newState.authors.length).toBe(2);
    });
  });

  describe('CREATE_AUTHOR_SUCCESS', () => {
    it('should add a new author', () => {
      const action = {
        type: types.CREATE_AUTHOR_SUCCESS,
        author: mockAuthors[0]
      };

      const newState = authorReducer(initialAuthors, action);
      expect(newState.authors.length).toBe(1);
    });
  });

  describe('UPDATE_AUTHOR_SUCCESS', () => {
    it('should update author', () => {
      const action = {
        type: types.UPDATE_AUTHOR_SUCCESS,
        authors: mockAuthors
      };

      const newState = authorReducer(initialAuthors, action);
      expect(newState.authors.length).toBe(2);
    });
  });

  describe('SAVING_AUTHOR', () => {
    it('should update allAuthorsing state in store', () => {
      const action = {
        type: types.SAVING_AUTHOR,
        saving: true
      };

      const newState = authorReducer(initialAuthors, action);
      expect(newState.isSaving).toBe(true);
    });
  });

  describe('SAVE_AUTHOR_FAILURE', () => {
    it('should set errors', () => {
      const action = {
        type: types.SAVE_AUTHOR_FAILURE,
        errors: { firstName: 'First Name is invalid' }
      };

      const newState = authorReducer(initialAuthors, action);
      expect(newState.errors.firstName).toBe('First Name is invalid');
    });
  });

  describe('DELETE_AUTHOR', () => {
    it('should filter out deleted course', () => {
      const action = {
        type: types.DELETE_AUTHOR,
        id: 'scott-allen'
      };

      const initialState = { ...initialAuthors, authors: mockAuthors };

      const newState = authorReducer(initialState, action);
      expect(newState.authors.length).toBe(1);
    });
  });

  describe('CHANGE_PAGE_AUTHORS', () => {
    it('should change current page', () => {
      const action = {
        type: types.CHANGE_PAGE_AUTHORS,
        page: 2
      };

      const newState = authorReducer(initialAuthors, action);
      expect(newState.currentPage).toBe(2);
    });
  });
});
