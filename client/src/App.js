import './App.css';
import React, { Component } from 'react';
import {  w3cwebsocket as W3CWebSocket} from "websocket";
const client = new W3CWebSocket('wss://192.168.1.29:8000');

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
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleEdit}
          ></input>
      </div>
    );
  }
}

export default App;
