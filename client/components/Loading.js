import {CircularProgress} from '@material-ui/core';
import React from 'react';

const Loading = () => {
  return (
    <div
      style={{
        alignContent: 'center',
        marginTop: '300px',
        height: '85vh',
      }}
    >
      <img
        src='https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif'
        alt='Pikachu'
        style={{
          height: '100px',
          width: '100px',
          marginLeft: '50px',
        }}
      />
      <div style={{fontSize: '40px', fontFamily: 'Optima'}}>
        Loading <CircularProgress />
      </div>
    </div>
  );
};

export default Loading;
