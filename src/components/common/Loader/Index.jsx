import React from 'react';
import { number } from 'prop-types';
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';

import '../../../styles/Loader.scss';

/**
 *
 * @function Loader
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const Loader = ({ size }) => (
  <div className="loader">
    <PreloaderIcon
      loader={Oval}
      size={size}
      strokeWidth={12}
      strokeColor="#337AB7"
      duration={800}
    />
  </div>
);

Loader.propTypes = {
  size: number.isRequired
};

export default Loader;
