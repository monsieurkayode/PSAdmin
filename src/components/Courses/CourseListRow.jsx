import React from 'react';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';

/**
 *
 * @function CourseListRow
 *
 * @param {object} { id, watchHref, title, authorId, category, length }
 *
 * @returns {JSX}
 */
const CourseListRow = ({
  id, watchHref, title, authorId, category, length, deleteCourse
}) => (
  <tr>
    <td>
      <a href={watchHref} target="_blank" rel="noopener noreferrer">
        Watch
      </a>
    </td>
    <td><Link to={`/course/${id}`}>{title}</Link></td>
    <td>{authorId}</td>
    <td>{category}</td>
    <td>{length}</td>
    <td>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={() => deleteCourse(id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

CourseListRow.propTypes = {
  authorId: string.isRequired,
  category: string.isRequired,
  id: string.isRequired,
  length: string.isRequired,
  title: string.isRequired,
  watchHref: string.isRequired,
  deleteCourse: func.isRequired
};

export default CourseListRow;
