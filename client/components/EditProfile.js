import React, {useState, useEffect} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Button, makeStyles, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {CardMedia} from '@material-ui/core';
import Image from 'material-ui-image';
import {getAuth, updateProfile} from 'firebase/auth';
import {getUserData} from '../store/userData';
import {fetchPlayerOnePokemon} from '../store/pokemon';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import {FIREDB, storage} from '../../utils/firebase';
import {useAuth} from '../../src/contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  main: {
    fontFamily: 'Courier New, monospace',
    // display: 'flex',
    // flex: '1',
    backgroundColor: 'royalBlue',
    position: 'relative',
    maxWidth: '1018px',
    // minHeight: '224px',
    paddingBottom: '0px',
    margin: '15px auto',
    // flexWrap: 'nowrap',

    // maxWidth: '960px',
    // position: 'relative'
    // height: '600px',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // margin: '0  100px 0 100px'
  },
  root: {
    // flexWrap: 'nowrap',
    width: '400px',
    margin: '30px',
  },
  container: {
    // flexWrap: 'nowrap',
    height: 440,
  },
  cards: {
    display: 'flex',
    // flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(8),
      height: theme.spacing(11),
    },
    imageRoot: {
      display: 'flex',
      // flexWrap: 'nowrap',
      // width: '350px',
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
    notHovered: {
      width: '150px',
      height: '150px',
      padding: '10px',
    },

    hover: {
      transform: `scale(1.5)`,
    },
  },
}));

function EditProfile(props) {
  const {user, playerPokemon, fetchPokemon, getUserData} = props;
  // const playerPokemon = useSelector((state) => state.pokemon.playerOnePokemon);
  const {currentUser, username, updateImg} = useAuth();
  const classes = useStyles();

  let photo = '';
  const [image, setImage] = useState(null);
  const [usernameValue, setUsername] = useState('');
  const [url, setUrl] = useState('');
  // const [hover, setHover] = useState(false);

  // const toggleHover = () => {
  // 	setHover;
  // };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUrl('');
      console.log(URL.createObjectURL(e.target.files[0]));
    }
  };

  // const changePhoto = (imgUrl) => {
  //   currentUser
  //     .updateProfile({
  //       photoURL: imgUrl,
  //       uid: user.uid,
  //       email: user.email,
  //       pokemon: user.pokemon,
  //       favPokemon: user.favPokemon,
  //       username: user.username,
  //       wins: user.wins,
  //       totalGames: user.totalGames,
  //       coins: user.coins,
  //       friends: user.friends,
  //     })
  //     .then(async () => {
  //       await updateImg(currentUser.uid, imgUrl);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleSubmit = async () => {
    const update = {
      username: usernameValue,
    };
    try {
      await FIREDB.ref('/users/' + user.uid).update(update);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (!url) {
      const uploadTask = storage.ref(`images/${currentUser.uid}`).put(image);
      // const update = {photoUrl: `images/${user.uid}`};
      // await FIREDB.ref('/users/' + user.uid).update(update);
      // const {
      //   uid,
      //   email,
      //   pokemon,
      //   favPokemon,
      //   username,
      //   wins,
      //   totalGames,
      //   coins,
      //   friends,
      // } = currentUser;

      uploadTask.on('state_changed', () => {
        storage
          .ref('images/')
          .child(currentUser.uid)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
            const update = {photoUrl: url};
            FIREDB.ref('/users/' + user.uid).update(update);

            // currentUser
            //   .updateProfile({
            //     uid,
            //     email,
            //     pokemon: [],
            //     favPokemon: [],
            //     username,
            //     photoURL: url,
            //     wins,
            //     totalGames,
            //     coins,
            //     friends,
            //   })
            //   .then(async () => {
            //     await updateImg(currentUser, url);
            //   })
            // .catch((error) => {
            //   console.error(error);
            // });
          });
      });
    } else if (url) {
      const update = {photoUrl: url};
      FIREDB.ref('/users/' + user.uid).update(update);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.uid !== user.uid) {
      getUserData(currentUser.uid);
    }
  }, [user, currentUser]);

  return (
    <div>
      <Grid className={classes.main}>
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: '30px',
            paddingBottom: '30px',
          }}
        >
          <Grid>
            <Typography>Change your avatar</Typography>
            <Grid
              style={{
                display: 'flex',
                flexDirection: 'row',
                minHeight: '300px',
                justifyContent: 'space-evenly',
                //alignItems: 'center',
                border: '5px solid white',
                marginBottom: '15px',
                borderRadius: '25px',
              }}
            >
              <Grid
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {user && user.photoUrl ? (
                  <img
                    // src={url}
                    src={
                      url
                        ? url
                        : image
                        ? URL.createObjectURL(image)
                        : user.photoUrl
                    }
                    alt='firebase-image'
                    width='180px'
                    height='180px'
                  />
                ) : (
                  <img
                    // src={url}
                    src={url || '/pics/default.png'}
                    alt='firebase-image'
                    width='180px'
                    height='auto'
                  />
                )}
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'space-evenly',
                  flexDirection: 'column',
                }}
              >
                <input type='file' onChange={handleChange} />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleUpload}
                >
                  Save Avatar
                </Button>
              </Grid>
            </Grid>

            <Grid>
              <Typography>Default avatars</Typography>
              <Grid
                style={{
                  display: 'flex',
                  padding: '20px',
                  border: '5px solid white',
                  width: '600px',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  borderRadius: '25px',
                }}
              >
                <img
                  width='150px'
                  height='150px'
                  padding='10px'
                  src='https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/bulbasaur.png?alt=media&token=92102872-97ff-4fd3-8b81-65e7ce211a5f'
                  alt='bulbasaur'
                  onClick={() =>
                    setUrl(
                      'https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/bulbasaur.png?alt=media&token=92102872-97ff-4fd3-8b81-65e7ce211a5f'
                    )
                  }
                />
                {/* {bulbasaur} */}
                <img
                  width='150px'
                  height='150px'
                  src='https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/charmander.png?alt=media&token=726a00eb-7fa6-4446-8152-cfb767f673e6'
                  alt='charmander'
                  onClick={() =>
                    setUrl(
                      'https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/charmander.png?alt=media&token=726a00eb-7fa6-4446-8152-cfb767f673e6'
                    )
                  }
                />
                <img
                  width='150px'
                  height='150px'
                  src='https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/cute_poke.png?alt=media&token=7e307fea-7cba-4b23-9f30-bbe81a9844d2'
                  alt='cute_poke'
                  // onMouseOver={() => enlargeImg()}
                  onClick={(e) => {
                    console.log(e.target.src);
                    setUrl(
                      'https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/cute_poke.png?alt=media&token=7e307fea-7cba-4b23-9f30-bbe81a9844d2'
                    );
                  }}
                />
              </Grid>
              {/* <Grid style={{display: 'flex', justifyContent: 'center'}}>
                <Button
                  onClick={() => {
                    changePhoto(photo);
                    photo = '';
                  }}
                >
                  Choose A Picture
                </Button>
              </Grid> */}
            </Grid>
            <Grid>
              <Typography>Change your username</Typography>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '20px',
                  border: '5px solid white',
                  paddingBottom: '20px',
                  borderRadius: '25px',
                }}
              >
                <form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    id='username'
                    placeholder={user.username}
                    variant='filled'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                  >
                    Save New Username
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid className={classes.main}>
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 50px 30px 25px',
            paddingLeft: '9px',
            paddingTop: '50px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'black',
          }}
        ></Grid>
      </Grid> */}
    </div>
  );
}

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
export default connect(mapState, mapDispatch)(EditProfile);
