import React from 'react';
import { shallow } from 'enzyme';
import { CoursesPage } from '../../../components/Courses/CoursesPage';
import mockCourses from '../../__mocks__/mockCourses';

const setup = (isLoading, courses = []) => {
  const props = {
    isLoading,
    courses,
    deleteCourseAction: jest.fn(),
    pageChange: jest.fn(),
    currentPage: 2,
    meta: {
      pageSize: 0,
      pageCount: 2,
      page: 2
    }
  };

  const wrapper = shallow(<CoursesPage {...props} />);

  return {
    wrapper,
    props
  };
};

describe('CoursesPage Component', () => {
  it('renders correctly', () => {
    const { wrapper } = setup(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a main and a h1 tag element with Courses text', () => {
    const { wrapper } = setup(false);
    expect(wrapper.find('main').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Courses');
  });

  it('renders Loader component when loading page', () => {
    const { wrapper } = setup(true);
    expect(wrapper.find('Loader').length).toBe(1);
  });

  describe('When the course list is empty', () => {
    const { wrapper } = setup(false);

    it('renders a no-content div', () => {
      const noContentDiv = wrapper.find('.no-content');
      expect(noContentDiv.length).toBe(1);
      expect(noContentDiv.text()).toEqual('The course catalog is empty.');
    });

    it('does not render a Pagination Component', () => {
      expect(wrapper.find('Pagination').length).toBeLessThan(1);
    });
  });

  describe('When the course list is not empty', () => {
    const { wrapper } = setup(false, mockCourses);
    it('renders a CourseList Component', () => {
      expect(wrapper.find('CourseList').length).toBe(1);
    });

    it('renders a Pagination Component', () => {
      expect(wrapper.find('Pagination').length).toBe(1);
    });
  });

  it('invokes componentWillUpdate when props and state changes', () => {
    const { wrapper, props: { meta, currentPage } } = setup(false, mockCourses);
    const componentWillUpdateSpy = jest.spyOn(
      wrapper.instance(), 'componentWillUpdate'
    );
    wrapper.instance().componentWillUpdate({ meta, currentPage });
    expect(componentWillUpdateSpy).toHaveBeenCalled();
  });

  it('invokes render method at least once', () => {
    const { wrapper } = setup(false, mockCourses);
    const renderSpy = jest.spyOn(wrapper.instance(), 'render');
    wrapper.instance().render();
    expect(renderSpy).toHaveBeenCalled();
  });

  it('invokes handlePageClick method', () => {
    const { wrapper } = setup(false, mockCourses);
    const handlePageClickSpy = jest.spyOn(
      wrapper.instance(), 'handlePageClick'
    );
    wrapper.instance().handlePageClick({ selected: 2 });
    expect(handlePageClickSpy).toHaveBeenCalled();
    expect(handlePageClickSpy).toHaveBeenCalledWith({ selected: 2 });
  });

  it('invoke componentWillUnmount when component is unmounting', () => {
    const { wrapper } = setup(false, mockCourses);
    const componentWillUnmountSpy = jest.spyOn(
      wrapper.instance(), 'componentWillUnmount'
    );
    wrapper.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalled();
  });
});
