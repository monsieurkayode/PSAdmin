import React from 'react';
import { shallow } from 'enzyme';
import AuthorForm from '../../../components/Authors/AuthorForm';
import mockAuthor from '../../__mocks__/mockAuthor';

const setup = (saving) => {
  const props = {
    ...mockAuthor,
    loading: false,
    saving,
    onSubmit: jest.fn(),
    onFocus: jest.fn(),
    onChange: jest.fn()
  };

  const wrapper = shallow(<AuthorForm {...props} />);

  return {
    props,
    wrapper
  };
};

describe('AuthorForm Component', () => {
  const { wrapper, props } = setup(false);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a form element', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders two TextInput children components', () => {
    expect(wrapper.find('TextInput').length).toBe(2);
  });

  it('renders a form submit button', () => {
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
  });

  it('form submit button displays Save text when not saving', () => {
    expect(wrapper.find('input[type="submit"]').props().value).toBe('Save');
  });

  it('form submit button displays Saving... text when saving', () => {
    const newWrapper = setup(true).wrapper;
    const saveButton = newWrapper.find('input[type="submit"]');
    expect(saveButton.props().value).toBe('Saving...');
  });

  it('calls onSumit when form is submitted', () => {
    wrapper.find('form').simulate('submit');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
