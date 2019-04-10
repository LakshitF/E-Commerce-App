import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import {Launcher} from 'react-chat-window';
import OpenSocket from 'socket.io-client';
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }

  componentDidMount(){
    const socket=OpenSocket('http://localhost:8080/');  //addres of the port on which web socket is listening
    socket.emit('example_message','HELLO WORLD!');
    console.log('component mounted');
  }

  _onMessageWasSent(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      });
    }
  }

  _receiveMessage(text){
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'me',
          type: 'text',
          data: { text }
        }]
      });
    }
  }

  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>);
  }
}

export default Chat;
