import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';
import {Launcher} from 'react-chat-window';
import openSocket from 'socket.io-client';
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }

  componentDidMount(){
    openSocket('http://localhost:3000'); 
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  _sendMessage(text) {
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
