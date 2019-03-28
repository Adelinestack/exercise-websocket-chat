import { addNewMessage } from './messages';

const newMessage = ['Salut'];

test(`should return the message list with the added message`, () => {
  const prevState = { messages: [] };
  const newState = { messages: ['Salut'] };
  expect(addNewMessage(newMessage)(prevState)).toEqual(newState);
});

test(`should limit message list size to 10`, () => {
  const prevState = {
    messages: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  };
  const newState = {
    messages: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Salut'],
  };
  expect(addNewMessage(newMessage)(prevState)).toEqual(newState);
});
