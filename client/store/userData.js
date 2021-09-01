import {FIREDB} from '../../utils/firebase';

const GET_USER_DATA = 'GET_USER_DATA';
const GET_OTHER_USER_DATA = 'GET_OTHER_USER_DATA';
const TOGGLE_SOUND = 'TOGGLE_SOUND';
const TOGGLE_MUSIC = 'TOGGLE_MUSIC';
const START_BATTLE_MUSIC = 'START_BATTLE_MUSIC';

const _startBattleMusic = (music) => {
  return {
    type: START_BATTLE_MUSIC,
    music,
  };
};

export const _toggleSound = () => {
  return {
    type: TOGGLE_SOUND,
  };
};

const _toggleMusic = () => {
  return {
    type: TOGGLE_MUSIC,
  };
};

const _getUserData = (user) => {
  return {
    type: GET_USER_DATA,
    user,
    myUID: user.uid,
  };
};

const _getOtherUserData = (otherUser) => {
  return {
    type: GET_OTHER_USER_DATA,
    otherUser,
  };
};

export const startBattleMusic = (musicSrc) => (dispatch) => {
  const music = new Audio(musicSrc);
  music.play();
  return dispatch(_startBattleMusic(music));
};

export const toggleMusic = (music, musicOn) => (dispatch) => {
  console.log(music);
  if (music) {
    if (!musicOn) {
      music.play();
    } else if (musicOn) {
      music.pause();
    }
  }

  return dispatch(_toggleMusic());
};

export const getUserData = (uid) => async (dispatch) => {
  try {
    await FIREDB.ref('users/' + uid).once('value', (snap) => {
      const data = snap.val();
      // console.log(data)
      return dispatch(_getUserData(data));
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOtherUserData = (uid) => async (dispatch) => {
  try {
    await FIREDB.ref('users/' + uid).once('value', (snap) => {
      const data = snap.val();
      console.log(data);
      return dispatch(_getOtherUserData(data));
    });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  user: {},
  myUID: '',
  otherUser: {},
  soundOn: true,
  musicOn: true,
  currentSong: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {...state, user: action.user, myUID: action.user.uid};
    case GET_OTHER_USER_DATA:
      return {...state, otherUser: action.otherUser};
    case TOGGLE_SOUND:
      return {...state, soundOn: !state.soundOn};
    case TOGGLE_MUSIC:
      return {...state, musicOn: !state.musicOn};
    case START_BATTLE_MUSIC:
      return {...state, currentSong: action.music};
    default:
      return state;
  }
}
