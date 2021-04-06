import React, { useState } from 'react';
import Info from './Info05';

const Visible = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={()=>{setVisible(!visible)}}>
        {visible? 'hide':'visible'}
      </button>
      <hr />
      {visible && <Info />}
    </div>
  )
}

export default Visible;