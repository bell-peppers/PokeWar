import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import {FIREDB} from '../../utils/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {cancelGame, setOpponentInfo} from '../store/game';
import {useHistory} from 'react-router-dom';
import ChoosePokemon from './ChoosePokemon';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  game: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    //backgroundColor: 'white',
    width: '65%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'white',
    borderRadius: '50px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
    background: 'linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff)',
  },
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    width: '100vw',
    height: '80vh',
    maxHeight: '1000px',
    minWidth: '800px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '600px',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  waiting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '50%',
    justifyContent: 'space-between',
  },
}));

const PreGame = (props) => {
  const classes = useStyles();
  const {
    matchId,
    username,
    cancelGame,
    setOppInfo,
    opponent,
    playerPokemon,
    role,
  } = props;
  const history = useHistory();

  const [playerJoined, setPlayerJoined] = useState(false);
  const [choosePk, setChoosePk] = useState(false);

  useEffect(() => {
    listenForNewPlayer();
  }, [matchId]);

  function listenForNewPlayer() {
    //firebase looking for a player to join the match
    console.log(matchId);
    const dbUpdates = FIREDB.ref(`Match/${matchId}/guestUsername`);
    dbUpdates.on('value', (snapshot) => {
      const playerTwo = snapshot.val();
      console.log(playerTwo);
      if (playerTwo && role === 'host') {
        setOppInfo(playerTwo);
        setPlayerJoined(true);
      } else if (playerTwo) {
        setPlayerJoined(true);
      }
    });
  }
  function cancelClick() {
    cancelGame(matchId);
    setChoosePk(true);
    history.push('/');
  }

  return !choosePk ? (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.main}>
        <div className={classes.game}>
          <h1>New Match Created</h1>
          <div>
            <p>Match ID:{matchId}</p>
            <h2>{username}</h2>
          </div>
          <div>
            {playerJoined == false ? (
              <div className={classes.waiting}>
                <h3>Waiting for a player to join...</h3>
                <CircularProgress />
                <br />
                <Button
                  onClick={() => cancelClick()}
                  variant='contained'
                  color='secondary'
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className={classes.waiting}>
                <h3>{opponent.username} joined!</h3>
                <Button
                  onClick={() => setChoosePk(true)}
                  variant='contained'
                  color='primary'
                >
                  Choose your Pokemon!
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </React.Fragment>
  ) : (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <ChoosePokemon playerPokemon={playerPokemon} matchId={matchId} />
    </div>
  );
};
const mapState = (state) => {
  return {
    matchId: state.game.matchId,
    username: state.userData.username,
    opponent: state.game.opponentInfo,
    playerPokemon: state.pokemon.playerOnePokemon,
    role: state.game.role,
  };
};

const mapDispatch = (dispatch) => {
  return {
    cancelGame: (matchId) => dispatch(cancelGame(matchId)),
    setOppInfo: (info) => dispatch(setOpponentInfo(info)),
  };
};

export default connect(mapState, mapDispatch)(PreGame);
