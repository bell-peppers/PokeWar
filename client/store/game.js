import axios from 'axios';

const SEND_PLAYER_MOVES = 'SEND_PLAYER_MOVES';

const _sendPlayerMoves = (moves) => {
  return {
    type: SEND_PLAYER_MOVES,
    moves,
  };
};

export const sendPlayerMoves = (moves) => (dispatch) => {
  try {
    axios.post(
      'https://poke-war-4483c-default-rtdb.firebaseio.com/Match/match1/player1/.json',
      moves
    );

    return dispatch(_sendPlayerMoves(moves));
  } catch (error) {
    console.error(error);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case SEND_PLAYER_MOVES:
      return state;
    default:
      return state;
  }
}
