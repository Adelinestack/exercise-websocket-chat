const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const sockets = [];
const lastMessages = [];

const rooms = ['bleue', 'vert', 'rouge', 'jaune'];

io.on('connection', socket => {
  sockets.push(socket);
  socket.emit('roomsList', rooms);
  socket.on('roomChosen', roomChosen => {
    socket.join(roomChosen);
    io.sockets
      .in(roomChosen)
      .emit('welcomeMessage', `Bienvenue dans la room ${roomChosen}`);
    io.sockets.in(roomChosen).emit('message', lastMessages);
    socket.on('newMessage', message => {
      if (lastMessages.length < 5) {
        lastMessages.push(message);
      } else {
        lastMessages.shift();
        lastMessages.push(message);
      }
      io.sockets.in(roomChosen).emit('message', [message]);
    });
  });
});

server.listen(8080, () => console.log('server started'));
