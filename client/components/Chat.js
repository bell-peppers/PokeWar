import React, { useState, useEffect, useRef } from 'react';
import firebase, { FIREDB } from '../../utils/firebase';
import { Input, Button } from '@material-ui/core';

const Chat = props => {
  const messageEnd = useRef(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  // const [round, setRound] = useState(1);
  const { feed, user, opponent, matchId, role } = props;

  useEffect(() => {
    if (messageEnd) {
      messageEnd.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    const messageRef = FIREDB.ref(`Match/${matchId}/messages`);
    let swearCounter = 0;
    messageRef.on('value', snapshot => {
      let allMessages = [];
      const messages = snapshot.val();
      const swear =
        /\b((f{1,10}u{1,20}c{1,10}k{1,10}i{1,20}n{1,10}g{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}e{1,10}d{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}e{1,10}r{1,10}){1,5}|s{1,10}h{1,10}i{1,10}t{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}){1,5}|(a{1,10}s{1,10}s{1,10}){1,5}|(b{1,10}i{1,20}t{1,10}c{1,10}h{1,10}){1,5}|(t{1,10}w{1,20}a{1,10}t{1,10}){1,5}|(c{1,10}u{1,20}n{1,10}t{1,10}){1,5}|(c{1,10}o{1,20}c{1,10}k{1,10}){1,5}|(d{1,10}i{1,20}c{1,10}k{1,10}){1,5}\b/gi;
      for (let id in messages) {
        if (
          messages[id].message.match(
            /\b((f{1,10}u{1,20}c{1,10}k{1,10}i{1,20}n{1,10}g{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}e{1,10}d{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}e{1,10}r{1,10}){1,5}|s{1,10}h{1,10}i{1,10}t{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}){1,5}|(a{1,10}s{1,10}s{1,10}){1,5}|(b{1,10}i{1,20}t{1,10}c{1,10}h{1,10}){1,5}|(t{1,10}w{1,20}a{1,10}t{1,10}){1,5}|(c{1,10}u{1,20}n{1,10}t{1,10}){1,5}|(c{1,10}o{1,20}c{1,10}k{1,10}){1,5}|(d{1,10}i{1,20}c{1,10}k{1,10}){1,5}\b/gi
          )
        ) {
          swearCounter++;
          const swearMessageLength = messages[id].message
            .match(swear)
            .reduce((total, curr) => {
              return (total += curr.length);
            }, 0);
          const noSwearMessage = messages[id].message.replace(
            swear,
            '*'.repeat(swearMessageLength)
          );
          allMessages.push({
            id,
            user: messages[id].user,
            message: noSwearMessage,
          });
          console.log(swearCounter);
          if (swearCounter === 15) {
            allMessages.push({
              user: 'admin',
              message: 'Please watch your language',
            });
            swearCounter = 0;
          }
        } else {
          allMessages.push({ id, ...messages[id] });
        }
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

    attackFeed.map(feed => {
      setTimeout(() => {
        messageRef.push(feed);
      }, 1000);
    });
  }

  return (
    <div className='chat'>
      <div className='messages' ref={messageEnd}>
        {messages.map(({ id, user, message, type }) =>
          type ? (
            <div key={id} className='feed'>
              {message}
            </div>
          ) : (
            <div key={id} className='message'>
              <h4>{user}</h4>
              <p>{message}</p>
            </div>
          )
        )}
      </div>

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
