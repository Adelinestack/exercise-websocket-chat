import styled from 'styled-components';

export const RoomName = styled.h2`
  color: #fff;
`;

export const Messages = styled.div`
  background: #fff;
  padding: 20px;
  margin: 20px;
  text-align: left;
`;

export const InputChat = styled.div`
  padding: 20px;
  & input {
    width: 70%;
    padding: 10px;
    border: 1px solid #98ccc9;
  }
  & button {
    margin-left: 5px;
    padding: 10px 5px;
    border-radius: 3px;
    background-color: #fff;
    border: 1px solid #98ccc9;
  }
`;
