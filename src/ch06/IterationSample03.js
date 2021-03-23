import React, {useState} from 'react';

const IterationSample = () => {

  const [names, setNames] = useState([
    {id:1, text:'snow man'}, 
    {id:2, text:'ice'}, 
    {id:3, text:'snow'}, 
    {id:4, text:'wind'}
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);

  const onChange = e=> setInputText(e.target.value);
  const onClick = () => {
    const newNames = names.concat({
      id: nextId,
      text: inputText
    });
    setNextId(nextId+1);
    setNames(newNames);
    setInputText('');
  }

  const nameList = names.map( item=><li key={item.id}>{item.text}</li>);

  return (<>
    <input value={inputText} onChange={onChange} />
    <button onClick={onClick}>add</button>
    <ul>{nameList}</ul>
  </>);
}

export default IterationSample;