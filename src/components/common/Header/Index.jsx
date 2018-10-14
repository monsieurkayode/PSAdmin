import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { string, shape } from 'prop-types';

import brandLogo from '../../../images/pluralsight-logo.png';
import '../../../styles/Header.scss';

/**
 *
 * @function Header
 *
 * @param {object} location
 *
 * @returns {JSX}
 */
const Header = ({ location: { pathname } }) => {
  /**
   * @description sets the active class
   * on the navbar item of the current page
   *
   * @function activeLink
   *
   * @param {string} path
   */
  const activeLink = (path) => {
    if (path.length === 1) {
      return pathname === '/';
    }

    return pathname.includes(path);
  };

  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={brandLogo} alt="brand" />
        </Link>
        <ul className="nav navbar-nav pull-right">
          <li className={`link ${activeLink('/') && 'active'}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`link ${activeLink('authors') && 'active'}`}>
            <Link to="/authors">Authors</Link>
          </li>
          <li className={`link ${activeLink('courses') && 'active'}`}>
            <Link to="/courses">Courses</Link>
          </li>
          <li className={`link ${activeLink('about') && 'active'}`}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired
};

export default withRouter(Header);
