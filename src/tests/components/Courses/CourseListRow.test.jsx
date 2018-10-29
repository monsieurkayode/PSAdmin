import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from '../../../components/Courses/CourseListRow';
import mockCourse from '../../__mocks__/mockCourse';

const setup = () => {
  const props = {
    ...mockCourse,
    deleteCourse: jest.fn()
  };

  const wrapper = shallow(<CourseListRow {...props} />);

  return {
    props,
    wrapper
  };
};

describe('CourseListRow Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a table row six table data cells', () => {
    expect(wrapper.find('tr').length).toBe(1);
    expect(wrapper.find('td').length).toBe(6);
  });

  it('renders an anchor tag element with Watch text content', () => {
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').text()).toBe('Watch');
  });

  it('renders a Link component', () => {
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('renders a Delete button', () => {
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toBe('Delete');
  });

  it('calls deleteCourse onClick of Delete button', () => {
    const deleteButton = wrapper.find('button');
    deleteButton.simulate('click');

    expect(props.deleteCourse).toHaveBeenCalled();
    expect(props.deleteCourse).toHaveBeenLastCalledWith(mockCourse.id);
  });
});
