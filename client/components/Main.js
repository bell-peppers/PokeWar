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
import {getPlayerMoves} from '../store/game';
import {_changeTurns} from '../store/playerTurn';

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    backgroundColor: 'red',
    width: '100vw',
    height: '80vh',
    maxHeight: '1200px',
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
    backgroundColor: 'green',
    width: '75%',
    height: '100%',
    justifyContent: 'space-between',
  },
  side: {
    width: '25%',
    height: '100%',
  },
}));

const Main = (props) => {
  const {
    getPlayerPokemon,
    fetchOpponentPokemon,
    opponentPokemon,
    playerPokemon,
    getMoves,
    matchId,
    role,
    opponentName,
    changeTurns,
    isTurn,
    username,
    calculatedAttacks,
  } = props;

  //test data
  const playerPkIds = [45, 23, 98];
  const testMatch = '-MhsjJ7cGIuXMHc0IGZS';

  // useEffect(() => {
  //   //getPlayerPokemon(playerPkIds);

  //   // if (opponentPokemon.length == 0) {
  //   //   fetchOpponentPokemon(matchId, role);
  //   // }

  //   fetchOpponentPokemon(matchId, role);
  // }, []);
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
            username={username}
            role={role}
            changeTurns={changeTurns}
            isTurn={isTurn}
            matchId={matchId}
          />
          <Actionbar
            isTurn={isTurn}
            changeTurns={changeTurns}
            role={role}
            username={username}
            calculatedAttacks={calculatedAttacks}
            matchId={matchId}
          />
        </div>
        <div className={classes.side}>
          <Sidebar calculatedAttacks={calculatedAttacks} />
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
    username: state.userData.user.username,
    calculatedAttacks: state.playerTurn.calculatedAttacks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlayerPokemon: (pkIds) => dispatch(fetchPlayerOnePokemon(pkIds)),
    fetchOpponentPokemon: (matchId, role) =>
      dispatch(fetchOpponentPokemon(matchId, role)),
    getMoves: (playerPk) => dispatch(fetchMovesInfo(playerPk)),
    changeTurns: () => dispatch(_changeTurns()),
  };
};

export default connect(mapState, mapDispatch)(Main);
