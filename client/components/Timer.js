import React from 'react';
import calculateTurn from '../../utils/calculateTurn';
import {connect} from 'react-redux';
import {applySingleMove} from '../store/pokemon';
import {sendPlayerMoves, getPlayerMoves} from '../store/game';
import {winCheck} from '../../utils/calculateTurn';
import {
  _clearPlayerTurn,
  _clearAttackedPokemon,
  _setCalculatedAttacks,
} from '../store/playerTurn';

import UIfx from 'uifx';
const completeTurnSound = new UIfx('sounds/completeTurn.wav', {volume: 1});
const errSound = new UIfx('sounds/error.wav', {volume: 1});

const CountDownTimer = ({
  minSecs,
  isTurn,
  changeTurns,
  matchId,
  user,
  soundOn,
  role,
  playerTurn,
  opponentMoves,
  opponentPokemon,
  chosenPokemon,
  sendMoves,
  clearAttackedPokemon,
  clearPlayerTurn,
  setCalculatedAttacks,
  applySingleMove,
  clearOpponentMoves,
  opponent,
  setWinner,
}) => {
  const {minutes = 0, seconds = 60} = minSecs;
  const [[mins, secs], setTime] = React.useState([minutes, seconds]);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      completeTurnHandler();
    } else if (mins === 0 && secs === 0) {
      setTime([59, 59]);
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    if (isTurn) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    } else {
      reset();
    }
  }, [isTurn, mins, secs]);

  async function completeTurnHandler() {
    if (playerTurn.length > 0 || opponentMoves.length > 0) {
      if (role === 'guest') {
        if (soundOn) {
          completeTurnSound.play();
        }
        sendMoves(playerTurn, user.username, matchId);
      } else if (role === 'host') {
        //make sure we have moves
        if (opponentMoves) {
          if (soundOn) {
            completeTurnSound.play();
          }
          const thisTurn = calculateTurn(playerTurn, opponentMoves);
          setCalculatedAttacks(thisTurn);
          await sendMoves(thisTurn, user.username, matchId);
          //apply
          thisTurn.map((move, index) => {
            setTimeout(() => {
              applySingleMove(
                move,
                chosenPokemon,
                opponentPokemon,
                user.username,
                soundOn
              );

              if (index === thisTurn.length - 1) {
                // animatePk(null);
                // animateOppPk(null);
                checkForEndGame();
              }
            }, 2000 * index);
          });
        }
      }
      changeTurns();
      clearPlayerTurn();
      clearAttackedPokemon();
      clearOpponentMoves();
    } else {
      if (soundOn) {
        errSound.play();
      }
      await sendMoves([{skipped: true}], user.username, matchId);
      changeTurns();
    }
  }

  async function checkForEndGame() {
    if (winCheck(chosenPokemon, opponentPokemon)) {
      await setWinner(chosenPokemon, user, opponent.username);
      // alert(`${winner} wins!`);
      history.push('/post');
    }
  }

  return (
    <div
      style={{
        // borderStyle: 'solid',
        // borderWidth: '2px',
        borderRadius: '15px',
        // borderColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        marginTop: '10px',
        height: '55px',
        padding: '10px',
      }}
    >
      <h1>{`${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`}</h1>
    </div>
  );
};

const mapState = (state) => {
  return {
    opponentMoves: state.game.opponentMoves,
    playerTurn: state.playerTurn.playerTurn,
    opponentPokemon: state.pokemon.opponentPokemon,
    chosenPokemon: state.pokemon.chosenPokemon,
  };
};
const mapDispatch = (dispatch) => {
  return {
    sendMoves: (moves, user, matchId) =>
      dispatch(sendPlayerMoves(moves, user, matchId)),
    clearPlayerTurn: () => dispatch(_clearPlayerTurn()),
    clearAttackedPokemon: () => dispatch(_clearAttackedPokemon()),
    setCalculatedAttacks: (turn) => dispatch(_setCalculatedAttacks(turn)),
    clearOpponentMoves: () => dispatch(getPlayerMoves([])),
    applySingleMove: (move, playerPk, oppPk, username, soundOn) =>
      dispatch(applySingleMove(move, playerPk, oppPk, username, soundOn)),
  };
};
export default connect(mapState, mapDispatch)(CountDownTimer);
