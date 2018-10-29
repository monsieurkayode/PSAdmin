import React from 'react';
import { mount } from 'enzyme';
import NotFoundPage from '../../../components/NotFound/NotFoundPage';

describe('NotFoundPage Component', () => {
  const wrapper = mount(<NotFoundPage />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a default content props of "Page"', () => {
    expect(wrapper.props()).toHaveProperty('content', 'Page');
  });

  it('has a single wrapping div as it roots', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
