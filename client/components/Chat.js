import React, {useState, useEffect, useRef} from 'react';
// import 'firebase/firestore';
// import 'firebase/auth';
import firebase, {FIREDB} from '../../utils/firebase';
import {Input, Button} from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const {feed, user, opponent, matchId, role} = props;

  console.log(user);
  console.log(opponent);

  useEffect(() => {
    const messageRef = FIREDB.ref(`Match/${matchId}/messages`);

    messageRef.on('value', (snapshot) => {
      const messages = snapshot.val();
      let allMessages = [];
      for (let id in messages) {
        allMessages.push({id, ...messages[id]});
      }
      setMessages(allMessages);
    });
    if (role === 'host') {
      sendFeed(feed);
    }
  }, [feed]);

  function sendMessage(e) {
    e.preventDefault();

    const messageRef = FIREDB.ref(`Match/${matchId}/messages`);
    const Message = {
      user: user.username,
      message: msg,
    };

    messageRef.push(Message);
    setMsg('');
  }

  function sendFeed(attackFeed) {
    const messageRef = firebase.database().ref(`Match/${matchId}/messages`);

    attackFeed.map((feed) => {
      setTimeout(() => {
        messageRef.push(feed);
      }, 1000);
    });
  }

  return (
    <div className='chat'>
      <ScrollToBottom className='messages' behavior='smooth'>
        {messages.map(({id, user, message}) => (
          <div key={id} className='message'>
            <h4>{user}</h4>
            <p>{message}</p>
          </div>
        ))}
      </ScrollToBottom>

      <form onSubmit={(e) => sendMessage(e)}>
        <Input
          value={msg}
          type='text'
          onChange={(e) => setMsg(e.target.value)}
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
