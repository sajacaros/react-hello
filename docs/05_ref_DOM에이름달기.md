## 5장 ref:DOM에 이름 달기
  - ref
    - 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법
    - 리액트 컴포넌트 내부에서 id의 사용은 비추천
      - 컴포넌트 재사용시 중복 id가 사용될 수 있음
### 5.1 ref는 어떤 상황에서 사용해야 할까?
  - DOM을 직접 건드려야 할 때 사용
#### 5.1.1 예제 컴포넌트 생성
  - validation 확인 예제
    ```
    class ValidationSample extends Component {
      state = {
        password: '',
        clicked: false,
        validated: false
      }
      handleChange = (e) => {
        this.setState( {
          password: e.target.value
        });
      }
      handleButtonClick = () => {
        this.setState({
          clicked: true,
          validated: this.state.password === '0000'
        });
      }
      render() {
        return (
          <div>
            <input 
              type="password"
              value={this.state.passwd}
              onChange={this.handleChange}
              className={
                this.state.clicked ? 
                  (this.state.validated?'success':'failure'): 
                  ''
              }
            />
            <button onClick={this.handleButtonClick}>confirm</button>
          </div>
        )
      }
    }
    ```
#### 5.1.2 App컴포넌트에서 예제 컴포넌트 랜더링
#### 5.1.3 DOM을 꼭 사용해야 하는 상황
  - 특정 input에 포커스 주기
  - 스크롤 박스 조작하기
  - Canvas 요소에 그림 그리기
  - ...
### 5.2 ref 사용
#### 5.2.1 콜백 함수를 통한 ref 설정
  - 콜백 함수를 통한 ref 설정
    ```
    <input ref={(ref)=>{this.input=ref}} />
    ```
      - this.input은 input 요소의 DOM을 가리킴
#### 5.2.2 createRef를 통한 ref 설정
  - createRef를 통한 ref 설정
    ```
    class RefSample extends Component {
      input = React.createRef();
      ...
      render() {
        return (
          <div>
            <input ref={this.input} />
          </div>
        )
      }
    }
    ```
    - input 요소의 DOM을 가리킬때는 this.input.current로 접근(5.2.1과 비교)
#### 5.2.3 적용
### 5.3 컴포넌트에 ref 달기
  - 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 사용
#### 5.3.1 사용법
  - 사용법
    ```
    <MyComponent ref={(ref)=>{this.myComponent=ref}} />
    ```
    - MyComponent 내부의 메서드 및 멤버 변수 접근 가능
#### 5.3.2 컴포넌트 초기 설정
##### 5.3.2.1 컴포넌트 파일 생성
  - 컴포넌트 파일 생성
    ```
    class ScrollBox extends Component {
      render() {
        const style = {
          border: '1px, solid black',
          height: '300px',
          width: '300px',
          overflow: 'auto',
          position: 'relative'
        }
        const innerStyle = {
          width: '100%',
          height: '650px',
          background: 'linear-gradient(white, black)'
        }
        return (
          <div style={style} ref={(ref)=>{this.box=ref}}>
            <div style={innerStyle} />
          </div>
        )
      }
    }
    ```
##### 5.3.2.2 App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링
#### 5.3.3 컴포넌트에 메서드 생성
  - scrollToBottom 메서드 생성
    ```
    class ScrollBox extends Component {
      scrollToBottom = () => {
        const {scrollHeight, clientHeight} = this.box;
        console.log(scrollHeight, clientHeight);
        this.box.scrollTop = scrollHeight - clientHeight;
      }
      render() {
        ... css
        return (
          <div style={style} ref={(ref)=>{this.box=ref}}>
            <div style={innerStyle} />
          </div>
        )
      }
    }
    ```
#### 5.3.4 컴포넌트에 ref 달고 내부 메서드 사용
  - App에서 ref 사용
    ```
    class App extends Component {
      render() {
        return (
          <div>
            <ScrollBox ref={(ref)=>this.scrollBox = ref} />
            <button onClick={()=>this.scrollBox.scrollToBottom()}>to bottom</button>
          </div>
        );
      }
    }
    ```
### 5.4 정리