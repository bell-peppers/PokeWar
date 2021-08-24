import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import {FIREDB} from '../../utils/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
  const {matchId, username} = props;

  const [playerJoined, setPlayerJoined] = useState(false);

  useEffect(() => {
    listenForNewPlayer();
  }, [matchId]);

  function listenForNewPlayer() {
    //firebase looking for a player to join the match
    console.log(matchId);
    const dbUpdates = FIREDB.ref(`Match/${matchId}`);
    dbUpdates.on('value', (snapshot) => {
      const playerTwo = snapshot.val();
      console.log(playerTwo);
      if (playerTwo.guestId) {
        setPlayerJoined(true);
      } else {
        setPlayerJoined(false);
      }
    });
  }

  return (
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
              <h3>Waiting for a player to join...</h3>
            ) : (
              <div>
                <h3>Player joined!</h3>
                <Button>Choose your Pokemon!</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
const mapState = (state) => {
  return {
    matchId: state.game.matchId,
    username: state.userData.username,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(PreGame);
