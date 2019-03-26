import React, { Component } from 'react';

class Rooms extends Component {
  render() {
    const { currentRoom, roomsList, onRoomChange } = this.props;
    const roomsToShow = roomsList.map(room =>
      room !== currentRoom ? (
        <li onClick={onRoomChange.bind(null, room)}>{room}</li>
      ) : null
    );
    return (
      <div>
        <p>rooms</p>
        <ul>{roomsToShow}</ul>
      </div>
    );
  }
}

export default Rooms;
