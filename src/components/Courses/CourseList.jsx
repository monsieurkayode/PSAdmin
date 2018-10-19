import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import CourseListRow from './CourseListRow';

/**
 *
 * @function CourseList
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const CourseList = ({ courses, deleteCourse }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => (
        <CourseListRow
          key={course.id}
          {...course}
          deleteCourse={deleteCourse}
        />
      ))}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: arrayOf(shape({})).isRequired,
  deleteCourse: func.isRequired
};

export default CourseList;
