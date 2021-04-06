import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>count : <b>{value}</b></p>
      <button onClick={() => setValue(value+1)}>+1</button>
      <button onClick={() => setValue(value-1)}>-1</button>
    </div>
  );
}

export default Counter;