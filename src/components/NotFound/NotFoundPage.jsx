import React from 'react';
import { string } from 'prop-types';

/**
 * @function NotFoundPage
 *
 * @param {object} props
 *
 * @returns {JSX}
 */
const NotFoundPage = ({ content }) => (
  <div style={{ marginTop: '20%' }} className="no-content">
    <h3>404! <span>| {content} not found!</span></h3>
  </div>
);

NotFoundPage.defaultProps = {
  content: 'Page'
};

NotFoundPage.propTypes = {
  content: string
};

export default NotFoundPage;
