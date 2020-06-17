import react, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField } from '@material-ui/core';

interface TeamViewProps {}

console.log('socket server', process.env.SOCKET_SERVER_URL);
const socket = io.connect(process.env.SOCKET_SERVER_URL);

export default function TeamView({}: TeamViewProps) {
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);

  const rederChat = () => {
    return chat.map(({ name, message }, index) => {
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>;
    });
  };
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit('message', { name, message });
    setState({ message: '', name });
  };

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });
  return (
    <>
      <div>
        <form onSubmit={onMessageSubmit}>
          <h1>Messager</h1>
          <div className="name-field">
            <TextField
              name="name"
              onChange={(e) => onTextChange(e)}
              value={state.name}
              label="Name"
            ></TextField>
          </div>
          <div>
            <TextField
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            ></TextField>
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {rederChat()}
        </div>
      </div>
    </>
  );
}
