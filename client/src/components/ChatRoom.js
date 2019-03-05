import React, { Component } from 'react';

import { receiveMessage, sendMessage } from '../services/socket';

const addNewMessage = newMessage => prevState => ({
  messages: [...prevState.messages, ...newMessage],
});

export default class ChatRoom extends Component {
  state = {
    messages: [],
    newMessage: '',
    room: '',
  };
  componentDidMount() {
    this.setState({
      messages: this.props.prevMessages,
    });
    receiveMessage(message => {
      this.setState(addNewMessage(message));
    });
  }
  changeInputMessage = ({ target: { value } }) =>
    this.setState({
      newMessage: value,
    });

  sendNewMessage = () => {
    sendMessage({
      userName: this.props.userName,
      room: this.props.currentRoom,
      message: this.state.newMessage,
    });
    this.setState({
      newMessage: '',
    });
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.sendNewMessage();
    }
  };

  render() {
    const { messages, newMessage } = this.state;
    console.log(this.state.messages);
    const showMessage = messages.map(({ userName, message }, index) => (
      <p key={index}>
        <b>{userName} : </b>
        {message}
      </p>
    ));
    return (
      <div className="App">
        <div>
          <h1>Room {this.props.currentRoom}</h1>
        </div>
        <div>{this.props.welcomeMessage}</div>
        <div>{showMessage}</div>
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={this.changeInputMessage}
            onKeyDown={this.onKeyDown}
          />
          <button onClick={this.sendNewMessage.bind(this)}>send</button>
        </div>
      </div>
    );
  }
}
