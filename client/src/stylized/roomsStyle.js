import styled from 'styled-components';

export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    color: #fff;
  }
  margin-bottom: 30px;
`;

export const Room = styled.button`
  margin-left: 5px;
  padding: 10px 5px;
  border-radius: 3px;
  border: 1px solid #98ccc9;
  background-color: #fff;
`;
