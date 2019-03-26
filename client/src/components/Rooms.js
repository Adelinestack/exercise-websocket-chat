import React, { Component } from 'react';
import { RoomsContainer, Room } from '../stylized/roomsStyle';
class Rooms extends Component {
  render() {
    const { currentRoom, roomsList, onRoomChange } = this.props;
    const roomsToShow = roomsList.map(room =>
      room !== currentRoom ? (
        <Room onClick={onRoomChange.bind(null, room)}>{room}</Room>
      ) : null
    );
    return (
      <RoomsContainer>
        <p>Join another room</p>
        <div>{roomsToShow}</div>
      </RoomsContainer>
    );
  }
}

export default Rooms;
