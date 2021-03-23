import React, {Component} from 'react';
import ScrollBox from './ScrollBox02';

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

export default App;