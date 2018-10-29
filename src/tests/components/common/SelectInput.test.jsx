import React from 'react';
import { mount } from 'enzyme';
import SelectInput from '../../../components/common/SelectInput/Index';

let wrapper;

const setup = (loading, error) => {
  const props = {
    name: '',
    label: '',
    defaultOption: '',
    value: '',
    onChange: jest.fn(),
    onFocus: jest.fn(),
    error,
    options: [{ value: '', text: '' }],
    loading
  };

  return mount(<SelectInput {...props} />);
};

describe('SelectInput Component', () => {
  it('renders correctly', () => {
    wrapper = setup(false, '');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a label and select element', () => {
    expect(wrapper.find('label').length).toEqual(1);
    expect(wrapper.find('select').length).toEqual(1);
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
    wrapper = setup(false, 'Select an author');
    expect(wrapper.find('.alert').length).toEqual(1);
  });
});
