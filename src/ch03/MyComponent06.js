import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({name, children}) => {
  return <>
    <div>
      my new {name}'s component <br />
      children value : {children}
    </div>
  </>
}

MyComponent.defaultProps = {
  name: 'defualt'
};

MyComponent.propTypes = {
  name: PropTypes.string
};

export default MyComponent;