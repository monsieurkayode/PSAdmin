import React from 'react';
import { Link } from 'react-router-dom';

const CoursesPage = () => (
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
);

export default CoursesPage;
