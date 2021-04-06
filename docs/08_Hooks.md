## 8장 Hooks
### 8.1 useState
  - 함수형 컴포넌트에서 상태 관리
    ```
    const Counter = () => {
      const [value, setValue] = useState(0);

      return (
        <div>
          <p>count : <b>{value}</b><p>
          <button onClick={() => setValue(value+1)}>+1</button>
          <button onClick={() => setValue(value-1)}>-1</button>
        </div>
      );
    }
    ```
#### 8.1.1 useState를 여러번 사용하기
  - 하나의 useState함수는 하나의 상태 값만 관리
  - 여러개의 상태를 관리할 경우 useState를 여러번 사용
    ```
    const Info = () => {
      const [name, setName] = useState('');
      const [nickname, setNickname] = useState('');

      const onChangeName = e => {
        setName(e.target.value);
      };

      const onChangeNickname = e => {
        setNickname(e.target.value);
      }

      return (
        <div>
          <div>
            <input value={name} onChange={onChangeName} />
            <input value={nickname} onChange={onChangeNickname} />
          </div>
          ...
        </div>
      )
    }
    ```
### 8.2 useEffect
  - 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정
  - 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태
    ```
    const Info = () => {
      const [name, setName] = useState('');
      const [nickname, setNickname] = useState('');

      useEffect(() => {
        console.log('completed for rendering');
        console.log({name, nickname});
      })
      ...
      return (
        <div>
          <div>
            <input value={name} onChange={onChangeName} />
            <input value={nickname} onChange={onChangeNickname} />
          </div>
          ...
        </div>
      )
    }
    ```
#### 8.2.1 마운트될 때만 실행하고 싶을 때
  - 두번째 파라미터에 비어있는 배열 추가
    ```
    const Info = () => {
      const [name, setName] = useState('');
      const [nickname, setNickname] = useState('');

      useEffect(() => {
        console.log('completed for rendering');
        console.log({name, nickname});
      }, [])
      ...
      return (
        <div>
          <div>
            <input value={name} onChange={onChangeName} />
            <input value={nickname} onChange={onChangeNickname} />
          </div>
          ...
      )
    }
    ```
#### 8.2.2 특정 값이 업데이트될 때만 실행하고 싶을 때
  - 두번째 파라미터의 배열에 검사하고 싶은 항목 추가
    ```
    const Info = () => {
      const [name, setName] = useState('');
      const [nickname, setNickname] = useState('');

      useEffect(() => {
        console.log('completed for rendering');
        console.log({name, nickname});
      }, [name])
      ...
      return (
        <div>
          <div>
            <input value={name} onChange={onChangeName} />
            <input value={nickname} onChange={onChangeNickname} />
          </div>
          ...
      )
    }
    ```
#### 8.2.3 뒷정리하기
  - 뒷정리 함수 반환
    - 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 수행해야할 작업
      ```
      const Info = () => {
        const [name, setName] = useState('');
        const [nickname, setNickname] = useState('');

        useEffect(() => {
          console.log('completed for rendering');
          console.log({name, nickname});
          return ()=>{
            console.log('cleanup');
            console.log('name : ' , name);
          }
        }, [name]);
        ...
        return (
          <div>
            <div>
              <input value={name} onChange={onChangeName} />
              <input value={nickname} onChange={onChangeNickname} />
            </div>
            ...
          </div>
        )
      }
      ```
    - 가시성 예제
      ```
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
      ```
### 8.3 useReducer
  - useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 할 때 사용
  - 리듀서
    - 현재상태, 액션값을 전달받아 새로운 상태를 반환하는 함수
    - 새로운 상태를 만들 때는 불변성을 지켜줘야 함
      ```
      function reducer(state, action) {
        return { ... };
      }
      ```
    - 액션
      ```
      {
        type: 'INCREMENT'
      }
      ```
#### 8.3.1 카운터 구현하기
  - 카운터 구현
    ```
    function reducer(state, action) {
      switch(action.type) {
        case 'INCREMENT':
          return { value: state.value+1 };
        case 'DECREMENT':
          return { value: state.value-1 };
        default:
          return state;
      }
    }

    const Counter = () => {
      const [state, dispatch] = useReducer(reducer, {value: 0});

      return (
        <div>
          <p>count : <b>{state.value}</b></p>
          <button onClick={() => dispatch({type:'INCREMENT'})}>+1</button>
          <button onClick={() => dispatch({type:'DECREMENT'})}>-1</button>
        </div>
      );
    }
    ```
    - userReducer
      - 첫번째 파라미터 : 리듀서 함수
      - 두번째 파라미터 : 해당 리듀서의 기본값
      - 반환 : state, dispatch
        - state : 현재 상태
        - dispatch
          - dispatch(action)과 같은 형태로 사용
          - 리듀서 함수 호출
