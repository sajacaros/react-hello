import React, {Component} from 'react';

class EventPractice extends Component{
  state = {
    message: '',
    username: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleClick() {
    alert(this.state.username + ' : ' + this.state.message);
    this.setState({message: '',username: ''});
  }

  render() {
    return (
      <div>
        <h1>event practice</h1>
        <input
          type="text"
          name="username"
          placeholder="input username.."
          value={this.state.username}
          onChange={this.handleChange} 
        />
        <input
          type="text"
          name="message"
          placeholder="input message.."
          value={this.state.message}
          onChange={this.handleChange} 
        />
        <button onClick={this.handleClick}>confirm</button>
      </div>
    )
  }
}

export default EventPractice;