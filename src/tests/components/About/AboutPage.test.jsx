import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from '../../../components/About/AboutPage';

describe('AboutPage Component', () => {
  const wrapper = shallow(<AboutPage />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
