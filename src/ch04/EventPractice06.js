import React, { useState } from 'react';

const EventPractice = () => {
  const [form, setForm] = useState({
    username: '',
    message: ''
  });
  const { username, message } = form;
  const onChange = e=> {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const onClick = () => {
    alert( username + ' : ' + message );
    setForm({
      username: '',
      message: ''
    });
  };
  const onKeyPress = e=> {
    if(e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div>
      <h1>event practice</h1>
      <input 
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="input message.."
        value={form.message}
        onChange={onChange}
        onKeyPress={onKeyPress} 
      />
      <button onClick={onClick}>confirm</button>

    </div>
  )
}

export default EventPractice;