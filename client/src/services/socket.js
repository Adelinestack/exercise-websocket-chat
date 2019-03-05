import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:8080');

export const receiveMessage = callback =>
  socket.on('message', message => callback(message));

export const sendMessage = message => {
  socket.emit('newMessage', message);
};

export const receiveRoomsList = callback =>
  socket.on('roomsList', roomsList => callback(roomsList));

export const sendRoomChosen = roomChosen =>
  socket.emit('roomChosen', roomChosen);

export const receiveWelcomeMessage = callback =>
  socket.on('welcomeMessage', message => callback(message));
