import React, { Component } from 'react';

class Begin extends Component {
  render() {
    const {
      roomsList,
      userName,
      changeInputUserName,
      onClickChat,
    } = this.props;

    const rooms = roomsList.map(room => (
      <button key={room} onClick={onClickChat.bind(null, room)}>
        Room {room}
      </button>
    ));

    return (
      <div>
        <p>Choose username</p>
        <input type="text" value={userName} onChange={changeInputUserName} />
        {rooms}
      </div>
    );
  }
}

export default Begin;
