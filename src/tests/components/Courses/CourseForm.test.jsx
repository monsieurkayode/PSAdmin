import React from 'react';
import { shallow } from 'enzyme';
import CourseForm from '../../../components/Courses/CourseForm';
import mockCourse from '../../__mocks__/mockCourse';
import mockAuthors from '../../__mocks__/mockAuthors';

const setup = (saving) => {
  const props = {
    ...mockCourse,
    authors: mockAuthors,
    loading: false,
    saving,
    onSubmit: jest.fn(),
    onFocus: jest.fn(),
    onChange: jest.fn()
  };

  const wrapper = shallow(<CourseForm {...props} />);

  return {
    props,
    wrapper
  };
};

describe('CourseForm Component', () => {
  const { wrapper, props } = setup(false);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a form element', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders three TextInput and a SelectInput component', () => {
    expect(wrapper.find('TextInput').length).toBe(3);
    expect(wrapper.find('SelectInput').length).toBe(1);
  });

  it('renders a form submit button', () => {
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
  });

  it('form submit button displays Save text when not saving', () => {
    expect(wrapper.find('input[type="submit"]').props().value).toBe('Save');
  });

  it('form submit button displays Saving... text when saving', () => {
    const newWrapper = setup(true).wrapper;
    const saveButton = newWrapper.find('input[type="submit"]');
    expect(saveButton.props().value).toBe('Saving...');
  });

  it('calls onSumit when form is submitted', () => {
    wrapper.find('form').simulate('submit');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
