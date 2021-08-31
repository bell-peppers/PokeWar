import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Gameboard from './Gameboard';
import Actionbar from './Actionbar';
import Sidebar from './Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core';
import {
  fetchPlayerOnePokemon,
  fetchOpponentPokemon,
  fetchMovesInfo,
} from '../store/pokemon';
import {setWinner} from '../store/game';
import {_changeTurns} from '../store/playerTurn';

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    backgroundColor: '#F8E8DC',
    borderRadius: '25px',
    width: '100vw',
    height: '100vh',
    maxHeight: '1000px',
    minWidth: '800px',
    justifyContent: 'space-between',
    minHeight: '800px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    marginTop: '65px',
  },
  board: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    height: '100%',
    justifyContent: 'flex-start',
    marginTop: '25px',
  },
  side: {
    width: '25%',
    height: '100%',
  },
}));

const Main = (props) => {
  const {
    opponentPokemon,
    playerPokemon,
    matchId,
    role,
    opponentName,
    changeTurns,
    isTurn,
    user,
    calculatedAttacks,
    winner,
    setWinner,
    soundOn,
  } = props;

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.main}>
        <div className={classes.board}>
          <Gameboard
            playerPokemon={playerPokemon}
            opponentPokemon={opponentPokemon}
            opponentName={opponentName}
            user={user}
            role={role}
            changeTurns={changeTurns}
            isTurn={isTurn}
            matchId={matchId}
            winner={winner}
            setWinner={setWinner}
            soundOn={soundOn}
          />

          <Actionbar
            isTurn={isTurn}
            changeTurns={changeTurns}
            role={role}
            user={user}
            calculatedAttacks={calculatedAttacks}
            matchId={matchId}
            winner={winner}
            setWinner={setWinner}
            opponentName={opponentName}
            soundOn={soundOn}
          />
        </div>
        <div className={classes.side}>
          <Sidebar
            calculatedAttacks={calculatedAttacks}
            matchId={matchId}
            role={role}
          />
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
    opponentPokemon: state.pokemon.opponentPokemon,
    matchId: state.game.matchId,
    role: state.game.role,
    opponentName: state.game.opponentInfo.username,
    isTurn: state.playerTurn.isTurn,
    user: state.userData.user,
    calculatedAttacks: state.playerTurn.calculatedAttacks,
    winner: state.game.winner,
    soundOn: state.userData.soundOn,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlayerPokemon: (pkIds) => dispatch(fetchPlayerOnePokemon(pkIds)),
    fetchOpponentPokemon: (matchId, role) =>
      dispatch(fetchOpponentPokemon(matchId, role)),
    getMoves: (playerPk) => dispatch(fetchMovesInfo(playerPk)),
    changeTurns: () => dispatch(_changeTurns()),
    setWinner: (pk, user, opp) => dispatch(setWinner(pk, user, opp)),
  };
};

export default connect(mapState, mapDispatch)(Main);
