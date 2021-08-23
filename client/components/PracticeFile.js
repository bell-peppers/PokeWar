import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import firebase from '../../utils/firebase';
import { damageClass } from '../../utils/TypeEffectiveness';

export default function temp(props) {
  const [name, setName] = useState('');
  const [Trainers, setTrainers] = useState([]);
  const [moveData, setMoveData] = useState({});
  const [moveOne, setMoveOne] = useState('');
  const [target, setTarget] = useState('');

  const onSubmit = (evt) => {
    evt.preventDefault;
    setMoveData(damageClass(moveOne, target));
  };

  // //gets trainers from the database and puts them into an array,
  // useEffect(() => {
  //   const trainerRef = firebase.database().ref('Trainers');
  //   trainerRef.on('value', (snapshot) => {
  //     const trainers = snapshot.val();
  //     let AllTrainers = [];
  //     for (let id in trainers) {
  //       AllTrainers.push({ id, ...trainers[id] });
  //     }
  //     console.log(AllTrainers);
  //     setTrainers(AllTrainers);
  //   });
  // }, []);

  // const HandleChange = (evt) => {
  //   setName(evt.target.value);
  // };

  // //creates a trainer in the database
  // const createTrainer = () => {
  //   const trainerRef = firebase.database().ref('Trainers');
  //   const Trainer = {
  //     name,
  //     numOfPokemon: 0,
  //   };

  //   trainerRef.push(Trainer);
  //   setName('');
  // };

  // const Delete = (user) => {
  //   const trainerRef = firebase.database().ref('Trainers').child(user.id);
  //   trainerRef.remove();
  // };

  // const Increment = (user) => {
  //   const trainerRef = firebase.database().ref('Trainers').child(user.id);
  //   trainerRef.update({ numOfPokemon: user.numOfPokemon + 1 });
  // };

  return (
    <div>
      {/* <h1>THIS BETTER WORK!</h1>

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
      })} */}
      <form onSubmit={onSubmit} style={{ display: 'inline-block' }}>
        <input
          type='text'
          value={moveOne}
          onChange={(evt) => {
            setMoveOne(evt.target.value);
          }}
        />
        <input
          type='text'
          value={target}
          onChange={(evt) => {
            setTarget(evt.target.value);
          }}
        />
        <Button variant='outlined' type='submit'>
          Get Stats
        </Button>
      </form>

      <div>{moveData.damage}</div>
      <div>{moveData.class}</div>
    </div>
  );
}
