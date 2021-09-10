import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {useAuth} from '../../src/contexts/AuthContext';
import {getUserData} from '../store/userData';
import {fetchPlayerOnePokemon} from '../store/pokemon';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Link, useHistory} from 'react-router-dom';
import 'firebase/database';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  main: {
    fontFamily: 'Courier New, monospace',
    // backgroundColor: 'royalBlue',
    backgroundImage: 'linear-gradient(120deg, #B1D4E0 0%,  #000C66 100%)',
    position: 'relative',
    height: '100vh',
    maxWidth: '1018px',
    paddingBottom: '40px',
    margin: '15px auto',
    borderRadius: '10px',
  },
  root: {
    width: '400px',
    margin: '30px',
    height: '100vh',
  },
  container: {
    height: 440,
  },
  cards: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(8),
      height: theme.spacing(11),
    },
    imageRoot: {
      display: 'flex',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  },
}));

const UserProfile = (props) => {
  const {user, playerPokemon, fetchPokemon, getUserData} = props;
  const {currentUser} = useAuth();
  const classes = useStyles();

  // useEffect(() => {
  //   if (currentUser && currentUser.uid !== user.uid) {
  //     getUserData(currentUser.uid);
  //   }
  //   if (user.pokemon) {
  //     fetchPokemon(user.pokemon, user.username);
  //   }
  // }, [user, currentUser]);

  useEffect(() => {
    if (!user.uid) {
      const localUid = localStorage.getItem('uid');
      const localPk = localStorage.getItem('playerPk').split(',');
      const localName = localStorage.getItem('username');
      getUserData(localUid);
      if (playerPokemon.length === 0) {
        fetchPokemon(localPk, localName);
      }
    } else {
      getUserData(user.uid);
      if (playerPokemon.length === 0) {
        fetchPokemon(user.pokemon, user.username);
      }
    }
    // if (playerPokemon.length === 0) {
    //   fetchPokemon(user.pokemon, user.username);
    // }
  }, []);

  const [clicked, setClicked] = useState(false);

  const handleIconClick = (poke) => {
    if (!poke.liked) {
      poke.liked = true;
      setClicked(true);
    } else {
      poke.liked = false;
      setClicked(false);
    }
  };

  return (
    <div style={{height: '100vh'}}>
      <Grid className={classes.main}>
        <div key={playerPokemon}></div>
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            margin: '0 50px 30px 25px',
            paddingLeft: '9px',
            paddingTop: '50px',
          }}
        >
          <Grid
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid>
              {user && (
                <img
                  src={user.photoUrl || '/pics/default.png'}
                  width='180px'
                  height='180px'
                  border='1px solid blue'
                />
              )}
            </Grid>
            <Link to='/editprofile'>
              <Button variant='contained' color='secondary'>
                Edit Profile
              </Button>
            </Link>
            {/* <Typography style={{fontSize: '25px'}}>{user.username}</Typography> */}
          </Grid>
          <Grid
            style={{
              display: 'flex',
              fontSize: '25px',
              paddingRight: '80px',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Grid>
              {/* Level
            <Typography
              style={{
                height: '35px',
                width: '35px',
                display: 'table-cell',
                textAlign: 'center',
                verticalAlign: 'middle',
                borderRadius: '90%',
                // background: 'white',
                fontSize: '25px',
                marginLeft: '4px',
                backgroundColor: 'lightBlue',
              }}
            >
              1
            </Typography> */}
              <Typography style={{fontSize: '25px'}}>
                {user.username}
              </Typography>
            </Grid>
            {user && user.totalGames > 0 ? (
              <div>
                <Typography>Total Games: {user.totalGames}</Typography>
                <Typography>Total Wins: {user.wins}</Typography>
                <Typography>
                  Win rate: {Math.round((user.wins / user.totalGames) * 100)}%
                </Typography>
                <Typography>Total Coins: {user.coins}</Typography>
              </div>
            ) : null}
            {/* <Link to='/editprofile'>
            <Button variant='contained' color='secondary'>
              Edit Profile
            </Button>
          </Link> */}
          </Grid>
        </Grid>
        <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
          <Grid
            style={{
              width: '95%',
              marginLeft: '20px',
              minHeight: '243px',
              padding: '10px',
              border: 'solid 1px black',
            }}
          >
            <Typography style={{fontSize: '18px', marginBottom: '8px'}}>
              My Pokemon
            </Typography>
            {playerPokemon && playerPokemon.length ? (
              <div className={classes.imageRoot}>
                <ImageList
                  cols={2.5}
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    border: '5px solid royalBlue',
                  }}
                >
                  {playerPokemon.map((item) => (
                    <ImageListItem key={item.id} style={{width: '150px'}}>
                      <img src={item.sprites.front_default} />
                      <ImageListItemBar
                        actionIcon={
                          <IconButton
                            onClick={() => handleIconClick(item)}
                            className={classes.title}
                          >
                            {item.liked ? (
                              <FavoriteIcon />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
    user: state.userData.user,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchPokemon: (pk) => dispatch(fetchPlayerOnePokemon(pk)),
    getUserData: (uid) => dispatch(getUserData(uid)),
  };
};
export default connect(mapState, mapDispatch)(UserProfile);
