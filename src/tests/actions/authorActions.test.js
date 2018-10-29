import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import {
  loadAuthors,
  saveAuthor,
  setSaveErrors,
  deleteAuthor,
  pageChange
} from '../../actions/authorActions';
import { authors } from '../../api/mockAuthorApi';
import { courses } from '../../api/mockCourseApi';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Author Actions', () => {
  describe('loadAuthors action', () => {
    it('creates LOAD_AUTHORS_LOADING and LOAD_AUTHORS_SUCCESS',
      (done) => {
        const expectedActions = [
          {
            type: types.LOAD_AUTHORS_LOADING,
            isLoading: true
          },
          {
            type: types.LOAD_AUTHORS_SUCCESS,
            authors
          },
          {
            type: types.LOAD_AUTHORS_LOADING,
            isLoading: false
          }
        ];

        const store = mockStore({});

        store.dispatch(loadAuthors())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('saveAuthor action', () => {
    it('creates SAVING_AUTHOR and UPDATE_AUTHOR_SUCCESS for updating an author',
      (done) => {
        const expectedActions = [
          {
            type: types.SAVING_AUTHOR,
            saving: true
          },
          {
            type: types.UPDATE_AUTHOR_SUCCESS,
            authors
          },
          {
            type: types.SAVING_AUTHOR,
            saving: false
          },
        ];

        const store = mockStore({
          allAuthors: {
            authors
          }
        });

        store.dispatch(saveAuthor(authors[0]))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('creates SAVING_AUTHOR and CREATE_AUTHOR_SUCCESS for saving new author',
      (done) => {
        const newAuthor = {
          firstName: 'Richard',
          lastName: 'Gary'
        };

        const expectedActions = [
          {
            type: types.SAVING_AUTHOR,
            saving: true
          },
          {
            type: types.CREATE_AUTHOR_SUCCESS,
            author: { ...newAuthor, id: 'richard-gary' }
          },
          {
            type: types.SAVING_AUTHOR,
            saving: false
          },
        ];

        const store = mockStore({});

        store.dispatch(saveAuthor(newAuthor))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('deleteAuthor Action', () => {
    it('does not create an action when deleting author with course', (done) => {
      const store = mockStore({
        allCourses: {
          courses
        }
      });

      store.dispatch(deleteAuthor('cory-house'));
      expect(store.getActions()).toEqual([]);
      done();
    });

    it('creates DELETE_AUTHOR when deleting an author with no existing course',
      (done) => {
        const expectedActions = [
          {
            type: types.DELETE_AUTHOR,
            id: 'stephen-grider'
          }
        ];

        const store = mockStore({
          allCourses: {
            courses
          }
        });

        store.dispatch(deleteAuthor('stephen-grider'));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  describe('setSaveErrors action', () => {
    it('creates SAVE_AUTHOR_FAILURE if any errors when saving an author',
      (done) => {
        const expectedActions = [
          {
            type: types.SAVE_AUTHOR_FAILURE,
            errors: {}
          }
        ];

        const store = mockStore({});

        store.dispatch(setSaveErrors({}));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  describe('pageChange action', () => {
    it('creates CHANGE_PAGE_AUTHORS when navigating between authors pages',
      (done) => {
        const expectedActions = [
          {
            type: types.CHANGE_PAGE_AUTHORS,
            page: 1
          }
        ];

        const store = mockStore({});

        store.dispatch(pageChange(1));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
