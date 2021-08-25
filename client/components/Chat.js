import React, { useState, useEffect, useRef } from 'react';
// import 'firebase/firestore';
// import 'firebase/auth';
import firebase, { FIREDB } from '../../utils/firebase';
import { Input, Button } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const messageRef = FIREDB.ref('Match/-MhprQDsdLsk5tzwWn2H/messages');

    messageRef.on('value', snapshot => {
      const messages = snapshot.val();
      let allMessages = [];
      for (let id in messages) {
        allMessages.push({ id, ...messages[id] });
      }
      setMessages(allMessages);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();

    const messageRef = firebase
      .database()
      .ref('Match/-MhprQDsdLsk5tzwWn2H/messages');
    const Message = {
      user: 'test',
      message: msg,
    };

    messageRef.push(Message);
    setMsg('');
  }

  return (
    <div className='chat'>
      <ScrollToBottom className='messages'>
        {messages.map(({ id, user, message }) => (
          <div key={id} className='message'>
            <h4>{user}</h4>
            <p>{message}</p>
          </div>
        ))}
      </ScrollToBottom>

      <form onSubmit={e => sendMessage(e)}>
        <Input
          value={msg}
          type='text'
          onChange={e => setMsg(e.target.value)}
          placeholder='Enter message here'
        />
        <Button type='submit' disabled={!msg}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
