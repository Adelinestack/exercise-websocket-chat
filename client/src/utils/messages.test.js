import { addNewMessage } from './messages';

const newMessage = ['Salut'];

test(`addNewMessage with new message 'Salut' and  prev state with prev messages, return a new array with prev messages and new message`, () => {
  const prevState = { messages: [] };
  const newState = { messages: ['Salut'] };
  expect(addNewMessage(newMessage)(prevState)).toEqual(newState);
});

test(`addNewMessage with new message 'Salut' and  prev state with 10 prev messages, return a new array with prev messages minus the first message and new message`, () => {
  const prevState = {
    messages: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  };
  const newState = {
    messages: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Salut'],
  };
  expect(addNewMessage(newMessage)(prevState)).toEqual(newState);
});
