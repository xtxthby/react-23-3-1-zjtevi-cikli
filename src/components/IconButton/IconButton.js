import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';
// рендеримо звичайку кнопку де він очікує дітей - це іконка , клік і пропси
const IconButton = ({ children, onClick, ...allyProps }) => (
  <button type="button" className="IconButton" onClick={onClick} {...allyProps}>
    {children}
  </button>
);
// дефолтні пропси
IconButton.defaultProps = {
  // фунція при клікі повертає нал
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
