import React from 'react';
import { shallow } from 'enzyme';
import AuthorListRow from '../../../components/Authors/AuthorListRow';
import mockAuthor from '../../__mocks__/mockAuthor';

const setup = () => {
  const props = {
    ...mockAuthor,
    deleteAuthor: jest.fn()
  };

  const wrapper = shallow(<AuthorListRow {...props} />);

  return {
    props,
    wrapper
  };
};

describe('AuthorListRow Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a table row with four table data cells', () => {
    expect(wrapper.find('tr').length).toBe(1);
    expect(wrapper.find('td').length).toBe(4);
  });

  it('renders a Link component', () => {
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('renders a Delete button', () => {
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toBe('Delete');
  });

  it('calls deleteCourse onClick of Delete button', () => {
    const deleteButton = wrapper.find('button');
    deleteButton.simulate('click');

    expect(props.deleteAuthor).toHaveBeenCalled();
    expect(props.deleteAuthor).toHaveBeenLastCalledWith(mockAuthor.id);
  });
});
