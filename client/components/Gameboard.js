import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import {applyOpponentMoves, attackOpponent} from '../store/pokemon';
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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
  },
  opponentSide: {
    height: '50%',
    backgroundColor: 'purple',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
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
    width: '32%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  },
  hp: {
    fontSize: '30px',
  },
}));

const Gameboard = (props) => {
  const classes = useStyles();
  const {
    opponentPokemon,
    playerPokemon,
    resetAttack,
    selectAttacked,
    getOpponentMoves,
    applyOpponentMoves,
    selectedPlayerPk,
    playerAttack,
    resetPlayerPokemon,
  } = props;

  const [opponentMovesLoaded, setOpponentMovesLoaded] = useState(false);

  useEffect(() => {
    listenForOpponentMoves();
  }, [playerPokemon]);

  function listenForOpponentMoves() {
    const match = 'Match1';
    const opponent = 'player2';
    //firebase looking for updates to this match
    const dbUpdates = FIREDB.ref(`Match/${match}/moves/${opponent}`);
    dbUpdates.limitToLast(1).on('child_added', (snapshot) => {
      const newMoves = snapshot.val();

      if (playerPokemon.length > 0 && opponentMovesLoaded == false) {
        setOpponentMovesLoaded(true);
        getOpponentMoves(newMoves);
        applyOpponentMoves(newMoves, playerPokemon);
      }
    });
  }

  function clickHandle(pk) {
    if (playerAttack && selectedPlayerPk) {
      selectAttacked(pk.name, playerAttack.attack, selectedPlayerPk.name);
      console.log(
        `${selectedPlayerPk.name} will use ${playerAttack.attack.move.name} on ${pk.name}`
      );
      resetAttack();
      resetPlayerPokemon();
    }
  }

  return (

    <div className={classes.main}>
      <div className={classes.opponentSide}>
        <div className={classes.playerName}>
          <h1>Opponent</h1> {console.log(playerPokemon)}
        </div>
        {opponentPokemon.length > 0 &&
          opponentPokemon.map((pk) => {
            return (
              <div
                className={classes.pokemonContainer}
                key={pk.id}
                onClick={() => clickHandle(pk)}
              >
                <img className={classes.opponentSprites} src={pk.frontImg} />
                <p className={classes.hp}>hp: {pk.stats.hp}</p>
              </div>
            );
          })}
      </div>
      <div className={classes.playerSide}>
        {playerPokemon.length > 0 &&
          playerPokemon.map((pk) => {
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
          <h1>Player </h1>
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
    applyOpponentMoves: (oppMoves, pk) =>
      dispatch(applyOpponentMoves(oppMoves, pk)),
    resetPlayerPokemon: () => dispatch(_selectedPlayerPokemon({})),
  };
};

export default connect(mapState, mapDispatch)(Gameboard);
