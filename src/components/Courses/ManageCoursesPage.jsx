import React, { Component } from 'react';
import {
  shape, bool, arrayOf
} from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Prompt } from 'react-router-dom';
import { saveCourse, setSaveErrors } from '../../actions/courseActions';
import CourseForm from './CourseForm';
import NotFoundPage from '../NotFound/NotFoundPage';
import { validateInput, checkChanges } from '../../helpers/validator';

import '../../styles/ManageCoursePage.scss';

/**
 * @class ManageCoursesPage
 *
 * @extends Component
 *
 * @returns {JSX}
 */
class ManageCoursesPage extends Component {
  static defaultProps = {
    course: {}
  }

  static propTypes = {
    isSaving: bool.isRequired,
    course: shape({}),
    authors: arrayOf(shape({})).isRequired,
    loadingCourse: bool.isRequired
  }

  static initialState = () => ({
    course: {
      id: '',
      title: '',
      length: '',
      authorId: '',
      category: '',
      watchHref: '',
    },
    errors: {},
    newChanges: false,
  });

  static getDerivedStateFromProps(
    { course, isSaving }, { errors, newChanges }
  ) {
    if (!isSaving && !newChanges) {
      return {
        ...ManageCoursesPage.initialState(),
        course,
        errors,
        newChanges
      };
    }

    return null;
  }

  state = ManageCoursesPage.initialState();

  redirect = this.props.history.push;

  componentWillUnmount() {
    this.props.setSaveErrors({});
  }

  /**
   * @method clearErrors
   *
   * @memberof ManageCoursesPage
   *
   * @returns {void}
   */
  clearErrors = () => {
    toastr.clear();
    if (Object.keys(this.state.errors).length > 0) {
      this.setState({ errors: {} });
    }
  }

  /**
   * @method handleSubmit
   *
   * @memberof ManageCoursesPage
   *
   * @returns {void}
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const { course } = this.state;
    const { isValid, errors } = validateInput(course);

    this.setState({ newChanges: false });

    if (!isValid) {
      toastr.clear();
      toastr.error('Invalid form data', 'Submission Error!');
      return this.setState({ errors });
    }

    this.props.saveCourse(course)
      .then(() => this.redirect('/courses'))
      .catch(err => this.setState({ errors: err }));
  }

  /**
   * @method handleInputChange
   *
   * @memberof ManageCoursesPage
   *
   * @returns {void}
   */
  handleInputChange = (event) => {
    const { course } = this.state;
    course[event.target.name] = event.target.value;
    this.setState({ course, newChanges: checkChanges(course) });
  }

  render() {
    const {
      authors, isSaving, loadingCourse, match
    } = this.props;
    const { course, errors, newChanges } = this.state;

    if (!loadingCourse && match.params.id && !this.props.course.id) {
      return <NotFoundPage content="Course" />;
    }

    return (
      <div className="container" style={{ maxWidth: '55%', minWidth: '400px' }}>
        <Prompt
          when={!isSaving && newChanges}
          message="You have unsaved changes, leave page?"
        />
        <h1>Manage Course</h1>
        <CourseForm
          {...course}
          errors={errors}
          authors={authors}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          onFocus={this.clearErrors}
          saving={isSaving}
          loading={loadingCourse}
        />
      </div>
    );
  }
}

/**
 * @function getCourse
 *
 * @param {array} courses
 * @param {string} id
 *
 * @returns {any}
 */
const getCourse = (courses, id) => courses.find(c => c.id === id);

/**
 *
 * @description makes the ManageCoursePage a container component
 * by making it aware of the application state in the store
 * via the connect function from react-redux library
 *
 * @function mapStateToProps
 *
 * @param {object} { allCourses, allAuthors }
 */
const mapStateToProps = ({
  allAuthors: { authors },
  allCourses: {
    courses, isSaving, isLoading, errors
  }
}, { match: { params } }) => {
  let { course } = ManageCoursesPage.initialState();

  if (getCourse(courses, params.id)) {
    course = Object.assign({}, getCourse(courses, params.id));
  }

  const authorsFormattedForDropdown = authors.map(author => (
    {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    }
  ));

  let loadingCourse = isLoading;

  if (!params.id) { loadingCourse = false; }

  return {
    isSaving,
    loadingCourse,
    errors,
    courses,
    course,
    authors: authorsFormattedForDropdown
  };
};

export default connect(
  mapStateToProps,
  { saveCourse, setSaveErrors }
)(ManageCoursesPage);
