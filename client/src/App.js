import './App.css';
import React, { Component } from 'react';
import {  w3cwebsocket as W3CWebSocket} from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8000');

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      value: ''
    };
  }
  // when text is typed, send to server
  handleEdit = (text) => {
    this.setState({
      value: text.target.value
    });

    client.send(JSON.stringify({
      value: text.target.value
    }));
  };

  componentDidMount() {
    client.onopen = () => {
       console.log('Client Connected');
    };
    // received msg from server, so parse it
    client.onmessage = (msg) => {
      const serverMsg = JSON.parse(msg.data);
      console.log(serverMsg.value);
      this.setState({
        value: serverMsg.value
      });
    };
    client.onclose = () => {
      console.log('Client disconnected.');

    }
  }
  render(){
    return (
      <div> 
        <div className='title'>Start Typing</div>
        <div className='App'>...</div>
        <div className='container'>
          <textarea className='text-box'
          type="text"
          value={this.state.value}
          onChange={this.handleEdit}

          />
        </div>
      </div>
    );
  }
}

export default App;
