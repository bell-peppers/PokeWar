import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Alert from '@material-ui/lab/Alert';
import {useAuth} from '../../src/contexts/AuthContext';
import 'firebase/database';
import 'firebase/auth';
import {_toggleSound, toggleMusic} from '../store/userData';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';


const useStyles = makeStyles(() => ({
  navbar: {
    maxWidth: '100vw',
    borderRadius: '0px 0px 30px 30px',
    backgroundColor: 'royalBlue',
    color: '#3d405b',
    position: 'relative',
  },
  cart: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftMenu: {
    display: 'flex',
    flexDirection: 'row',
  },
  p: {
    margin: '5px 25px 0px 25px',
    fontSize: '18px',
    fontFamily: 'Courier New, monospace',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
  },
  pName: {
    margin: '5px 25px 0px 25px',
    fontSize: '16px',
    fontFamily: 'Courier New, monospace',
    textDecoration: 'none',
    color: 'black',
  },
}));

const Navbar = (props) => {
  const history = useHistory();
  const [error, setError] = useState('');
  const classes = useStyles();
  const {currentUser, logout} = useAuth();
  const {
    user,
    username,
    soundOn,
    toggleSound,
    toggleMusic,
    currentSong,
    musicOn,
  } = props;

  function handleToggleSound() {
    toggleSound();
  }

  function handleToggleMusic() {
    toggleMusic(currentSong, musicOn);
  }

  async function handleLogout() {
    setError('');

    try {
      await logout();
      localStorage.removeItem('uid');
      localStorage.removeItem('username');
      localStorage.removeItem('playerPk');
      history.push('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  }

  return (
    <AppBar className={classes.navbar}>
      {error && console.error(error)}
      <Toolbar className={classes.cart}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >

          <Link to='/'>
            <img
              src='https://fontmeme.com/permalink/210826/592ea97aacfe17f8048b8b966b5e0c57.png'
              alt='pokewar'
            />
          </Link>
          <div
            style={{maxWidth: '350px', display: 'flex', alignItems: 'center'}}
          >
            <IconButton onClick={handleToggleSound}>
              {soundOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
            <IconButton onClick={handleToggleMusic}>
              {musicOn ? <MusicNoteIcon /> : <MusicOffIcon />}
            </IconButton>

            {username && <p className={classes.pName}> Welcome, {username}</p>}
          </div>

        </div>

        <div>
          {currentUser ? (
            <div style={{display: 'flex'}}>
              <Link to='/allpokemon'>
                <p className={classes.p}>All Pokemon</p>
              </Link>

              <Link to={`/profile`}>
                <p className={classes.p}>My Profile</p>
              </Link>
              <p onClick={handleLogout} className={classes.p}>
                Sign Out
              </p>
            </div>
          ) : (
            <div style={{display: 'flex'}}>
              <Link to='/allpokemon'>
                <p className={classes.p}>All Pokemon</p>
              </Link>
              <Link to='/signup'>
                <p className={classes.p}>Sign Up</p>
              </Link>
              <Link to='/login'>
                <p className={classes.p}>Login</p>
              </Link>
            </div>
          )}
        </div>
      </Toolbar>
      {error && <Alert>{error}</Alert>}
    </AppBar>
  );
};

const mapState = (state) => {
  return {
    username: state.userData.user.username,
    soundOn: state.userData.soundOn,
    musicOn: state.userData.musicOn,
    currentSong: state.userData.currentSong,
  };
};

const mapDispatch = (dispatch) => {
  return {
    toggleSound: () => dispatch(_toggleSound()),
    toggleMusic: (currentSong, musicOn) =>
      dispatch(toggleMusic(currentSong, musicOn)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
