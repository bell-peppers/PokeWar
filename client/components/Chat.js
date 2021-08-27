import React, { useState, useEffect, useRef } from 'react';
// import 'firebase/firestore';
// import 'firebase/auth';
import firebase, { FIREDB } from '../../utils/firebase';
import { Input, Button } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = props => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const { feed, user, opponent } = props;

  console.log(user);
  console.log(opponent);

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

    sendFeed(feed);
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

  const dummyFeed = [
    {
      message:
        'username1 has attacked username2 pokemon, it was super effective!',
    },
    {
      message:
        'username2 has attacked username1 pokemon, it was not effective!',
    },
    { message: 'username1 has attacked username2 pokemon, it was effective!' },
    {
      message: 'username2 has attacked username1 pokemon, it wasnt effective!',
    },
    {
      message:
        'username1 has attacked username2 pokemon, it was super effective!',
    },
  ];

  function sendFeed(attackFeed) {
    const messageRef = firebase
      .database()
      .ref('Match/-MhprQDsdLsk5tzwWn2H/messages');

    attackFeed.map(feed => {
      messageRef.push(feed);
    });
  }

  return (
    <div className='chat'>
      <ScrollToBottom className='messages' behavior='smooth'>
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
