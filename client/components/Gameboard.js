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
    height: '100%',
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
    width: '200px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-start',
  },
  opponentSprites: {
    maxWidth: '100%',
    width: '185px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-end',
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
    opponentName,
    isTurn,
    role,
    matchId,
  } = props;

  const [opponentMovesLoaded, setOpponentMovesLoaded] = useState(false);

  useEffect(() => {
    listenForOpponentMoves();
  }, []);

  function listenForOpponentMoves() {
    // const match = 'Match1';
    // const opponent = 'player2';
    //firebase looking for updates to this match
    console.log(isTurn);
    const dbUpdates = FIREDB.ref(`Match/${matchId}/moves/${opponentName}`);
    console.log(matchId, opponentName);
    dbUpdates.limitToLast(1).on('value', (snapshot) => {
      console.log(snapshot);
      const newMoves = snapshot.val();
      console.log(newMoves);
      if (newMoves) {
        const moves = Object.values(newMoves)[0];
        if (role === 'guest') {
          applyMoves(moves, chosenPokemon, opponentPokemon);
          changeTurns();
          // if (
          //   chosenPokemon.length > 0 &&
          //   opponentMovesLoaded == false &&
          //   !isTurn
          // ) {
          //   setOpponentMovesLoaded(true);
          //   getOpponentMoves(newMoves);
          //   applyMoves(newMoves, chosenPokemon, opponentPokemon);
          //   changeTurns();
          // }
        } else if (role === 'host') {
          getOpponentMoves(moves);
          changeTurns();
        }
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
  return (
    <div>
      {opponentPokemon ? (
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
                      // src={pk.sprites.front_default}
                      src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pk.name}.gif`}
                      alt={pk.name}
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
                      // src={pk.sprites.back_default}
                      src={`https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pk.name}.gif`}
                      alt={pk.name}
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
      ) : (
        <div>please wait</div>
      )}
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
    applyMoves: (newMoves, plyrPk, oppPk) =>
      dispatch(applyMoves(newMoves, plyrPk, oppPk)),
    resetPlayerPokemon: () => dispatch(_selectedPlayerPokemon({})),
  };
};

export default connect(mapState, mapDispatch)(Gameboard);
