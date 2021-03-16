import React from 'react';

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

export default MyComponent;