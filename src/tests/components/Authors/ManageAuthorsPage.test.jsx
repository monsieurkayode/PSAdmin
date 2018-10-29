import React from 'react';
import { shallow } from 'enzyme';
import { ManageAuthorsPage } from '../../../components/Authors/ManageAuthorsPage';
import mockAuthor from '../../__mocks__/mockAuthor';

const setup = () => {
  const props = {
    author: mockAuthor,
    isSaving: false,
    loadingAuthor: false,
    history: {
      push: jest.fn()
    },
    saveAuthor: () => new Promise(resolve => resolve(mockAuthor)),
    setSaveErrors: jest.fn(),
    match: {
      params: {
        id: mockAuthor.id
      }
    }
  };

  const state = {
    errors: {},
    newChanges: false
  };

  const wrapper = shallow(<ManageAuthorsPage {...props} />);

  return {
    wrapper,
    props,
    state
  };
};

const event = {
  target: {
    name: 'firstName',
    value: ''
  },
  preventDefault: jest.fn()
};

describe('ManageAuthorsPage Component', () => {
  const { wrapper, state, props: { isSaving, author } } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a h1 tag element', () => {
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Author');
  });

  it('renders a Prompt child component', () => {
    expect(wrapper.find('Prompt').length).toBe(1);
  });

  it('renders a AuthorForm child component', () => {
    expect(wrapper.find('AuthorForm').length).toBe(1);
  });

  it('invokes the static method getDerivedStateFromProps', () => {
    const { errors, newChanges } = state;
    const result = ManageAuthorsPage
      .getDerivedStateFromProps({ author, isSaving }, { errors, newChanges });
    expect(result.author).toEqual(author);
  });

  it('invokes handleSubmit method', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('invokes clearErrors method', () => {
    const clearErrorsSpy = jest.spyOn(wrapper.instance(), 'clearErrors');
    wrapper.instance().clearErrors(event);
    expect(clearErrorsSpy).toHaveBeenCalled();
  });

  it('invokes handleInputChange method', () => {
    const handleInputChangeSpy = jest
      .spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().handleInputChange(event);
    expect(handleInputChangeSpy).toHaveBeenCalled();
  });

  it('invokes componentWillMount method', () => {
    jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().componentWillUnmount).toHaveBeenCalled();
  });
});
