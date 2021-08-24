import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import firebase from '../../utils/firebase';
// import { damageClass } from '../../utils/TypeEffectiveness';
import { calcDamage } from '../../utils/DmgCalculations';
import allPokemon, { fetchPokemon } from '../store/allPokemon';
import { PokemonOrder } from '../../utils/orderCalculation';

export default function temp(props) {
  // const [name, setName] = useState('');
  // const [Trainers, setTrainers] = useState([]);
  const pokemon = useSelector((state) => state.allPokemon);
  const [pokemonOne, setPokemonOne] = useState('pikachu');
  const [pokemonTwo, setPokemonTwo] = useState('charizard');
  const [moveOne, setMoveOne] = useState('thunder-punch');
  const [Stats, setStats] = useState({});
  const [sortedPokemon, setSortedPokemon] = useState(pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const attacker = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonOne}`
      );

      const move = await axios.get(
        `https://pokeapi.co/api/v2/move/${moveOne}/`
      );

      const target = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonTwo}`
      );

      setStats(calcDamage(move.data, target.data, attacker.data));
      // setPokemonOne('');
      // setPokemonTwo('');
      const data = PokemonOrder([...pokemon]);
      console.log('data ==>', data);
      setSortedPokemon(data);
    } catch (error) {
      console.log(error);
      return setStats({ error: 'invalid pokemon or moves' });
    }
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
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          type='text'
          value={pokemonOne}
          placeholder='ATTACKER'
          onChange={(evt) => {
            setPokemonOne(evt.target.value);
          }}
        />
        <input
          type='text'
          placeholder='MOVE'
          value={moveOne}
          onChange={(evt) => {
            setMoveOne(evt.target.value);
          }}
        />
        <input
          type='text'
          value={pokemonTwo}
          placeholder='TARGET'
          onChange={(evt) => {
            setPokemonTwo(evt.target.value);
          }}
        />
        <Button variant='outlined' type='submit'>
          Get Stats
        </Button>
      </form>
      {/* {console.log(Stats)} */}
      <div>{Stats.Damage}</div>
      {Stats.isCrit && <div>CRITICAL HIT!</div>}
      <div>{Stats.Class}</div>
      <div style={{ color: 'red', textAlign: 'center' }}>{Stats.error}</div>
      <div>===============================================</div>
      {pokemon.map((poke) => {
        return <div key={poke.id}>{poke.name}</div>;
      })}
      <div>=========================================</div>
      {sortedPokemon[0] &&
        sortedPokemon.map((poke) => {
          return <div key={poke.id}>{poke.name}</div>;
        })}
    </div>
  );
}
