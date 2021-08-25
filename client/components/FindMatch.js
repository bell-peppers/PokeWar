import React from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

export default function FindMatch(props) {
  const {availableGames, joinGame, user, setRole} = props;
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    main: {
      fontFamily: 'Courier New, monospace',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
    },
    gameInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'black',
    },
  }));

  const classes = useStyles();

  function joinClick(matchId) {
    joinGame(matchId, user);
    setRole('guest');
    history.push('/pregame');
  }
  return (
    <div className={classes.main}>
      {availableGames.map((game, i) => {
        return (
          <div key={i} className={classes.gameInfo}>
            <h3>{game.matchId}</h3>
            <Button onClick={() => joinClick(game.matchId)}>Join</Button>
          </div>
        );
      })}
    </div>
  );
}
