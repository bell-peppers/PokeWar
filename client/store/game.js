import axios from 'axios';

const SEND_PLAYER_MOVES = 'SEND_PLAYER_MOVES';
const GET_PLAYER_MOVES = 'GET_PLAYER_MOVES';

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

export const getPlayerMoves = (newMoves) => (dispatch) => {
  const opponentMoves = newMoves;
  return dispatch(_getPlayerMoves(opponentMoves));
};

// export const sendPlayerMoves = (moves, attacked, user) => (dispatch) => {
//   try {
//     const sendMoves = moves.map((move, index) => {
//       return {...move, attackedPokemon: attacked[index]};
//     });
//     console.log(sendMoves);
//     axios.post(
//       `https://poke-war-4483c-default-rtdb.firebaseio.com/Match/Match1/moves/${user}/.json`,
//       sendMoves
//     );

//     return dispatch(_sendPlayerMoves(sendMoves));
//   } catch (error) {
//     console.error(error);
//   }
// };
export const sendPlayerMoves = (sendMoves, user) => (dispatch) => {
  try {
    // const sendMoves = moves.map((move, index) => {
    //   return {...move, attackedPokemon: attacked[index]};
    // });
    // console.log(sendMoves);
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
  playerMoves: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_PLAYER_MOVES:
      return {...state, playerMoves: action.moves};
    case GET_PLAYER_MOVES:
      return {...state, opponentMoves: action.moves};
    default:
      return state;
  }
}
