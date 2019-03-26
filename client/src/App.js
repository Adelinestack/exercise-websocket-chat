import React, { Component } from 'react';

import Begin from './components/Begin';
import ChatRoom from './components/ChatRoom';

import {
  receiveMessage,
  receiveRoomsList,
  sendRoomChosen,
  receiveWelcomeMessage,
  receiveNewRoom,
} from './services/socket';

import { Container } from './stylized/appStyle';

class App extends Component {
  state = {
    chatState: 'BEGIN',
    userName: '',
    prevMessages: [],
    roomsList: [],
    currentRoom: '',
    welcomeMessage: '',
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
    this.setState(
      prevState => {
        return {
          userName: prevState.userName || Date.now(),
          currentRoom: roomChosen,
        };
      },
      () => sendRoomChosen(roomChosen, this.state.userName)
    );
  };

  onRoomChange = newRoomChosen => {
    sendRoomChosen(newRoomChosen, this.state.userName);
    receiveNewRoom(newRoomChosen => {
      this.setState({ currentRoom: newRoomChosen });
    });
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
          roomsList={roomsList}
          welcomeMessage={welcomeMessage}
          prevMessages={prevMessages}
          onRoomChange={this.onRoomChange.bind(this)}
        />
      ),
    };

    return (
      <div className="App">
        <Container>
          <h1>- Chat room -</h1>
          {chatStateComponents[chatState]}
        </Container>
      </div>
    );
  }
}

export default App;
