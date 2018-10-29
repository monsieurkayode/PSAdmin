import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../../../components/common/Pagination/Index';

const setup = () => {
  const props = {
    pageCount: 1,
    page: 2,
    handlePageChange: jest.fn()
  };

  return mount(<Pagination {...props} />);
};

describe('Pagination Component', () => {
  const wrapper = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
