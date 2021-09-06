import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {_resetPokemonState} from '../store/pokemon';
import {cancelGame, _resetGameState} from '../store/game';
import {_resetTurn} from '../store/playerTurn';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '85vw',
    maxWidth: '600px',
    height: '85vh',
    textAlign: 'center',
    alignItems: 'center',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 20px',
  },
}));

function PostGame(props) {
  const classes = useStyles();
  const {
    winner,
    user,
    opponentName,
    matchId,
    deleteMatch,
    resetGameState,
    resetPokemonState,
    music,
    resetTurn,
  } = props;
  // const winner = 'mike';
  // const user = {username: 'mike'};
  const history = useHistory();

  useEffect(() => {
    if (music) {
      music.pause();
    }
  }, []);

  function clickHandle() {
    resetGameState();
    resetPokemonState();
    deleteMatch(matchId);
    resetTurn();
    history.push('/');
  }
  return (
    <div className={classes.root}>
      {winner === user.username ? (
        <div className={classes.main}>
          <h1>Congratulations {user.username}!</h1>
          <h2>You win!</h2>
          <img style={{maxWidth: '500px'}} src='pics/pktrophy.png' />
          <p>You have earned 100 coins!</p>
          <Button variant='contained' color='primary' onClick={clickHandle}>
            Back to Main
          </Button>
        </div>
      ) : (
        <div className={classes.main}>
          <h1>Sorry, {user.username}!</h1>
          <h2>You lost!</h2>
          <img src='pics/defeat.gif' />
          <p>You have earned 10 coins for your troubles</p>
          <Button variant='contained' color='primary' onClick={clickHandle}>
            Back to Main
          </Button>
        </div>
      )}
    </div>
  );
}
const mapState = (state) => {
  return {
    winner: state.game.winner,
    user: state.userData.user,
    opponentName: state.game.opponentInfo.username,
    matchId: state.game.matchId,
    music: state.userData.currentSong,
  };
};
const mapDispatch = (dispatch) => {
  return {
    deleteMatch: (matchId) => dispatch(cancelGame(matchId)),
    resetGameState: () => dispatch(_resetGameState()),
    resetPokemonState: () => dispatch(_resetPokemonState()),
    resetTurn: () => dispatch(_resetTurn()),
  };
};
export default connect(mapState, mapDispatch)(PostGame);
