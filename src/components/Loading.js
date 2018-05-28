import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const Loading = ({ color, size }) => (
  <div className="loader">
    <ReactLoading
      type="spin"
      color={color}
      height={size}
      width={size}
      className="mx-auto pl-xxl-5 pr-xxl-5"
    />
  </div>
);

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Loading.defaultProps = {
  color: '#ecf0f1',
  size: 30,
};

export default Loading;
