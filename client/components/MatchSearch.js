import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import {createNewGame, joinGame, findGame, setHostGuest} from '../store/game';
import TextField from '@material-ui/core/TextField';
import {useHistory} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import FindMatch from './FindMatch';
import {fetchPlayerOnePokemon} from '../store/pokemon';
import {useAuth} from '../../src/contexts/AuthContext';
import {getUserData} from '../store/userData';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    backgroundColor: '#CC0000',
    width: '100%',
    height: '600px',
    justifyContent: 'space-around',
    flexDirection: 'row',
    border: '2px solid #000',
    borderRadius: '25px',
  },
  root: {
    width: '400px',
    margin: '30px',
  },
  container: {
    height: 440,
  },
  buttons: {
    display: 'flex',
    width: '250px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // padding: '120px 0 120px 0',
  },
  button: {
    height: '100px',
    fontSize: '20px',
  },
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '25px',
  },
}));
const columns = [
  {id: 'position', label: '#', minWidth: 30},
  {id: 'name', label: 'Name', minWidth: 90},
  {
    id: 'score',
    label: 'Score',
    minWidth: 100,
    align: 'right',
  },
];
function createData(position, name, score) {
  return {position, name, score};
}
const rows = [
  createData(1, 'Gus', 3287263),
  createData(2, 'Nick', 9596961),
  createData(3, 'Mike', 301340),
  createData(4, 'Angie', 9833520),
  createData(5, 'Haram', 9984670),
  createData(6, 'Albina', 7692024),
  createData(7, 'Ray', 357578),
  createData(8, 'Jason', 70273),
  createData(9, 'Adrian', 1972550),
  createData(10, 'Andrew', 377973),
  createData(11, 'Sung', 640679),
  createData(12, 'Jae', 242495),
  createData(13, 'Andy', 17098246),
  createData(14, 'Taya', 923768),
  createData(15, 'Peter', 8515767),
];
const MatchSearch = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const {
    newGame,
    user,
    joinGame,
    findGame,
    availableGames,
    fetchPokemon,
    getUserData,
    setRole,
    changeTurns,
  } = props;

  const {currentUser} = useAuth();

  const handleOpen = async () => {
    if (user.uid) {
      await findGame();
      setOpen(true);
    } else {
      history.push('/login');
      alert('You must be logged in to join a game!');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function handleNewMatchClick() {
    if (user.uid) {
      await newGame(user.uid, user.username);
      setRole('host');
      history.push('/pregame');
    } else {
      history.push('/login');
      alert('You must be logged in to create a new game!');
    }
  }

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <FindMatch
        availableGames={availableGames}
        joinGame={joinGame}
        user={user}
        setRole={setRole}
      />
    </div>
  );
  function handleJoinClick() {
    //const matchId = '-MhpRo167oCYp3cT5O7-';
    //const matchId = joinMatchId.current.value;
    let matchId = prompt('Please enter a match id');
    if (matchId === null) {
      return;
    } else if (matchId !== '') {
      if (user.uid !== '') {
        console.log(matchId);
        joinGame(matchId, user);
        setRole('guest');
        history.push('/pregame');
      } else {
        history.push('/login');
        alert('You must be logged in to create a new game!');
      }
    } else {
      alert('Please enter a valid match id');
    }
  }
  useEffect(() => {
    if (currentUser && currentUser.uid !== user.uid) {
      getUserData(currentUser.uid);
    }
    if (user.pokemon) {
      fetchPokemon(user.pokemon, user.username);
    }
  }, [user, currentUser]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* <Grid

        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'green',
        }}
      >

      // </Grid> */}
      <h3 style={{textAlign: 'center'}}>Leaderboard position: 34532523</h3>
      <Container className={classes.main}>
        <Grid className={classes.buttons}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            onClick={async () => handleNewMatchClick()}
          >
            Create New Match
          </Button>

          <Button
            variant='contained'
            size='large'
            onClick={handleOpen}
            className={classes.button}
          >
            Find Open Match
          </Button>
          <Button
            size='large'
            variant='contained'
            className={classes.button}
            onClick={() => handleJoinClick()}
          >
            Join By Match Id
          </Button>
          {/* <TextField
            id='join-match-id'
            inputRef={joinMatchId}
            variant='outlined'
          /> */}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {modalBody}
        </Modal>
        <Paper className={classes.root}>
          <h4 style={{textAlign: 'center'}}>Leaderboard</h4>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column, i) => (
                    <TableCell
                      key={i}
                      align={column.align}
                      style={{minWidth: column.minWidth}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={i}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Grid>
        <Button
          href='/signup'
          style={{backgroundColor: 'green', position: 'absolute', left: '40%'}}
        >
          Sign Up For free today
        </Button>
      </Grid>
    </div>
  );
};
const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
    user: state.userData.user,
    availableGames: state.game.availableGames,
  };
};
const mapDispatch = (dispatch) => {
  return {
    newGame: (uid, name) => dispatch(createNewGame(uid, name)),
    joinGame: (matchId, user) => dispatch(joinGame(matchId, user)),
    findGame: () => dispatch(findGame()),
    fetchPokemon: (pk, username) =>
      dispatch(fetchPlayerOnePokemon(pk, username)),
    getUserData: (uid) => dispatch(getUserData(uid)),
    setRole: (role) => dispatch(setHostGuest(role)),
  };
};
export default connect(mapState, mapDispatch)(MatchSearch);
