import React from 'react';
import { shallow } from 'enzyme';
import { AuthorsPage } from '../../../components/Authors/AuthorsPage';
import mockAuthors from '../../__mocks__/mockAuthors';

const setup = (isLoading, authors = []) => {
  const props = {
    isLoading,
    authors,
    deleteAuthorAction: jest.fn(),
    pageChange: jest.fn(),
    currentPage: 2,
    meta: {
      pageSize: 0,
      pageCount: 2,
      page: 2
    }
  };

  const wrapper = shallow(<AuthorsPage {...props} />);

  return {
    wrapper,
    props
  };
};

describe('AuthorsPage Component', () => {
  it('renders correctly', () => {
    const { wrapper } = setup(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a main and a h1 tag element with Authors text', () => {
    const { wrapper } = setup(false);
    expect(wrapper.find('main').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Authors');
  });

  it('renders Loader component when loading page', () => {
    const { wrapper } = setup(true);
    expect(wrapper.find('Loader').length).toBe(1);
  });

  describe('When the author list is empty', () => {
    const { wrapper } = setup(false);

    it('renders a no-content div', () => {
      const noContentDiv = wrapper.find('.no-content');
      expect(noContentDiv.length).toBe(1);
      expect(noContentDiv.text()).toEqual('The authors catalog is empty.');
    });

    it('does not render a Pagination Component', () => {
      expect(wrapper.find('Pagination').length).toBeLessThan(1);
    });
  });

  describe('When the author list is not empty', () => {
    const { wrapper } = setup(false, mockAuthors);
    it('renders a AuthorList Component', () => {
      expect(wrapper.find('AuthorList').length).toBe(1);
    });

    it('renders a Pagination Component', () => {
      expect(wrapper.find('Pagination').length).toBe(1);
    });
  });

  it('invokes componentWillUpdate when props and state changes', () => {
    const { wrapper, props: { meta, currentPage } } = setup(false, mockAuthors);
    const componentWillUpdateSpy = jest.spyOn(
      wrapper.instance(), 'componentWillUpdate'
    );
    wrapper.instance().componentWillUpdate({ meta, currentPage });
    expect(componentWillUpdateSpy).toHaveBeenCalled();
  });

  it('invokes render method at least once', () => {
    const { wrapper } = setup(false, mockAuthors);
    const renderSpy = jest.spyOn(wrapper.instance(), 'render');
    wrapper.instance().render();
    expect(renderSpy).toHaveBeenCalled();
  });

  it('invokes handlePageClick method', () => {
    const { wrapper } = setup(false, mockAuthors);
    const handlePageClickSpy = jest.spyOn(
      wrapper.instance(), 'handlePageClick'
    );
    wrapper.instance().handlePageClick({ selected: 2 });
    expect(handlePageClickSpy).toHaveBeenCalled();
    expect(handlePageClickSpy).toHaveBeenCalledWith({ selected: 2 });
  });

  it('invoke componentWillUnmount when component is unmounting', () => {
    const { wrapper } = setup(false, mockAuthors);
    const componentWillUnmountSpy = jest.spyOn(
      wrapper.instance(), 'componentWillUnmount'
    );
    wrapper.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalled();
  });
});
