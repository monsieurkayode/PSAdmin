import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  shape,
  bool,
  string,
  func
} from 'prop-types';
import toastr from 'toastr';
import { Prompt } from 'react-router-dom';
import { saveAuthor, setSaveErrors } from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import NotFoundPage from '../NotFound/NotFoundPage';
import { validateInput, checkChanges } from '../../helpers/validator';
import getAuthor from '../../helpers/getData';


export class ManageAuthorsPage extends Component {
  static defaultProps = {
    author: {},
    match: {}
  }

  static propTypes = {
    author: shape({}),
    isSaving: bool.isRequired,
    loadingAuthor: bool.isRequired,
    history: shape({
      push: func.isRequired
    }).isRequired,
    match: shape({
      params: {
        id: string
      }
    })
  }

  static initialState = () => ({
    author: {
      id: '',
      firstName: '',
      lastName: ''
    },
    errors: {},
    newChanges: false
  })

  static getDerivedStateFromProps(
    { author, isSaving }, { errors, newChanges }
  ) {
    if (!isSaving && !newChanges) {
      return {
        ...ManageAuthorsPage.initialState(),
        author,
        errors,
        newChanges
      };
    }

    return null;
  }

  state = ManageAuthorsPage.initialState();

  redirect = this.props.history.push;

  componentWillUnmount() {
    this.props.setSaveErrors({});
  }

  handleInputChange = (event) => {
    const { author } = this.state;
    author[event.target.name] = event.target.value;
    this.setState({ author, newChanges: checkChanges(author) });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { author } = this.state;
    const { isValid, errors } = validateInput(author, false);

    if (!isValid) {
      toastr.clear();
      toastr.error('Invalid form data', 'Submission Error!');
      return this.setState({ errors });
    }

    this.setState({ newChanges: false });

    this.props.saveAuthor(author)
      .then(() => this.redirect('/authors'))
      .catch(err => this.setState({ errors: err }));
  }

  clearErrors = (event) => {
    toastr.clear();
    const { errors } = this.state;
    errors[event.target.name] = '';
    if (Object.keys(this.state.errors).length > 0) {
      this.setState({ errors });
    }
  }

  render() {
    const { author, errors, newChanges } = this.state;
    const { isSaving, loadingAuthor, match } = this.props;

    if (!loadingAuthor && match.params.id && !this.props.author.id) {
      return <NotFoundPage content="Author" />;
    }

    return (
      <div className="container" style={{ maxWidth: '55%', minWidth: '400px' }}>
        <Prompt
          when={!isSaving && newChanges}
          message="You have unsaved changes, leave page?"
        />
        <h1>Manage Author</h1>
        <AuthorForm
          {...author}
          errors={errors}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          onFocus={this.clearErrors}
          saving={isSaving}
          loading={loadingAuthor}
        />
      </div>
    );
  }
}

/**
 *
 * @description makes the ManageAuthorsPage a container component
 * by making it aware of the application state in the store
 * via the connect function from react-redux library
 *
 * @function mapStateToProps
 *
 * @param {object} { allAuthors }
 */
const mapStateToProps = ({
  allAuthors: {
    authors, isLoading, isSaving, errors
  }
}, { match: { params } }) => {
  let { author } = ManageAuthorsPage.initialState();

  if (getAuthor(authors, params.id)) {
    author = Object.assign({}, getAuthor(authors, params.id));
  }

  let loadingAuthor = isLoading;

  if (!params.id) { loadingAuthor = false; }

  return {
    isSaving,
    loadingAuthor,
    errors,
    authors,
    author
  };
};

export default connect(
  mapStateToProps,
  { saveAuthor, setSaveErrors }
)(ManageAuthorsPage);
