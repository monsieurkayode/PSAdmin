import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../../../components/common/TextInput/Index';

let wrapper;

const setup = (loading, error) => {
  const props = {
    name: '',
    label: '',
    value: '',
    placeholder: '',
    onChange: jest.fn(),
    onFocus: jest.fn(),
    error,
    loading
  };

  return mount(<TextInput {...props} />);
};

describe('TextInput Component', () => {
  it('renders correctly', () => {
    wrapper = setup(false, '');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a label and input element', () => {
    expect(wrapper.find('label').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('renders a loader component when making async requests', () => {
    wrapper = setup(true, '');
    expect(wrapper.find('Loader').length).toEqual(1);
  });

  it('does not render loader component when not making async requests', () => {
    wrapper = setup(false, '');
    expect(wrapper.find('Loader').length).toEqual(0);
  });

  it('renders an error div when there are errors', () => {
    wrapper = setup(false, 'Invalid input length');
    expect(wrapper.find('.alert').length).toEqual(1);
  });
});
