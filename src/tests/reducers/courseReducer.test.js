import * as types from '../../actions/actionTypes';
import courseReducer from '../../reducers/courseReducer';
import { initialCourses } from '../../reducers/initialState';
import mockCourses from '../__mocks__/mockCourses';

describe('Course Reducer', () => {
  it('returns initial state', () => {
    expect(courseReducer(undefined, {})).toEqual(initialCourses);
  });

  describe('LOAD_COURSES_LOADING', () => {
    it('should update allCourses isLoading state in store', () => {
      const action = {
        type: types.LOAD_COURSES_LOADING,
        isLoading: true
      };

      const newState = courseReducer(initialCourses, action);
      expect(newState.isLoading).toBe(true);
    });
  });

  describe('LOAD_COURSES_SUCCESS', () => {
    it('should add courses', () => {
      const action = {
        type: types.LOAD_COURSES_SUCCESS,
        courses: mockCourses
      };

      const newState = courseReducer(initialCourses, action);
      expect(newState.courses.length).toBe(2);
    });
  });

  describe('CREATE_COURSE_SUCCESS', () => {
    it('should add a new course', () => {
      const action = {
        type: types.CREATE_COURSE_SUCCESS,
        course: mockCourses[0]
      };

      const newState = courseReducer(initialCourses, action);
      expect(newState.courses.length).toBe(1);
    });
  });

  describe('UPDATE_COURSE_SUCCESS', () => {
    it('should update courses', () => {
      const action = {
        type: types.UPDATE_COURSE_SUCCESS,
        courses: mockCourses
      };

      const newState = courseReducer(initialCourses, action);
      expect(newState.courses.length).toBe(2);
    });
  });

  describe('SAVING_COURSE', () => {
    it('should update allCourses isSaving state in store', () => {
      const action = {
        type: types.SAVING_COURSE,
        saving: true
      };

      const newState = courseReducer(initialCourses, action);
      expect(newState.isSaving).toBe(true);
    });
  });

  describe('SAVE_COURSE_FAILURE', () => {
    it('should set errors', () => {
      const action = {
        type: types.SAVE_COURSE_FAILURE,
        errors: { title: 'Title is invalid' }
      };

      const newState = courseReducer(initialCourses, action);
      expect(newState.errors.title).toBe('Title is invalid');
    });
  });

  describe('DELETE_COURSE', () => {
    it('should filter out deleted course', () => {
      const action = {
        type: types.DELETE_COURSE,
        id: 'clean-code'
      };

      const initialState = { ...initialCourses, courses: mockCourses };

      const newState = courseReducer(initialState, action);
      expect(newState.courses.length).toBe(1);
    });
  });

  describe('CHANGE_PAGE_COURSES', () => {
    it('should change current page', () => {
      const action = {
        type: types.CHANGE_PAGE_COURSES,
        page: 2
      };

      const newState = courseReducer(initialCourses, action);
      expect(newState.currentPage).toBe(2);
    });
  });
});
