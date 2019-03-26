import React, { Component } from 'react';
import { BeginContainer, Username, RoomButton } from '../stylized/beginStyle';

class Begin extends Component {
  render() {
    const {
      roomsList,
      userName,
      changeInputUserName,
      onClickChat,
    } = this.props;

    const rooms = roomsList.map(room => (
      <RoomButton key={room} onClick={onClickChat.bind(null, room)}>
        Room {room}
      </RoomButton>
    ));

    return (
      <BeginContainer>
        <p>Choose your username</p>
        <Username type="text" value={userName} onChange={changeInputUserName} />
        <div>{rooms}</div>
      </BeginContainer>
    );
  }
}

export default Begin;
