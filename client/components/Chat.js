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
    FIREDB.collection('messages')
      .orderBy('createdAt')
      .limit(50)
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()));
        console.log(snapshot.docs);
      });
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await db.collection('messages').add({
      text: msg,
      photoURL,
      uid,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMsg('');
  }

  return (
    <div>
      <h1>CHAT</h1>
      {messages.map(({ id, uid, text, photoURL }) => (
        <div
          key={id}
          className={`msg ${
            uid === auth.currentUser.uid ? 'sent' : 'received'
          }`}
        >
          <img src={photoURL} alt='avatar' />
          <p>{text}</p>
        </div>
      ))}

      <form onSubmit={sendMessage}>
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
