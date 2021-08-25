import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import firebase, { FIREDB } from '../../utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Input, Button } from '@material-ui/core';

const auth = firebase.auth();
const firestore = firebase.firestore();

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const messageRef = FIREDB.ref('Match/-MhprQDsdLsk5tzwWn2H/messages');

    messageRef.on('value', snapshot => {
      const messages = snapshot.val();
      console.log(messages);
      let allMessages = [];
      for (let id in messages) {
        allMessages.push({ id, ...messages[id] });
      }
      setMessages(allMessages);
      console.log(allMessages);
    });
  }, []);

  async function sendMessage(e) {
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
    <div>
      <h1>CHAT</h1>
      {messages.map(({ id, user, message }) => (
        <div key={id}>
          <h4>{user}</h4>
          <p>{message}</p>
        </div>
      ))}

      <form onSubmit={e => sendMessage(e)}>
        <Input
          value={msg}
          type='text'
          onChange={e => setMsg(e.target.value)}
          placeholder='Messsage...'
        />
        <Button type='submit'>Send</Button>
      </form>
    </div>
  );
};

export default Chat;
