import getData from '../../helpers/getData';
import mockCourses from '../__mocks__/mockCourses';

describe('getData', () => {
  it('returns object in array with id matching second argument', () => {
    expect(getData(mockCourses, mockCourses[0].id)).toEqual(mockCourses[0]);
  });
});
