import React, {Component} from 'react';

class EventPractice extends Component{
  state = {
    message: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({message: e.target.value});
  }

  handleClick() {
    alert(this.state.message);
    this.setState({message: ''});
  }

  render() {
    return (
      <div>
        <h1>event practice</h1>
        <input
          type="text"
          name="message"
          placeholder="any input.."
          value={this.state.message}
          onChange={this.handleChange} 
        />
        <button onClick={this.handleClick}>confirm</button>
      </div>
    )
  }
}

export default EventPractice;