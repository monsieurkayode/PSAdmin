import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  arrayOf, shape, bool, func
} from 'prop-types';
import { deleteCourse, pageChange } from '../../actions/courseActions';
import CourseList from './CourseList';
import Loader from '../common/Loader/Index';
import Pagination from '../common/Pagination/Index';
import paginator from '../../helpers/paginator';

/**
 *
 * @class CoursesPage
 * @extends Component
 *
 * @returns {JSX}
 */
class CoursesPage extends Component {
  componentWillUpdate({ meta, currentPage }) {
    if (meta.pageSize === 0 && currentPage > 1 && meta.pageCount >= 1) {
      this.props.pageChangeAction(currentPage - 1);
    }
  }

  /**
   * @method handlePageClick
   * @memberof CoursePage
   *
   * @param {object} { selected }
   *
   * @returns {void}
   */
  handlePageClick = ({ selected }) => {
    this.props.pageChangeAction(selected + 1);
  }

  render() {
    const {
      courses,
      isLoading,
      deleteCourseAction,
      meta
    } = this.props;
    return (
      <main>
        <div className="container jumbotron">
          <div className="container-fluid">
            <h1>Courses</h1>
            <p>Courses management page.</p>
            <Link to="/course">
              <button type="button" className="btn btn-lg btn-primary">
                Add Course
              </button>
            </Link>
          </div>
        </div>
        <section className="container">
          <div>
            {isLoading && <Loader size={40} />}
            {!isLoading && courses.length > 0
              && (
              <CourseList
                courses={courses}
                deleteCourse={deleteCourseAction}
              />
              )
            }
            {!isLoading && !courses.length
              && <div className="no-content">The course catalog is empty.</div>
            }
            {!isLoading && courses.length > 0 && (
            <Pagination
              {...meta}
              handlePageChange={this.handlePageClick}
            />
            )}
          </div>
        </section>
      </main>
    );
  }
}

CoursesPage.propTypes = {
  deleteCourseAction: func.isRequired,
  courses: arrayOf(shape({})).isRequired,
  isLoading: bool.isRequired,
  meta: shape({}).isRequired,
  pageChangeAction: func.isRequired
};

/**
 *
 * @description makes the CoursePage a container component
 * by making it aware of the application state in the store
 * via the connect function from react-redux library
 *
 * @function mapStateToProps
 *
 * @param {object} { allCourses }
 */
const mapStateToProps = ({
  allCourses: { courses, isLoading, currentPage }
}) => {
  const sortedCourses = courses.sort(
    (prev, next) => prev.title.toUpperCase() > next.title.toUpperCase()
  );
  const meta = paginator(sortedCourses, currentPage);

  return {
    courses: meta.results,
    isLoading,
    meta,
    currentPage
  };
};

export default connect(
  mapStateToProps,
  { deleteCourseAction: deleteCourse, pageChangeAction: pageChange }
)(CoursesPage);
