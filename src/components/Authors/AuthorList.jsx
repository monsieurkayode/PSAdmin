import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({ authors, deleteAuthor }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>ID</th>
        <th>Author Name</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author => (
        <AuthorListRow
          key={author.id}
          {...author}
          deleteAuthor={deleteAuthor}
        />
      ))}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: arrayOf(shape({})).isRequired,
  deleteAuthor: func.isRequired,
};

export default AuthorList;
