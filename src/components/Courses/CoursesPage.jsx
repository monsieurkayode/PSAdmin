import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { arrayOf, shape, bool } from 'prop-types';
import CourseList from './CourseList';
import Loader from '../common/Loader/Index';

/**
 *
 * @function CoursesPage
 *
 * @param {object} { courses }
 *
 * @returns {JSX}
 */
const CoursesPage = ({ courses, isLoading }) => (
  <main>
    <div className="container jumbotron">
      <div className="container-fluid">
        <h1>Courses</h1>
        <p>Courses management page.</p>
        <Link to="/courses">
          <button type="button" className="btn btn-lg btn-primary">
            Add Course
          </button>
        </Link>
      </div>
    </div>
    <section className="container">
      <div>
        {isLoading ? <Loader />
          : <CourseList courses={courses} />
        }
      </div>
    </section>
  </main>
);

CoursesPage.propTypes = {
  courses: arrayOf(shape({})).isRequired,
  isLoading: bool.isRequired
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
  allCourses: { courses, isLoading }
}) => ({
  courses,
  isLoading
});

export default connect(mapStateToProps)(CoursesPage);
