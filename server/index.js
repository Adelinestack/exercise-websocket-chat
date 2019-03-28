const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const { LAST_MESSAGES, ROOMS } = require('./utils/const');
let sockets = {};

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  sockets = { ...sockets, [socket.id]: { socket, lastRoom: null } };

  socket.emit('roomsList', ROOMS);
  socket.on('roomChosen', ({ roomChosen, userName }) => {
    const socketData = sockets[socket.id];

    if (socketData.lastRoom) {
      const serverMessage = {
        userName: 'Server',
        message: `***** ${userName} left Room ${socketData.lastRoom} *****`,
      };
      LAST_MESSAGES[socketData.lastRoom].push(serverMessage);
      io.sockets.in(socketData.lastRoom).emit('message', [serverMessage]);
      socket.leave(socketData.lastRoom);
    }
    sockets = { ...sockets, [socket.id]: { socket, lastRoom: roomChosen } };
    socket.join(roomChosen);
    io.sockets
      .in(roomChosen)
      .emit('welcomeMessage', `Welcome in ${roomChosen} room`);
    socket.emit('message', LAST_MESSAGES[roomChosen]);
    const serverMessage = {
      userName: 'Server',
      message: `***** ${userName} join Room ${roomChosen} *****`,
    };
    LAST_MESSAGES[roomChosen].push(serverMessage);
    io.sockets.in(roomChosen).emit('message', [serverMessage]);
    socket.emit('roomIsChanged', roomChosen);
  });

  socket.on('newMessage', message => {
    const socketData = sockets[socket.id];
    LAST_MESSAGES[socketData.lastRoom].push(message);
    io.sockets.in(socketData.lastRoom).emit('message', [message]);
  });
});

server.listen(8080, () => console.log('server started'));
