export const addNewMessage = newMessage => prevState => {
  if (prevState.messages.length >= 10) {
    return { messages: [...prevState.messages.slice(1, 10), ...newMessage] };
  }
  return { messages: [...prevState.messages, ...newMessage] };
};
