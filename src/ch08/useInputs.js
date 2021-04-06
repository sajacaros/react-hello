import {useReducer} from 'react';

function reducer(state, action) {
  return { 
    ...state,
    [action.name]: action.value
  };
}

export default function useInputs(initialsForm) {
  const [state, dispatch] = useReducer(reducer, initialsForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
}