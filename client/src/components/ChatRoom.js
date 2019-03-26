import React, { PureComponent } from 'react';
import Rooms from './Rooms';
import { receiveMessage, sendMessage } from '../services/socket';
import { addNewMessage } from '../utils/messages';
import { RoomName, Messages, InputChat } from '../stylized/chatRoomStyle';

export default class ChatRoom extends PureComponent {
  state = {
    messages: [],
    newMessage: '',
    room: '',
  };

  componentDidMount() {
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
    const { currentRoom, roomsList, welcomeMessage, onRoomChange } = this.props;
    const showMessage = messages.map(({ userName, message }, index) => (
      <p key={index}>
        <b>{userName} : </b>
        {message}
      </p>
    ));
    return (
      <div>
        <div>
          <RoomName>Room {currentRoom}</RoomName>
        </div>
        <div>{welcomeMessage}</div>
        <Messages>{showMessage}</Messages>
        <InputChat>
          <input
            type="text"
            value={newMessage}
            onChange={this.changeInputMessage}
            onKeyDown={this.onKeyDown}
          />
          <button onClick={this.sendNewMessage.bind(this)}>send</button>
        </InputChat>
        <div>
          <Rooms
            currentRoom={currentRoom}
            roomsList={roomsList}
            onRoomChange={onRoomChange}
          />
        </div>
      </div>
    );
  }
}
