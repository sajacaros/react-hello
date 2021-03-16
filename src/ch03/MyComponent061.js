import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({name, children, favoriteNumber}) => {
  return <>
    <div>
      my new {name}'s component <br />
      children value : {children} <br />
      favotieNumber : {favoriteNumber}
    </div>
  </>
}

MyComponent.defaultProps = {
  name: 'defualt'
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
};

export default MyComponent;