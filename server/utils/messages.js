const addMessage = (messagesArray, room, message) => {
  messagesArray[room].push(message);
  messagesArray[room].slice(1, 5);
};

module.exports = { addMessage };
