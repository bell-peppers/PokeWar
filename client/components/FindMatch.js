import React from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
    table: {
      minWidth: 400,
    },
  }));

  function createData(opponent, matchid) {
    return {opponent, matchid};
  }

  const rows = availableGames.map((game) => {
    return createData(game.data.hostUsername, game.matchId);
  });

  const classes = useStyles();

  function joinClick(matchId) {
    joinGame(matchId, user);
    setRole('guest');
    history.push('/pregame');
  }
  return (
    <div className={classes.main}>
      {availableGames.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight: 'bold'}} align='center'>
                  Opponent Name
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}} align='center'>
                  Match ID
                </TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component='th' scope='row' align='center'>
                    {row.opponent}
                  </TableCell>
                  <TableCell align='center'>{row.matchid}</TableCell>
                  <TableCell align='center'>
                    <Button
                      onClick={() => joinClick(row.matchid)}
                      color='primary'
                      aria-label='join'
                      variant='contained'
                    >
                      Join Match
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1 style={{textAlign: 'center'}}>
          There are no available matches at the moment
        </h1>
      )}
    </div>

    // <div className={classes.main}>
    //   {availableGames.length > 1 ? (
    //     availableGames.map((game, i) => {
    //       return (
    //         <div key={i} className={classes.gameInfo}>
    //           <h3>Match ID: {game.matchId}</h3>
    //           <h2>Host: {game.data.hostUsername}</h2>
    //           <Button onClick={() => joinClick(game.matchId)}>Join</Button>
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <h1>There are no available matches at the moment</h1>
    //   )}
    // </div>
  );
}
