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
  fetchPlayerTwoPokemon,
  fetchMovesInfo,
} from '../store/pokemon';
import {getPlayerMoves} from '../store/game';

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

//<Grid className={classes.main}>
const Main = (props) => {
  const {
    getPlayerPokemon,
    getOpponentPokemon,
    opponentPokemon,
    playerPokemon,
    getMoves,
  } = props;
  const playerPkIds = [45, 23, 98];

  useEffect(() => {
    getPlayerPokemon(playerPkIds);
    getOpponentPokemon();
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.main}>
        <div className={classes.board}>
          <Gameboard
            playerPokemon={playerPokemon}
            opponentPokemon={opponentPokemon}
          />
          <Actionbar />
        </div>
        <div className={classes.side}>
          <Sidebar />
        </div>
      </Container>
    </React.Fragment>
  );
};
const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
    opponentPokemon: state.pokemon.playerTwoPokemon,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlayerPokemon: (pkIds) => dispatch(fetchPlayerOnePokemon(pkIds)),
    getOpponentPokemon: () => dispatch(fetchPlayerTwoPokemon()),
    getMoves: (playerPk) => dispatch(fetchMovesInfo(playerPk)),
  };
};

export default connect(mapState, mapDispatch)(Main);
