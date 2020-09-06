import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import TextContainer from '../textcontainer/TextContainer';
import Messages from '../messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../input/Input';

let socket;

const Chat = ({ initName, initRoom }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = process.env.SOCKET_SERVER_URL;

  useEffect(() => {
    socket = io(ENDPOINT);

    setRoom(initRoom);
    setName(initName);

    console.log(initRoom, initName);
    socket.emit('join', { name: initName, room: initRoom }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, initRoom, initName]);

  useEffect(() => {
    if (initName && initRoom) {
      socket.on('message', (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on('roomData', ({ users }) => {
        setUsers(users);
      });
    }
  }, [initName, initRoom]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
