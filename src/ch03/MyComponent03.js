import React from 'react';

const MyComponent = props => {
  return <div>my new {props.name}'s component</div>
}

MyComponent.defaultProps = {
  name: 'defualt'
};

export default MyComponent;