import React, { Component } from 'react';

import Begin from './components/Begin';
import ChatRoom from './components/ChatRoom';

import {
  receiveMessage,
  receiveRoomsList,
  sendRoomChosen,
  receiveWelcomeMessage,
} from './services/socket';

class App extends Component {
  state = {
    chatState: 'BEGIN',
    userName: '',
    prevMessages: [],
    roomsList: [],
    currentRoom: '',
  };
  componentDidMount() {
    receiveRoomsList(roomsList => this.setState({ roomsList }));
    receiveWelcomeMessage(welcomeMessage => {
      this.setState({ welcomeMessage, chatState: 'CHAT' });
    });
    receiveMessage(prevMessages => {
      this.setState({ prevMessages });
    });
  }

  changeInputUserName = ({ target: { value } }) =>
    this.setState({
      userName: value,
    });

  onClickChat = roomChosen => {
    if (!this.state.userName.length) {
      this.setState({
        userName: Date.now(),
      });
    }
    this.setState({
      currentRoom: roomChosen,
    });
    sendRoomChosen(roomChosen);
  };

  render() {
    const {
      userName,
      roomsList,
      currentRoom,
      prevMessages,
      chatState,
      welcomeMessage,
    } = this.state;
    const chatStateComponents = {
      BEGIN: (
        <Begin
          userName={userName}
          roomsList={roomsList}
          changeInputUserName={this.changeInputUserName.bind(this)}
          onClickChat={this.onClickChat.bind(this)}
        />
      ),
      CHAT: (
        <ChatRoom
          userName={userName}
          currentRoom={currentRoom}
          welcomeMessage={welcomeMessage}
          prevMessages={prevMessages}
        />
      ),
    };

    return <div className="App">{chatStateComponents[chatState]}</div>;
  }
}

export default App;
