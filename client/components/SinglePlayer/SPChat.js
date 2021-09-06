import React, {useState, useEffect, useRef} from 'react';
import firebase, {FIREDB} from '../../../utils/firebase';
import {Input, Button} from '@material-ui/core';
import {Feedback, FeedbackRounded} from '@material-ui/icons';

const SPChat = (props) => {
  const messageEnd = useRef(null);
  const [messages, setMessages] = useState([]);

  const {feed} = props;

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
    setMessages([...messages, feed[0]]);
  }, [feed]);

  useEffect(() => {
    if (messageEnd) {
      messageEnd.current.addEventListener('DOMNodeInserted', (event) => {
        const {currentTarget: target} = event;
        target.scroll({top: target.scrollHeight, behavior: 'smooth'});
      });
    }
    setMessages(instructions);
  }, []);

  return (
    <div className='chat'>
      <div className='messages' ref={messageEnd}>
        {messages.map(({user, message, type}, i) =>
          type === 'feed' ? (
            <div key={i} className='feed'>
              {message}
            </div>
          ) : type === 'instructions' ? (
            <div key={i} className='instructions'>
              {message}
            </div>
          ) : (
            <div key={i} className='message'>
              <h4>{user}</h4>
              <p>{message}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SPChat;
