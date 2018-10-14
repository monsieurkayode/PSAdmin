import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @function HomePage
 *
 * @returns {JSX}
 */
const HomePage = () => (
  <div className="container jumbotron">
    <div className="container-fluid">
      <h1>Pluralsight Administration</h1>
      <p>React, React Router, and Flux for ultra-responsive web apps.</p>
      <Link to="/about">
        <button type="button" className="btn btn-lg btn-primary">
          Learn more
        </button>
      </Link>
    </div>
  </div>
);

export default HomePage;
