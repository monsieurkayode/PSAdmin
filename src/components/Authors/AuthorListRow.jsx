import React from 'react';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';

const AuthorListRow = ({
  id,
  firstName,
  lastName,
  deleteAuthor
}) => (
  <tr>
    <td>&nbsp;</td>
    <td><Link to={`/author/${id}`}>{id}</Link></td>
    <td>{firstName}&nbsp;{lastName}</td>
    <td>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={() => deleteAuthor(id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

AuthorListRow.propTypes = {
  id: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  deleteAuthor: func.isRequired
};

export default AuthorListRow;
