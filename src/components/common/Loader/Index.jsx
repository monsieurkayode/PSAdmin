import React from 'react';
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';

import '../../../styles/Loader.scss';

/**
 *
 * Loader
 * @function Loader
 *
 * @return {JSX} JSX
 */
const Loader = () => (
  <div className="loader">
    <PreloaderIcon
      loader={Oval}
      size={40}
      strokeWidth={12}
      strokeColor="#337AB7"
      duration={800}
    />
  </div>
);

export default Loader;
