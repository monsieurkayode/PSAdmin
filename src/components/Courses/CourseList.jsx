import React from 'react';
import { arrayOf, shape } from 'prop-types';
import CourseListRow from './CourseListRow';

/**
 *
 * @function CourseList
 *
 * @returns {JSX}
 */
const CourseList = ({ courses }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => <CourseListRow key={course.id} {...course} />)}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: arrayOf(shape({})).isRequired
};

export default CourseList;
