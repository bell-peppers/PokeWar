import React, {useState, useEffect, useRef} from 'react';
import firebase, {FIREDB} from '../../utils/firebase';
import {Input, Button} from '@material-ui/core';

const Chat = (props) => {
  const messageEnd = useRef(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  // const [round, setRound] = useState(1);
  const {feed, user, opponent, matchId, role} = props;

  const instructions = [
    {message: 'Welcome to PokeWar!', type: 'instructions'},
    {message: "Here's how to play:", type: 'instructions'},
    {
      message:
        'First, select one of your pokemon by clicking on one of the bottom-left cards',
      type: 'instructions',
    },
    {
      message:
        "Once selected, you can click to choose which attack you'd like to perform.",
      type: 'instructions',
    },
    {
      message:
        "Once you have an attack selected, click on one of your opponent's active Pokemon to attack it.",
      type: 'instructions',
    },
    {
      message:
        "Repeat this once for each of your active Pokemon. When done and when it's your turn, click complete turn.",
      type: 'instructions',
    },
    {
      message:
        "The object of the game is to defeat all of your opponent's Pokemon.",
      type: 'instructions',
    },
    {message: 'Happy Battling!', type: 'instructions'},
  ];

  useEffect(() => {
    if (messageEnd) {
      messageEnd.current.addEventListener('DOMNodeInserted', (event) => {
        const {currentTarget: target} = event;
        target.scroll({top: target.scrollHeight, behavior: 'smooth'});
      });
    }
    const messageRef = FIREDB.ref(`Match/${matchId}/messages`);
    if (role === 'host') {
      instructions.forEach((line) => {
        messageRef.push(line);
      });
    }
  }, []);

  useEffect(() => {
    const messageRef = FIREDB.ref(`Match/${matchId}/messages`);
    let swearCounter = 0;
    messageRef.on('value', (snapshot) => {
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
          allMessages.push({id, ...messages[id]});
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

    attackFeed.map((feed) => {
      setTimeout(() => {
        messageRef.push(feed);
      }, 1000);
    });
  }

  return (
    <div className='chat'>
      <div className='messages' ref={messageEnd}>
        {messages.map(({id, user, message, type}) =>
          type === 'feed' ? (
            <div key={id} className='feed'>
              {message}
            </div>
          ) : type === 'instructions' ? (
            <div key={id} className='instructions'>
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
