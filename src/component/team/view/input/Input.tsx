import React from 'react';
import styled from 'styled-components';

const Input = ({ setMessage, sendMessage, message }) => (
  <S.Form>
    <S.Input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === 'Enter' ? sendMessage(event) : null
      }
    />
    <S.Button onClick={(e) => sendMessage(e)}>Send</S.Button>
  </S.Form>
);

const S: any = {};

S.Form = styled.form`
  display: flex;
  border-top: 2px solid #d3d3d3;
`;

S.Input = styled.input`
  border: none;
  border-radius: 0;
  padding: 5%;
  width: 80%;
  font-size: 1.2em;

  &:focus {
    outline: none;
  }
`;

S.Button = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 20px;
  display: inline-block;
  border: none;
  width: 20%;
`;

export default Input;