#### 8.3.2 인풋 상태 관리하기
  - Info 컴포넌트에 useReducer 적용
    ```
    function reducer(state, action) {
      return {
        ...state,
        [action.name]: action.value
      }
    }

    const Info = () => {
      const [state, dispatch] = useReducer(reducer, {
        name: '',
        nickname: ''
      });

      const {name, nickname} = state;

      const onChange = e => {
        dispatch(e.target);
      };

      return (
        <div>
          <div>
            <input name="name" value={name} onChange={onChange} />
            <input name="nickname" value={nickname} onChange={onChange} />
          </div>
          <div>
            <b>name : </b> {name}
          </div>
          <div>
            <b>nickname : </b> {nickname}
          </div>
        </div>
      )
    }
    ```
### 8.4 useMemo
  - 함수형 컴포넌트 내부에서 발생하는 연산 최적화
    ```
    const getAverage = numbers => {
      console.log('average is calculating...');
      if(numbers.length === 0 ) return 0;
      const sum = numbers.reduce((a,b)=>a+b);
      return sum / numbers.length;
    };

    const Average = () => {
      const [list, setList] = useState([]);
      const [number, setNumber] = useState('');

      const onChange = e=>{
        setNumber(e.target.value);
      }

      const onInsert = ()=> {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
      }

      return (
        <div>
          <input value={number} onChange={onChange} />
          <button onClick={onInsert}>register</button>
          <ul>
            {list.map((value, index)=>(<li key={index}>{value}</li>))}
          </ul>
          <div>
            <b>average : </b> {getAverage(list)}
          </div>
        </div>
      )
    }
    ```
    - getAverage 함수가 input이 바뀔때마다 호출
    - useMemo Hook을 사용
      - 특정값이 바뀌었을 때만 연산 실행
      - 특정값이 바뀌지 않았을 때에는 결과 재사용
      ```
      const getAverage = numbers => {
        console.log('average is calculating...');
        if(numbers.length === 0 ) return 0;
        const sum = numbers.reduce((a,b)=>a+b);
        return sum / numbers.length;
      };

      const Average = () => {
        const [list, setList] = useState([]);
        const [number, setNumber] = useState('');
        const avg = useMemo( ()=>getAverage(list), [list] );

        const onChange = e=>{
          setNumber(e.target.value);
        }

        const onInsert = ()=> {
          const nextList = list.concat(parseInt(number));
          setList(nextList);
          setNumber('');
        }

        return (
          <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>register</button>
            <ul>
              {list.map((value, index)=>(<li key={index}>{value}</li>))}
            </ul>
            <div>
              <b>average : </b> {avg}
            </div>
          </div>
        )
      }
      ```
### 8.5 useCallback
  - 렌더링 성능을 최적화해야 하는 상황에서 사용
  ```
  const getAverage = numbers => {
    console.log('average is calculating...');
    if(numbers.length === 0 ) return 0;
    const sum = numbers.reduce((a,b)=>a+b);
    return sum / numbers.length;
  };

  const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const avg = useMemo( ()=>getAverage(list), [list]);

    const onChange = useCallback(e=>{
      setNumber(e.target.value);
    }, []);

    const onInsert = useCallback(()=> {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
    }, [number, list]);

    return (
      <div>
        <input value={number} onChange={onChange} />
        <button onClick={onInsert}>register</button>
        <ul>
          {list.map((value, index)=>(<li key={index}>{value}</li>))}
        </ul>
        <div>
          <b>average : </b> {avg}
        </div>
      </div>
    )
  }
  ```
  - 첫 번째 파라미터 : 생성하고 싶은 함수
  - 두 번째 파라미터 : 의존성 배열로서 값이 바뀌었을때 함수를 다시 생성
### 8.6 useRef
  - ref를 쉽게 사용할 수 있도록 해주는 Hook
    ```
    const Average = () => {
      const [list, setList] = useState([]);
      const [number, setNumber] = useState('');
      const inputEl = useRef(null);
      const avg = useMemo( ()=>getAverage(list), [list]);

      const onChange = useCallback(e=>{
        setNumber(e.target.value);
      }, []);

      const onInsert = useCallback(()=> {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus();
      }, [number, list]);

      return (
        <div>
          <input value={number} onChange={onChange} ref={inputEl} />
          ...
        </div>
      )
    }
    ```
#### 8.6.1 로컬 변수 사용하기
  - 컴포넌트 로컬 변수를 사용해야 할 때도 useRef 활용 가능
    - 로컬변수 : 렌더링과 상관없이 바뀔 수 있는 값
    ```
    const RefSample = () => {
      const id = useRef(1);
      const setId = (n) => {
        id.current = n;
      }
      const printId = () => {
        console.log(id.current);
      }
      return (
        <div>refSample</div>
      )
    }
    ```
    - ref 안의 값이 바뀌어도 컴포너트가 렌더링되지 않음
### 8.7 커스텀 Hooks 만들기
  - 커스텀 hook
    ```
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
    ```
  - 커스텀 hook 사용
    ```
    const Info = () => {
      const [state, onChange] = useInputs({
        name: '',
        nickname: ''
      });

      const {name, nickname} = state;

      return (
        ...
      )
    }
    ```
### 8.8 다른 Hooks
### 8.9 정리