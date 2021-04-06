import React, { useRef } from 'react';

const RefSample = () => {
  const id = useRef(1);
  const setId = () => {
    console.log(id.current)
    id.current = 1+id.current;
  }
  const printId = () => {
    console.log(id.current);
  }
  return (
    <div>
      <button onClick={setId}>increament</button>
      <button onClick={printId}>console</button>
    </div>
  )
}

export default RefSample;