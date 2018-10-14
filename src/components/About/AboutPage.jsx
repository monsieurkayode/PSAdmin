import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @function AboutPage
 *
 * @returns {JSX}
 */
const AboutPage = () => (
  <div className="container jumbotron">
    <div className="container-fluid">
      <h1>About PSAdmin</h1>
      <p>
        This application uses React, Redux, React-Router and a variety
        of other helpful libraries.
      </p>
      <Link to="/about">
        <button type="button" className="btn btn-lg btn-primary">
          Learn more
        </button>
      </Link>
    </div>
  </div>
);

export default AboutPage;
