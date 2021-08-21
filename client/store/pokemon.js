import axios from 'axios';
import history from '../history';

const GET_PLAYERONE_POKEMON = 'GET_PLAYERONE_POKEMON';
const GET_PLAYERTWO_POKEMON = 'GET_PLAYERTWO_POKEMON';
// const ATTACK_OPPONENT = 'ATTACK_OPPONENT';
// const SELECT_ATTACK = 'SELECT_ATTACK';
// const CLEAR_PLAYER_TURN = 'CLEAR_PLAYER_TURN';
// const SELECT_ATTACKED_POKEMON = 'SELECT_ATTACKED_POKEMON';
// const CLEAR_ATTACKED_POKEMON = 'CLEAR_ATTACKED_POKEMON';
const APPLY_OPPONENT_MOVES = 'APPLY_OPPONENT_MOVES';
const ATTACK_OPPONENT = 'ATTACK_OPPONENT';
// const UPDATE_POKEMON = 'UPDATE_POKEMON';

const playerOnePokemon = [
  {
    name: 'Blastoise',
    id: 9,
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
    frontImg:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
    moves: [
      {
        move: 'bodyslam',
        damage: 5,
      },
      {
        move: 'blizzard',
        damage: 25,
      },
      {
        move: 'hydro-pump',
        damage: 15,
      },
    ],
    stats: {hp: 60},
  },
  {
    name: 'Clefairy',
    id: 35,
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png',
    frontImg:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
    moves: [
      {
        move: 'bodyslam',
        id: 1,
        damage: 5,
      },
      {
        move: 'rage',
        id: 2,
        damage: 25,
      },
      {
        move: 'skull-bash',
        id: 3,
        damage: 15,
      },
    ],
    stats: {hp: 50},
  },
  {
    name: 'Gengar',
    type: 'type',
    id: 94,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/94.png',
    frontImg:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    moves: [
      {
        move: 'mega-punch',
        damage: 5,
      },
      {
        move: 'fire-punch',
        damage: 25,
      },
      {
        move: 'head-butt',
        damage: 15,
      },
    ],
    stats: {hp: 40},
  },
];

const playerTwoPokemon = [
  {
    name: 'Diglett',
    id: 50,
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
    frontImg:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png',
    moves: [
      {
        move: 'bodyslam',
        damage: 5,
      },
      {
        move: 'blizzard',
        damage: 25,
      },
      {
        move: 'hydro-pump',
        damage: 15,
      },
    ],
    stats: {hp: 40},
  },
  {
    name: 'Vaporeon',
    id: 134,
    type: 'type',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png',
    frontImg:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png',
    moves: [
      {
        move: 'bodyslam',
        id: 1,
        damage: 5,
      },
      {
        move: 'rage',
        id: 2,
        damage: 25,
      },
      {
        move: 'skull-bash',
        id: 3,
        damage: 15,
      },
    ],
    stats: {hp: 50},
  },
  {
    name: 'Charizard',
    type: 'type',
    id: 6,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/94.png',
    frontImg:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    moves: [
      {
        move: 'mega-punch',
        damage: 5,
      },
      {
        move: 'fire-punch',
        damage: 25,
      },
      {
        move: 'head-butt',
        damage: 15,
      },
    ],
    stats: {hp: 70},
  },
];

// export const _updatePokemon = () => {
//   return {
//     type: UPDATE_POKEMON,
//   };
// };

// export const _selectAttack = (attack) => {
//   return {
//     type: SELECT_ATTACK,
//     attack,
//   };
// };

// export const _clearPlayerTurn = () => {
//   return {
//     type: CLEAR_PLAYER_TURN,
//   };
// };

const _getPlayerOnePokemon = (pokemon) => {
  return {
    type: GET_PLAYERONE_POKEMON,
    pokemon,
  };
};

const _getPlayerTwoPokemon = (pokemon) => {
  return {
    type: GET_PLAYERTWO_POKEMON,
    pokemon,
  };
};

const _attackOpponent = (pokemon) => {
  return {
    type: ATTACK_OPPONENT,
    pokemon,
  };
};

