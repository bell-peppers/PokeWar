import { Button } from '@material-ui/core';
import React, { useState } from 'react';

export default function Temp(props) {
  const [sprite, setSprite] = useState('');
  const [spriteBack, setSpriteBack] = useState('');
  const [shinySprite, setShinySprite] = useState('');
  const [shinySpriteBack, setShinySpriteBack] = useState('');
  const [alt, setAlt] = useState('');
  const [pokemon, setPokemon] = useState('');

  const onSubmit = (evt) => {
    evt.preventDefault();
    const normalFront = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon}.gif`; //normal
    const shinyFront = `https://img.pokemondb.net/sprites/black-white/anim/shiny/${pokemon}.gif`; //shiny
    const normalBack = `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pokemon}.gif`; //normal back
    const shinyBack = `https://img.pokemondb.net/sprites/black-white/anim/back-shiny/${pokemon}.gif`;

    setSprite(normalFront);
    setSpriteBack(normalBack);
    setShinySprite(shinyFront);
    setShinySpriteBack(shinyBack);

    let name = pokemon.split('');
    let letter = name.shift().toUpperCase();
    const alternate = [letter, ...name].join('');

    setAlt(alternate);
    setPokemon('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <form onSubmit={onSubmit}>
        <label htmlFor='pokemon'>Choose Your Pokemon</label>
        <input
          type='text'
          value={pokemon}
          onChange={(evt) => {
            setPokemon(evt.target.value);
          }}
          style={{ display: 'block' }}
        />
        <Button variant='outlined' type='submit'>
          Get The Sprite
        </Button>
      </form>
      {sprite[1] ? (
        <div>
          <img src={sprite} alt={alt} />
          <img src={spriteBack} alt={alt} />
        </div>
      ) : null}
      {shinySprite[1] ? (
        <div>
          <img src={shinySprite} alt={alt} />
          <img src={shinySpriteBack} alt={alt} />
        </div>
      ) : null}
    </div>
  );
}
