import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import {applyMoves, attackOpponent} from '../store/pokemon';
import {
  selectAttackedPokemon,
  _selectAttack,
  _selectedPlayerPokemon,
} from '../store/playerTurn';
import {getPlayerMoves} from '../store/game';
import {FIREDB} from '../../utils/firebase';

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    height: '75%',
    justifyContent: 'flex-end',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
  },
  playerSide: {
    height: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'black',
  },
  opponentSide: {
    height: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  playerSprites: {
    maxWidth: '100%',
    width: '270px',
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
    flexDirection: 'column',
    width: '32%',
    height: '100%',
    justifyContent: 'center',
  },
  pokemonName: {
    alignText: 'center',
    fontSize: 20,
  },
  playerName: {
    position: 'absolute',
    display: 'flex',
    height: '50px',
    width: '250px',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  hp: {
    fontSize: '20px',
    alignText: 'center',
  },
}));

const Gameboard = (props) => {
  const classes = useStyles();
  const {
    resetAttack,
    selectAttacked,
    getOpponentMoves,
    applyMoves,
    selectedPlayerPk,
    playerAttack,
    resetPlayerPokemon,
    chosenPokemon,
    username,
    opponentPokemon,
    changeTurns,
    opponentName = 'Opponent',
    isTurn,
  } = props;

  const [opponentMovesLoaded, setOpponentMovesLoaded] = useState(false);

  useEffect(() => {
    listenForOpponentMoves();
  }, []);

  function listenForOpponentMoves() {
    const match = 'Match1';
    const opponent = 'player2';
    //firebase looking for updates to this match
    const dbUpdates = FIREDB.ref(`Match/${match}/moves/${opponent}`);
    dbUpdates.limitToLast(1).on('child_added', (snapshot) => {
      const newMoves = snapshot.val();

      if (chosenPokemon.length > 0 && opponentMovesLoaded == false && !isTurn) {
        setOpponentMovesLoaded(true);
        //getOpponentMoves(newMoves);
        //applyMoves(newMoves, chosenPokemon, opponentPokemon);
        //changeTurns();
      }
    });
  }

  function clickHandle(pk) {
    if (playerAttack && selectedPlayerPk) {
      selectAttacked(pk, playerAttack.attack, selectedPlayerPk);
      console.log(
        `${selectedPlayerPk.name} will use ${playerAttack.attack.move.name} on ${pk.name}`
      );
      resetAttack();
      resetPlayerPokemon();
    }
  }
  console.log('opp poke', opponentPokemon);
  return (
    <div className={classes.main}>
      <div className={classes.opponentSide}>
        <div className={classes.playerName}>
          <h1>{opponentName}</h1>
        </div>
        {opponentPokemon &&
          opponentPokemon.map((pk) => {
            return (
              <div
                className={classes.pokemonContainer}
                key={pk.id}
                onClick={() => clickHandle(pk)}
              >
                <p>{pk.name}</p>
                <img
                  className={classes.opponentSprites}
                  src={pk.sprites.front_default}
                />
                <p className={classes.hp}>hp: {pk.stats[0].base_stat}</p>
              </div>
            );
          })}
      </div>
      <div className={classes.playerSide}>
        {chosenPokemon.length > 0 &&
          chosenPokemon.map((pk) => {
            return (
              <div className={classes.pokemonContainer} key={pk.id}>
                <img
                  className={classes.playerSprites}
                  src={pk.sprites.back_default}
                />
                <p className={classes.hp}>hp: {pk.stats[0].base_stat}</p>
              </div>
            );
          })}
        <div className={classes.playerName}>
          <h1>{username}</h1>
        </div>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    opponentMoves: state.game.opponentMoves,
    selectedPlayerPk: state.playerTurn.selectedPlayerPokemon,
    playerAttack: state.playerTurn.playerAttack,
    chosenPokemon: state.pokemon.chosenPokemon,
  };
};

const mapDispatch = (dispatch) => {
  return {
    attackOpponent: (pokemon, attack) =>
      dispatch(attackOpponent(pokemon, attack)),
    resetAttack: () => dispatch(_selectAttack({})),
    selectAttacked: (atkdpk, atk, pk) =>
      dispatch(selectAttackedPokemon(atkdpk, atk, pk)),
    getOpponentMoves: (newMoves) => dispatch(getPlayerMoves(newMoves)),
    applyMoves: (oppMoves, pk) => dispatch(applyMoves(oppMoves, pk)),
    resetPlayerPokemon: () => dispatch(_selectedPlayerPokemon({})),
  };
};

export default connect(mapState, mapDispatch)(Gameboard);
