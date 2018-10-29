import React from 'react';
import { shallow } from 'enzyme';
import AuthorList from '../../../components/Authors/AuthorList';
import mockAuthors from '../../__mocks__/mockAuthors';

const setup = () => {
  const props = {
    authors: mockAuthors,
    deleteAuthor: jest.fn()
  };

  return shallow(<AuthorList {...props} />);
};

describe('AuthorList Component', () => {
  const wrapper = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a table with a table row having four table header cells', () => {
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('th').length).toBe(4);
  });

  it('has table headings ID, Author Name', () => {
    expect(wrapper.find('tr').childAt(1).text()).toEqual('ID');
    expect(wrapper.find('tr').childAt(2).text()).toEqual('Author Name');
  });

  it('renders 2 AuthorListRow components', () => {
    expect(wrapper.find('AuthorListRow').length).toEqual(2);
  });
});
