import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/common/Header/Index';

const setup = () => {
  const props = {
    location: {
      pathname: '/'
    },
    courses: [],
    authors: []
  };

  return shallow(<Header {...props} />);
};

describe('Header Component', () => {
  const wrapper = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has one ul element with four list items', () => {
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.find('ul').children().length).toBe(4);
  });

  it('adds class of active to nav-item that matches page route', () => {
    expect(wrapper.find('.active').length).toEqual(1);
  });
});
