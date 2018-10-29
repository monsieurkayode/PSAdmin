import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { string, shape, arrayOf } from 'prop-types';

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
export const Header = ({ location: { pathname }, courses, authors }) => {
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
          <li className={`link ${activeLink('author') && 'active'}`}>
            <Link to="/authors">
              Authors <span className="count">{authors.length}</span>
            </Link>
          </li>
          <li className={`link ${activeLink('course') && 'active'}`}>
            <Link to="/courses">
              Courses <span className="count">{courses.length}</span>
            </Link>
          </li>
          <li className={`link ${activeLink('about') && 'active'}`}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

/**
 * @function mapStateToProps
 *
 * @param {object} state
 *
 * @returns {object}
 */
const mapStateToProps = ({
  allCourses: { courses },
  allAuthors: { authors }
}) => ({ courses, authors });

Header.propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired,
  courses: arrayOf(shape({})).isRequired,
  authors: arrayOf(shape({})).isRequired,
};

export default withRouter(connect(mapStateToProps)(Header));
