import React from 'react';

const IterationSample = () => {
  const names = ['snow man', 'ice', 'snow', 'wind'];
  const nameList = names.map( (name,index)=><li key={index}>{name}</li>);
  return <ul>{nameList}</ul>
}

export default IterationSample;