// export const _selectAttackedPokemon = (pokemon) => {
//   return {
//     type: SELECT_ATTACKED_POKEMON,
//     pokemon,
//   };
// };

// export const _clearAttackedPokemon = () => {
//   return {
//     type: CLEAR_ATTACKED_POKEMON,
//   };
// };

const _applyOpponentMoves = (pokemon) => {
  return {
    type: APPLY_OPPONENT_MOVES,
    pokemon,
  };
};

export const applyOpponentMoves = (moves, playerPokemon) => (dispatch) => {
  // playerPokemon.forEach((pk) => {
  //   for (let i = 0; i < moves.length; i++) {
  //     if (moves[i].attackedPokemon === pk.name) {
  //       pk.stats.hp -= moves[i].attack.damage;
  //     }
  //   }
  // });

  const updatedPk = playerPokemon.map((pk) => {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].attackedPokemon === pk.name) {
        pk.stats.hp -= moves[i].attack.damage;
      }
    }
    return pk;
  });
  dispatch(_applyOpponentMoves(updatedPk));
};

// export const selectAttack = (selectedPokemon, attack) => (dispatch) => {
//   const attackObj = {pokemon: selectedPokemon.name, attack: attack};
//   return dispatch(_selectAttack(attackObj));
// };

// export const attackOpponent = (pokemon, attack) => (dispatch) => {
//   console.log(pokemon, attack);
//   const updatedHp = pokemon.stats.hp - attack.damage;
//   const updatedPokemon = {...pokemon, stats: {hp: updatedHp}};
//   return dispatch(_attackOpponent(updatedPokemon));
// };

export const attackOpponent = (oppPokemon, turn) => (dispatch) => {
  const updatedPk = oppPokemon.map((pk) => {
    for (let i = 0; i < turn.length; i++) {
      if (turn[i].attackedPokemon === pk.name) {
        pk.stats.hp -= turn[i].attack.damage;
      }
      return pk;
    }
  });

  // const updatedHp = pokemon.stats.hp - attack.damage;
  // const updatedPokemon = {...pokemon, stats: {hp: updatedHp}};
  return dispatch(_attackOpponent(updatedPk));
};

export const fetchPlayerOnePokemon = () => async (dispatch) => {
  try {
    return dispatch(_getPlayerOnePokemon(playerOnePokemon));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlayerTwoPokemon = () => async (dispatch) => {
  try {
    return dispatch(_getPlayerTwoPokemon(playerTwoPokemon));
  } catch (error) {
    console.error(error);
  }
};

export default function (
  state = {
    singlePokemon: {},
    playerOnePokemon: [],
    playerTwoPokemon: [],
    // playerAttack: {},
    // playerTurn: [],
    // attackedPokemon: [],
  },
  action
) {
  switch (action.type) {
    case GET_PLAYERONE_POKEMON:
      return {...state, playerOnePokemon: action.pokemon};
    case GET_PLAYERTWO_POKEMON:
      return {...state, playerTwoPokemon: action.pokemon};
    // case ATTACK_OPPONENT:
    //   let newPoke = state.playerTwoPokemon.map((pk) => {
    //     return pk.name !== action.pokemon.name ? pk : action.pokemon;
    //   });
    case ATTACK_OPPONENT:
      // let newPoke = state.playerTwoPokemon.map((pk) => {
      //   return pk.name !== action.pokemon.name ? pk : action.pokemon;
      // });
      return {...state, playerTwoPokemon: action.pokemon};
    //   return {...state, playerTwoPokemon: newPoke};
    // case SELECT_ATTACK:
    //   return {...state, playerTurn: [...state.playerTurn, action.attack]};
    // case SELECT_ATTACKED_POKEMON:
    //   return {
    //     ...state,
    //     attackedPokemon: [...state.attackedPokemon, action.pokemon],
    //   };
    // case CLEAR_PLAYER_TURN:
    //   return {...state, playerTurn: []};
    // case CLEAR_ATTACKED_POKEMON:
    //   return {...state, attackedPokemon: []};
    case APPLY_OPPONENT_MOVES:
      return {...state, playerOnePokemon: action.pokemon};
    // case UPDATE_POKEMON:
    //   return state;
    default:
      return state;
  }
}
