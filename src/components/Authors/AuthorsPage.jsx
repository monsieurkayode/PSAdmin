import React from 'react';
import { Link } from 'react-router-dom';

const AuthorsPage = () => (
  <div className="container jumbotron">
    <div className="container-fluid">
      <h1>Authors</h1>
      <p>Authors management page.</p>
      <Link to="/authors">
        <button type="button" className="btn btn-lg btn-primary">
          Add Author
        </button>
      </Link>
    </div>
  </div>
);

export default AuthorsPage;
