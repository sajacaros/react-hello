import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  render() {
    const {name, children, favoriteNumber} = this.props;
    return (
      <div>
        my new {name}'s component <br />
        children value : {children} <br />
        favotieNumber : {favoriteNumber}
      </div>  
    );
  }
}


MyComponent.defaultProps = {
  name: 'defualt'
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
};

export default MyComponent;