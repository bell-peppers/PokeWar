import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import {fetchPlayerOnePokemon} from '../store/pokemon';

const playerOnePokemon = [
  {
    name: 'p1',
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
    moves: [
      {
        move: 'bodyslam',
        damage: 5,
      },
      {
        move: 'blizzard',
        damage: 25,
      },
      {
        move: 'hydro-pump',
        damage: 15,
      },
    ],
    stats: {'hp': 60},
  },
  {
    name: 'p2',
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png',
    moves: [
      {
        move: 'bodyslam',
        damage: 5,
      },
      {
        move: 'rage',
        damage: 25,
      },
      {
        move: 'skull-bash',
        damage: 15,
      },
    ],
    stats: {'hp': 50},
  },
  {
    name: 'p3',
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/94.png',
    moves: [
      {
        move: 'mega-punch',
        damage: 5,
      },
      {
        move: 'fire-punch',
        damage: 25,
      },
      {
        move: 'head-butt',
        damage: 15,
      },
    ],
    stats: {'hp': 40},
  },
];

const playerTwoPokemon = [
  {
    name: 'p1',
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png',
    moves: [
      {
        move: 'bodyslam',
        damage: 5,
      },
      {
        move: 'blizzard',
        damage: 25,
      },
      {
        move: 'hydro-pump',
        damage: 15,
      },
    ],
    stats: {'hp': 60},
  },
  {
    name: 'p2',
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png',
    moves: [
      {
        move: 'bodyslam',
        damage: 5,
      },
      {
        move: 'rage',
        damage: 25,
      },
      {
        move: 'skull-bash',
        damage: 15,
      },
    ],
    stats: {'hp': 50},
  },
  {
    name: 'p3',
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png',
    moves: [
      {
        move: 'mega-punch',
        damage: 5,
      },
      {
        move: 'fire-punch',
        damage: 25,
      },
      {
        move: 'head-butt',
        damage: 15,
      },
    ],
    stats: {'hp': 40},
  },
];

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'yellow',
    width: '100%',
    height: '75%',
    justifyContent: 'flex-end',
  },
  playerSide: {
    height: '50%',
    backgroundColor: 'orange',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  opponentSide: {
    height: '50%',
    backgroundColor: 'purple',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  playerSprites: {
    maxWidth: '100%',
    width: '250px',
    height: 'auto',
    objectFit: 'contain',
    alignSelf: 'flex-end',
  },
  opponentSprites: {
    maxWidth: '100%',
    width: '225px',
    height: 'auto',
    objectFit: 'contain',
    alignSelf: 'flex-start',
  },
  pokemonContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  playerName: {
    position: 'absolute',
    display: 'flex',
    height: '50px',
    width: '250px',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    // borderWidth: "1px",
    // borderStyle: "solid",
    // borderColor: "black",
  },
}));

const Gameboard = (props) => {
  const classes = useStyles();
  const {getPlayerPokemon, playerPokemon} = props;
  useEffect(() => {
    if (playerPokemon.length === 0) {
      getPlayerPokemon();
    }
  });
  return (
    <div className={classes.main}>
      <div className={classes.opponentSide}>
        <div className={classes.playerName}>
          <h1>Opponent</h1>
        </div>
        <div className={classes.pokemonContainer}>
          <img
            className={classes.opponentSprites}
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png'
          />
        </div>
        <div className={classes.pokemonContainer}>
          <img
            className={classes.opponentSprites}
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png'
          />
        </div>
        <div className={classes.pokemonContainer}>
          <img
            className={classes.opponentSprites}
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png'
          />
        </div>
      </div>
      <div className={classes.playerSide}>
        {playerPokemon.length > 0 &&
          playerPokemon.map((pk) => {
            return (
              <div className={classes.pokemonContainer} key={pk.key}>
                <img className={classes.playerSprites} src={pk.imgUrl} />
              </div>
            );
          })}
        <div className={classes.playerName}>
          <h1>Player </h1>
        </div>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    playerPokemon: state.pokemon.playerOnePokemon,
  };
};

const mapDispatch = (dispatch) => {
  return {getPlayerPokemon: () => dispatch(fetchPlayerOnePokemon())};
};

export default connect(mapState, mapDispatch)(Gameboard);
