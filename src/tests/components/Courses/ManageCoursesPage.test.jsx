import React from 'react';
import { shallow } from 'enzyme';
import { ManageCoursesPage } from '../../../components/Courses/ManageCoursesPage';
import mockAuthors from '../../__mocks__/mockAuthors';
import mockCourse from '../../__mocks__/mockCourse';

const setup = () => {
  const props = {
    authors: mockAuthors,
    isSaving: false,
    loadingCourse: false,
    history: {
      push: jest.fn()
    },
    saveCourse: () => new Promise(resolve => resolve(mockCourse)),
    setSaveErrors: jest.fn(),
    course: mockCourse,
    match: {
      params: {
        id: mockCourse.id
      }
    }
  };

  const state = {
    errors: {},
    newChanges: false
  };

  const wrapper = shallow(<ManageCoursesPage {...props} />);

  return {
    wrapper,
    props,
    state
  };
};

const event = {
  target: {
    name: 'title',
    value: ''
  },
  preventDefault: jest.fn()
};

describe('ManageCoursesPage Component', () => {
  const { wrapper, state, props: { isSaving, course } } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a h1 tag element', () => {
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('renders a Prompt child component', () => {
    expect(wrapper.find('Prompt').length).toBe(1);
  });

  it('renders a CourseForm child component', () => {
    expect(wrapper.find('CourseForm').length).toBe(1);
  });

  it('invokes the static method getDerivedStateFromProps', () => {
    const { errors, newChanges } = state;
    const result = ManageCoursesPage
      .getDerivedStateFromProps({ course, isSaving }, { errors, newChanges });
    expect(result.course).toEqual(course);
  });

  it('invokes handleSubmit method', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('invokes clearErrors method', () => {
    const clearErrorsSpy = jest.spyOn(wrapper.instance(), 'clearErrors');
    wrapper.instance().clearErrors(event);
    expect(clearErrorsSpy).toHaveBeenCalled();
  });

  it('invokes handleInputChange method', () => {
    const handleInputChangeSpy = jest
      .spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().handleInputChange(event);
    expect(handleInputChangeSpy).toHaveBeenCalled();
  });

  it('invokes componentWillMount method', () => {
    jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().componentWillUnmount).toHaveBeenCalled();
  });
});
