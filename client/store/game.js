import {ContactsOutlined, ContactSupportOutlined} from '@material-ui/icons';
import axios from 'axios';
import {FIREDB} from '../../utils/firebase';

const SEND_PLAYER_MOVES = 'SEND_PLAYER_MOVES';
const GET_PLAYER_MOVES = 'GET_PLAYER_MOVES';
const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
const JOIN_GAME = 'JOIN_GAME';
const FIND_GAME = 'FIND_GAME';
const CANCEL_GAME = 'CANCEL_GAME';
const SET_HOSTGUEST = 'SET_HOSTGUEST';
const SET_OPPONENT_INFO = 'SET_OPPONENT_INFO';

const _setOpponentInfo = (info) => {
  return {
    type: SET_OPPONENT_INFO,
    info,
  };
};

const _setHostGuest = (role) => {
  return {
    type: SET_HOSTGUEST,
    role,
  };
};
const _cancelGame = () => {
  return {
    type: CANCEL_GAME,
  };
};

const _findGame = (games) => {
  return {
    type: FIND_GAME,
    games,
  };
};
const _createNewGame = (game) => {
  return {
    type: CREATE_NEW_GAME,
    game,
  };
};

const _sendPlayerMoves = (moves) => {
  return {
    type: SEND_PLAYER_MOVES,
    moves,
  };
};

const _getPlayerMoves = (moves) => {
  return {
    type: GET_PLAYER_MOVES,
    moves,
  };
};

const _joinGame = (data, matchId) => {
  return {
    type: JOIN_GAME,
    data,
    matchId,
  };
};

export const setHostGuest = (role) => (dispatch) => {
  return dispatch(_setHostGuest(role));
};
export const setOpponentInfo = (info) => (dispatch) => {
  const oppInfo = {userId: info.guestId, userName: info.guestUsername};
  console.log(info);
  console.log(oppInfo);
  return dispatch(_setOpponentInfo(oppInfo));
};

export const getPlayerMoves = (newMoves) => (dispatch) => {
  const opponentMoves = newMoves;
  return dispatch(_getPlayerMoves(opponentMoves));
};

export const cancelGame = (matchId) => async (dispatch) => {
  try {
    await FIREDB.ref('/Match/' + matchId).remove();

    return dispatch(_cancelGame());
  } catch (error) {
    console.log(error);
  }
};

export const findGame = () => async (dispatch) => {
  try {
    const games = await axios.get(
      `https://poke-war-4483c-default-rtdb.firebaseio.com/Match/.json`
    );
    let availableGames = [];
    for (const [match, values] of Object.entries(games.data)) {
      if (values.status === 'open') {
        availableGames.push({matchId: match, data: values});
      }
    }
    console.log(availableGames);
    return dispatch(_findGame(availableGames));
  } catch (error) {
    console.error(error);
  }
};

export const joinGame = (matchId, user) => async (dispatch) => {
  try {
    const gameInfo = await axios.get(
      `https://poke-war-4483c-default-rtdb.firebaseio.com/Match/${matchId}.json`
    );
    console.log(user);
    const playerInfo = {
      guestId: user.uid,
      guestUsername: user.username,
      status: 'closed',
    };
    if (gameInfo.data.status === 'open') {
      await FIREDB.ref('/Match/' + matchId).update(playerInfo);
      console.log(gameInfo.data);
      return dispatch(_joinGame(gameInfo.data, matchId));
    } else {
      alert('Match is no longer available');
    }
  } catch (error) {
    console.error(error);
  }
};

export const createNewGame = (userId, name) => async (dispatch) => {
  try {
    const playerInfo = {
      hostId: userId,
      hostUsername: name,
      status: 'open',
    };
    const newGame = await axios.post(
      `https://poke-war-4483c-default-rtdb.firebaseio.com/Match/.json`,
      playerInfo
    );
    console.log(newGame);
    dispatch(_createNewGame(newGame.data.name));
  } catch (error) {
    console.error(error);
  }
};

export const sendPlayerMoves = (sendMoves, user) => (dispatch) => {
  try {
    axios.post(
      `https://poke-war-4483c-default-rtdb.firebaseio.com/Match/Match1/moves/${user}/.json`,
      sendMoves
    );

    return dispatch(_sendPlayerMoves(sendMoves));
  } catch (error) {
    console.error(error);
  }
};
let initialState = {
  opponentMoves: [],
  opponentInfo: {},
  playerMoves: [],
  matchId: null,
  role: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_PLAYER_MOVES:
      return {...state, playerMoves: action.moves};
    case GET_PLAYER_MOVES:
      return {...state, opponentMoves: action.moves};
    case CREATE_NEW_GAME:
      return {...state, matchId: action.game};
    case JOIN_GAME:
      return {
        ...state,
        opponentInfo: {
          userId: action.hostId,
          userName: action.userName,
        },
        matchId: action.matchId,
      };
    case SET_OPPONENT_INFO:
      return {
        ...state,
        opponentInfo: {
          userId: action.info.userId,
          userName: action.info.userName,
        },
      };
    case FIND_GAME:
      console.log(action.games);
      return {...state, availableGames: action.games};
    case CANCEL_GAME:
      return {...state, matchId: null};
    case SET_HOSTGUEST:
      return {...state, role: action.role};
    default:
      return state;
  }
}
