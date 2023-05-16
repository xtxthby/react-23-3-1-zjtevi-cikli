import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';
// рендеримо звичайку кнопку де він очікує дітей - це іконка , клік і пропси 
// які ми розпилюємо - ті самі атрибути досяжності
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
  // це атрибут доступності , вказуеться в баттоні
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
