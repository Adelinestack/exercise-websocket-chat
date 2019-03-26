import React, { memo } from 'react';
import { BeginContainer, Username, RoomButton } from '../stylized/beginStyle';

const Begin = ({ roomsList, userName, changeInputUserName, onClickChat }) => {
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
};

export default memo(Begin);
