import paginator from '../../helpers/paginator';
import mockCourses from '../__mocks__/mockCourses';

describe('paginator', () => {
  it('return a pagination meta object', () => {
    const result = paginator(mockCourses);
    expect(result.page).toEqual(1);
    expect(result.pageSize).toBe(2);
    expect(result.pageCount).toBe(1);
    expect(result.offset).toBe(0);
  });
});
