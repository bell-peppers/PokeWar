import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chat from './Chat';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {setPlayerReady, cancelGame, _resetGameState} from '../store/game';
import {useHistory} from 'react-router-dom';
import {_resetPokemonState} from '../store/pokemon';
import {_toggleSound, toggleMusic} from '../store/userData';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CountDownTimer from './Timer';
import {_resetTurn} from '../store/playerTurn';
import {FIREDB} from '../../utils/firebase';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'lightsteelblue',
    height: '100%',
    fontFamily: 'Courier New, monospace',
  },
  users: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '95%',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '80px',
    textAlign: 'center',
  },
  chat: {
    width: '95%',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Sidebar = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const {
    feed,
    user,
    opponent,
    matchId,
    role,
    quitGame,
    toggleSound,
    toggleMusic,
    currentSong,
    musicOn,
    resetGameState,
    resetPokemonState,
    isTurn,
    changeTurns,
    soundOn,
    setWinner,
    resetTurn,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [minSecs, setMinSecs] = useState({minutes: 2, seconds: 30});

  const handleClickExitOpen = () => {
    setOpen(true);
  };

  const handleExitClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleQuitClick = () => {
    if (currentSong) {
      currentSong.pause();
    }
    setAnchorEl(null);
    quitGame(matchId, role, false);
    resetGameState();
    resetPokemonState();
    resetTurn();
    FIREDB.ref(`Match/${matchId}/messages`).off();
    FIREDB.ref(`Match/${matchId}/moves/${opponent.username}`).off();
    FIREDB.ref(`Match/${matchId}/guest`).off();
    FIREDB.ref(`Match/${matchId}/ready`).off();
    history.push('/');
  };

  return (
    <Grid className={classes.sidebar}>
      <div style={{display: 'flex', alignSelf: 'flex-end'}}>
        <IconButton
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={toggleSound}>Toggle Sound</MenuItem>
          <MenuItem onClick={() => toggleMusic(currentSong, musicOn)}>
            Toggle Music
          </MenuItem>
          <MenuItem onClick={handleClickExitOpen}>Quit game</MenuItem>
        </Menu>
      </div>
      <Grid className={classes.users}>
        <Grid className={classes.avatar}>
          <Avatar
            className={classes.large}
            alt={user.username}
            src={user.photoUrl}
          />
          <h3 className='avatar-name'>{user.username}</h3>
        </Grid>
        <Grid>
          <h1 className='vs'>⚔️</h1>
        </Grid>
        <Grid className={classes.avatar}>
          <Avatar
            className={classes.large}
            alt={opponent.username}
            src={opponent.photoUrl}
          />
          <h3 className='avatar-name'>{opponent.username}</h3>
        </Grid>
      </Grid>
      <Grid className={classes.chat}>
        <Chat
          feed={feed}
          user={user}
          opponent={opponent}
          matchId={matchId}
          role={role}
        />
      </Grid>
      <div>
        <CountDownTimer
          minSecs={minSecs}
          isTurn={isTurn}
          changeTurns={changeTurns}
          matchId={matchId}
          user={user}
          soundOn={soundOn}
          role={role}
          setWinner={setWinner}
          opponent={opponent}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleExitClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"This is a rage quit, isn't it?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to quit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExitClose} color='primary'>
            No
          </Button>
          <Button onClick={handleQuitClick} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    feed: state.pokemon.attackFeed,
    user: state.userData.user,
    opponent: state.game.opponentInfo,
    musicOn: state.userData.musicOn,
    currentSong: state.userData.currentSong,
  };
};

const mapDispatch = (dispatch) => {
  return {
    quitGame: (matchid, role, quit) =>
      dispatch(setPlayerReady(matchid, role, quit)),
    toggleSound: () => dispatch(_toggleSound()),
    toggleMusic: (currentSong, musicOn) =>
      dispatch(toggleMusic(currentSong, musicOn)),
    resetGameState: () => dispatch(_resetGameState()),
    resetPokemonState: () => dispatch(_resetPokemonState()),
    resetTurn: () => dispatch(_resetTurn()),
  };
};

export default connect(mapState, mapDispatch)(Sidebar);
