import React from 'react';

const MyComponent = props => {
  return <>
    <div>
      my new {props.name}'s component <br />
      children value : {props.children}
    </div>
  </>
}

MyComponent.defaultProps = {
  name: 'defualt'
};

export default MyComponent;