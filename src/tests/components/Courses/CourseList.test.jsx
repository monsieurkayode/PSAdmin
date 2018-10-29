import React from 'react';
import { shallow } from 'enzyme';
import CourseList from '../../../components/Courses/CourseList';
import mockCourses from '../../__mocks__/mockCourses';

const setup = () => {
  const props = {
    courses: mockCourses,
    deleteCourse: jest.fn()
  };

  return shallow(<CourseList {...props} />);
};

describe('CourseList Component', () => {
  const wrapper = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a table with a table row having six table header cells', () => {
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('th').length).toBe(6);
  });

  it('has table headings Title, Author, Category and Length', () => {
    expect(wrapper.find('tr').childAt(1).text()).toEqual('Title');
    expect(wrapper.find('tr').childAt(2).text()).toEqual('Author');
    expect(wrapper.find('tr').childAt(3).text()).toEqual('Category');
    expect(wrapper.find('tr').childAt(4).text()).toEqual('Length');
  });

  it('renders 2 CourseListRow components', () => {
    expect(wrapper.find('CourseListRow').length).toEqual(2);
  });
});
