import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import {
  loadCourses,
  saveCourse,
  setSaveErrors,
  deleteCourse,
  pageChange
} from '../../actions/courseActions';
import { courses } from '../../api/mockCourseApi';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Course Actions', () => {
  describe('loadCourses action', () => {
    it('creates LOAD_COURSES_LOADING and LOAD_COURSES_SUCCESS when loading courses',
      (done) => {
        const expectedActions = [
          {
            type: types.LOAD_COURSES_LOADING,
            isLoading: true
          },
          {
            type: types.LOAD_COURSES_SUCCESS,
            courses
          },
          {
            type: types.LOAD_COURSES_LOADING,
            isLoading: false
          }
        ];

        const store = mockStore({});

        store.dispatch(loadCourses())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('saveCourse action', () => {
    it('creates SAVING_COURSE and UPDATE_COURSE_SUCCESS when updating course',
      (done) => {
        const expectedActions = [
          {
            type: types.SAVING_COURSE,
            saving: true
          },
          {
            type: types.UPDATE_COURSE_SUCCESS,
            courses
          },
          {
            type: types.SAVING_COURSE,
            saving: false
          },
        ];

        const store = mockStore({
          allCourses: {
            courses
          }
        });

        store.dispatch(saveCourse(courses[0]))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('creates SAVING_COURSE and CREATE_COURSE_SUCCESS when saving new course',
      (done) => {
        const newCourse = {
          title: 'React Fundamentals',
          category: 'Gary',
          length: '5:56',
          authorId: 'cory-house'
        };

        const expectedActions = [
          {
            type: types.SAVING_COURSE,
            saving: true
          },
          {
            type: types.CREATE_COURSE_SUCCESS,
            course: {
              ...newCourse,
              id: 'react-fundamentals',
              watchHref: 'http://www.pluralsight.com/courses/react-fundamentals'
            }
          },
          {
            type: types.SAVING_COURSE,
            saving: false
          },
        ];

        const store = mockStore({});

        store.dispatch(saveCourse(newCourse))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });

  describe('deleteCourse Action', () => {
    it('creates DELETE_COURSE when deleting a course', (done) => {
      const expectedActions = [
        {
          type: types.DELETE_COURSE,
          id: 'react-flux-building-applications'
        }
      ];

      const store = mockStore({
        allCourses: {
          courses
        }
      });

      store.dispatch(deleteCourse('react-flux-building-applications'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('setSaveErrors action', () => {
    it('creates SAVE_COURSE_FAILURE if any errors when saving a course',
      (done) => {
        const expectedActions = [
          {
            type: types.SAVE_COURSE_FAILURE,
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
    it('creates CHANGE_PAGE_COURSES when navigating between courses pages',
      (done) => {
        const expectedActions = [
          {
            type: types.CHANGE_PAGE_COURSES,
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
