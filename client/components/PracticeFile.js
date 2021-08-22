import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import firebase from '../../utils/firebase';

export default function temp(props) {
  const [name, setName] = useState('');
  const [Trainers, setTrainers] = useState([]);

  //gets trainers from the database and puts them into an array,
  useEffect(() => {
    const trainerRef = firebase.database().ref('Trainers');
    trainerRef.on('value', (snapshot) => {
      const trainers = snapshot.val();
      let AllTrainers = [];
      for (let id in trainers) {
        AllTrainers.push({ id, ...trainers[id] });
      }
      console.log(AllTrainers);
      setTrainers(AllTrainers);
    });
  }, []);

  const HandleChange = (evt) => {
    setName(evt.target.value);
  };

  //creates a trainer in the database
  const createTrainer = () => {
    const trainerRef = firebase.database().ref('Trainers');
    const Trainer = {
      name,
      numOfPokemon: 0,
    };

    trainerRef.push(Trainer);
    setName('');
  };

  const Delete = (user) => {
    console.log(id);
    const trainerRef = firebase.database().ref('Trainers').child(user.id);
    trainerRef.remove();
  };

  const Increment = (user) => {
    const trainerRef = firebase.database().ref('Trainers').child(user.id);
    trainerRef.update({ numOfPokemon: user.numOfPokemon + 1 });
  };

  return (
    <div>
      <h1>THIS BETTER WORK!</h1>

      <input type='text' onChange={HandleChange} value={name} />
      <Button variant='outlined' onClick={createTrainer}>
        CLICK ME!
      </Button>

      <h1>ALL TRAINERS</h1>
      {Trainers.map((user) => {
        return (
          <div
            key={user.id}
            style={{
              margin: '50px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'baseline',
            }}
          >
            <div>NAME: {user.name}</div>
            <div>POKEMON: {user.numOfPokemon}</div>
            <Button variant='outlined' onClick={() => Delete(user)}>
              DELETE
            </Button>
            <Button variant='outlined' onClick={() => Increment(user)}>
              ADD
            </Button>
          </div>
        );
      })}
    </div>
  );
}
