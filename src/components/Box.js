import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Box = ({
  label, value, linkTo, valueFontSize, styles,
}) => {
  const classes = 'block-box block-widget centered trend-in-corner padded bold-label';

  if (!value) {
    return (
      <div className={classes} style={styles}>
        <Loading />
      </div>
    );
  }

  const DivBox = () => (
    <React.Fragment>
      <div className="value" style={{ fontSize: valueFontSize, lineHeight: '3rem' }}>
        {value}
      </div>
      <div className="label">{label}</div>
    </React.Fragment>
  );

  if (!linkTo) {
    return (
      <div className={classes} style={styles}>
        <DivBox />
      </div>
    );
  }

  return (
    <Link to={linkTo} className={classes} style={styles}>
      <DivBox />
    </Link>
  );
};

Box.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  linkTo: PropTypes.string,
  valueFontSize: PropTypes.string,
  styles: PropTypes.object,
};

Box.defaultProps = {
  value: null,
  linkTo: null,
  valueFontSize: '2.25rem',
  styles: {},
};

export default Box;
