import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

/**
 *
 * @function CourseListRow
 *
 * @param {object} { id, watchHref, title, authorId, category, length }
 *
 * @returns {JSX}
 */
const CourseListRow = ({
  id, watchHref, title, authorId, category, length
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
  </tr>
);

CourseListRow.propTypes = {
  authorId: string.isRequired,
  category: string.isRequired,
  id: string.isRequired,
  length: string.isRequired,
  title: string.isRequired,
  watchHref: string.isRequired,
};

export default CourseListRow;
