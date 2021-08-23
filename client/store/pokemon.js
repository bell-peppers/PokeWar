import axios from 'axios';
import history from '../history';

const GET_PLAYERONE_POKEMON = 'GET_PLAYERONE_POKEMON';
const GET_PLAYERTWO_POKEMON = 'GET_PLAYERTWO_POKEMON';
const APPLY_OPPONENT_MOVES = 'APPLY_OPPONENT_MOVES';
const ATTACK_OPPONENT = 'ATTACK_OPPONENT';
const FETCH_SINGLE_POKEMON = 'FETCH_SINGLE_POKEMON';
const FETCH_MOVES_INFO = 'UPDATE_MOVES_INFO';

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

const _applyOpponentMoves = (pokemon) => {
  return {
    type: APPLY_OPPONENT_MOVES,
    pokemon,
  };
};

const _fetchSinglePokemon = (pokemon) => {
  return {
    type: FETCH_SINGLE_POKEMON,
    pokemon,
  };
};

const _fetchMovesInfo = (moves) => {
  return {
    type: FETCH_MOVES_INFO,
    moves,
  };
};

export const fetchSinglePokemon = (id) => async (dispatch) => {
  try {
    const pk = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return dispatch(_fetchSinglePokemon(pk));
  } catch (error) {
    console.error(error);
  }
};

export const applyOpponentMoves = (moves, playerPokemon) => (dispatch) => {
  const updatedPk = playerPokemon.map((pk) => {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].attackedPokemon === pk.name) {
        pk.stats.hp -= moves[i].attack.damage;
        const actionString = `${moves[i].pokemon} hit ${pk.name} for ${moves[i].attack.damage}`;
        console.log(actionString);
      }
    }
    return pk;
  });
  dispatch(_applyOpponentMoves(updatedPk));
};

export const attackOpponent = (oppPokemon, turn) => (dispatch) => {
  const updatedPk = oppPokemon.map((pk) => {
    for (let i = 0; i < turn.length; i++) {
      if (turn[i].attackedPokemon === pk.name) {
        pk.stats.hp -= turn[i].attack.damage;
        const actionString = `${turn[i].pokemon} hit ${pk.name} for ${turn[i].attack.damage}`;
        console.log(actionString);
      }
    }
    return pk;
  });

  return dispatch(_attackOpponent(updatedPk));
};

export const fetchPlayerOnePokemon = (pkId) => async (dispatch) => {
  try {
    const playerPk = [];
    await pkId.forEach(async (id) => {
      const pk = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const movesArr = [pk.data.moves[0], pk.data.moves[1], pk.data.moves[2]];
      await movesArr.forEach(async (move) => {
        const getMove = await axios.get(`${move.move.url}`);
        move.moveData = getMove.data;
      });
      pk.data.moves = movesArr;
      playerPk.push(pk.data);
    });

    return dispatch(_getPlayerOnePokemon(playerPk));
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovesInfo = (pokemon) => async (dispatch) => {
  try {
    const updatedPk = await pokemon.map(async (pk) => {
      const newMoves = await pk.moves.map(async (move) => {
        const getMove = await axios.get(`${move.move.url}`);
        return {...move, moveData: getMove.data};
      });
      return newMoves;
    });
    console.log(updatedPk);
    return dispatch(_fetchMovesInfo(updatedPk));
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
  },
  action
) {
  switch (action.type) {
    case GET_PLAYERONE_POKEMON:
      return {...state, playerOnePokemon: action.pokemon};
    case GET_PLAYERTWO_POKEMON:
      return {...state, playerTwoPokemon: action.pokemon};
    case ATTACK_OPPONENT:
      return {...state, playerTwoPokemon: action.pokemon};
    case APPLY_OPPONENT_MOVES:
      return {...state, playerOnePokemon: action.pokemon};
    default:
      return state;
  }
}
