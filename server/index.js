const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let sockets = {};
const lastMessages = { bleue: [], verte: [], rouge: [], jaune: [] };

const rooms = ['bleue', 'verte', 'rouge', 'jaune'];

io.on('connection', socket => {
  sockets = { ...sockets, [socket.id]: { socket, lastRoom: null } };

  socket.emit('roomsList', rooms);

  socket.on('roomChosen', ({ roomChosen, userName }) => {
    const socketData = sockets[socket.id];

    if (socketData.lastRoom) {
      const serverMessage = {
        userName: 'Server',
        message: `***** ${userName} left Room ${socketData.lastRoom} *****`,
      };
      lastMessages[socketData.lastRoom].push(serverMessage);
      lastMessages[socketData.lastRoom].slice(1, 5);
      io.sockets.in(socketData.lastRoom).emit('message', [serverMessage]);
      socket.leave(socketData.lastRoom);
    }
    sockets = { ...sockets, [socket.id]: { socket, lastRoom: roomChosen } };
    socket.join(roomChosen);
    io.sockets
      .in(roomChosen)
      .emit('welcomeMessage', `Bienvenue dans la room ${roomChosen}`);
    socket.emit('message', lastMessages[roomChosen]);
    const serverMessage = {
      userName: 'Server',
      message: `***** ${userName} join Room ${roomChosen} *****`,
    };
    lastMessages[roomChosen].push(serverMessage);
    lastMessages[roomChosen].slice(1, 5);
    io.sockets.in(roomChosen).emit('message', [serverMessage]);
    socket.emit('roomIsChanged', roomChosen);
  });

  socket.on('newMessage', message => {
    const socketData = sockets[socket.id];
    lastMessages[socketData.lastRoom].push(message);
    lastMessages[socketData.lastRoom].slice(1, 5);
    io.sockets.in(socketData.lastRoom).emit('message', [message]);
  });
});

server.listen(8080, () => console.log('server started'));
