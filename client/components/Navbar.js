import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Grid, CardContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../../src/contexts/AuthContext';
import { auth } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { FIREDB } from '../../utils/firebase';

// import firebase from 'firebase/app';

const useStyles = makeStyles(() => ({
  navbar: {
    width: '90vw',
    margin: '0vh 5vw 0vh 5vw',
    borderRadius: '0px 0px 30px 30px',
    backgroundColor: '#1574b0',
    color: '#3d405b',
    position: 'relative',
  },
  cart: {
    width: '80vw',
    marginLeft: '5vw',
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftMenu: {
    display: 'flex',
    flexDirection: 'row',
  },
  p: {
    margin: '5px 25px 0px 25px',
    fontSize: '20px',
    fontFamily: 'Courier New, monospace',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
  },
}));

const Navbar = props => {
  const history = useHistory();
  const [error, setError] = useState('');
  const classes = useStyles();
  const {currentUser, logout} = useAuth();
  const {username} = props;

  // console.log(firebase.auth());
  // const { currentUser } = firebase.auth();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.log(error);
      setError('Failed to log out');
    }
  }

  return (
    <AppBar className={classes.navbar}>
      {/* {console.log(currentUser)} */}
      {/* {console.log(currentUser)} */}
      {/* {currentUser && currentUser.email} */}
      {error && console.log(error)}
      <Toolbar className={classes.cart}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* <a className={classes.p} href='/'>
          Poke Wars
        </a> */}
          {/* <Grid className={classes.leftMenu}>
          <a className={classes.p} href='/allpokemon'>
            All Pokemon
          </a>
          <a className={classes.p} href='/myprofile'>
            My Profile
          </a>
        // </Grid> */}

          <Link to='/'>
            <img
              src='https://fontmeme.com/permalink/210826/592ea97aacfe17f8048b8b966b5e0c57.png'
              alt='pokewar'
            />
          </Link>
          <Link to='/allpokemon'>
            <p className={classes.p}>All Pokemon</p>
          </Link>
        </div>
        <div>
          {username && <p className={classes.p}> Welcome, {username}</p>}
        </div>
        <div>
          {currentUser ? (
            <div style={{ display: 'flex' }}>
              <Link to='/myprofile'>
                <p className={classes.p}>My Profile</p>
              </Link>
              <p onClick={handleLogout} className={classes.p}>
                Sign Out
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
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
      {/* <div>{error && <Alert>{error}</Alert>}</div> */}
    </AppBar>
  );
};

const mapState = state => {
  return {
    username: state.userData.user.username,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(Navbar);
