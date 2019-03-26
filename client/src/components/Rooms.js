import React, { memo } from 'react';
import { RoomsContainer, Room } from '../stylized/roomsStyle';

const Rooms = ({ currentRoom, roomsList, onRoomChange }) => {
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
};

export default memo(Rooms);
