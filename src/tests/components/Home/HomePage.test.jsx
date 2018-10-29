import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../../components/Home/HomePage';

describe('HomePage Component', () => {
  const wrapper = shallow(<HomePage />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
