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
//import bgImage from '../../public/pics/pregamegym.png';

const useStyles = makeStyles(() => ({
  game: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '65%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    // backgroundImage: `url(${bgImage})`,
    backgroundColor: 'red',
    width: '100vw',
    height: '80vh',
    maxHeight: '1000px',
    minWidth: '800px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '600px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
  },
}));

const PreGame = (props) => {
  const classes = useStyles();
  const {matchId, username, cancelGame, setOppInfo, opponent, playerPokemon} =
    props;
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
      if (playerTwo) {
        setOppInfo(playerTwo);
        setPlayerJoined(true);
        // if (playerTwo.guestId) {
        //   setOppInfo(playerTwo);
        //   setPlayerJoined(true);
        // } else {
        //   setPlayerJoined(false);
        // }
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
          <h2>Pre-Game Lobby</h2>
          <div>
            <p>Match id:{matchId}</p>
            <h2>{username}</h2>
          </div>
          <div>
            {playerJoined == false ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <h3>Waiting for a player to join...</h3>
                <Button onClick={() => cancelClick()}>Cancel</Button>
              </div>
            ) : (
              <div>
                <h3>{opponent.userName} joined!</h3>
                <Button onClick={() => setChoosePk(true)}>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    cancelGame: (matchId) => dispatch(cancelGame(matchId)),
    setOppInfo: (info) => dispatch(setOpponentInfo(info)),
  };
};

export default connect(mapState, mapDispatch)(PreGame);
