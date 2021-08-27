import axios from 'axios';
import history from '../history';
import {FIREDB} from '../../utils/firebase';
import {FeedbackSharp} from '@material-ui/icons';

const GET_PLAYERONE_POKEMON = 'GET_PLAYERONE_POKEMON';
const GET_OPPONENT_POKEMON = 'GET_OPPONENT_POKEMON';
const APPLY_MOVES = 'APPLY_MOVES';
const ATTACK_OPPONENT = 'ATTACK_OPPONENT';
const FETCH_SINGLE_POKEMON = 'FETCH_SINGLE_POKEMON';
const FETCH_MOVES_INFO = 'UPDATE_MOVES_INFO';
const CHOOSE_PLAYER_POKEMON = 'CHOOSE_PLAYER_POKEMON';
const UNCHOOSE_PLAYER_POKEMON = 'UNCHOOSE_PLAYER_POKEMON';
const SEND_CHOSEN_POKEMON = 'SEND_CHOSEN_POKEMON';

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

const _sendChosenPokemon = (pokemon) => {
  return {
    type: SEND_CHOSEN_POKEMON,
    pokemon,
  };
};
const _choosePlayerPokemon = (pokemon) => {
  return {
    type: CHOOSE_PLAYER_POKEMON,
    pokemon,
  };
};

const _unchoosePlayerPokemon = (pokemon) => {
  return {
    type: UNCHOOSE_PLAYER_POKEMON,
    pokemon,
  };
};

const _getPlayerOnePokemon = (pokemon) => {
  return {
    type: GET_PLAYERONE_POKEMON,
    pokemon,
  };
};

const _getOpponentPokemon = (pokemon) => {
  return {
    type: GET_OPPONENT_POKEMON,
    pokemon,
  };
};

const _attackOpponent = (pokemon) => {
  return {
    type: ATTACK_OPPONENT,
    pokemon,
  };
};

const _applyMoves = (playerPk, oppPk) => {
  return {
    type: APPLY_MOVES,
    playerPk,
    oppPk,
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

export const sendChosenPokemon =
  (pokemon, matchId, role) => async (dispatch) => {
    const playerInfo =
      role == 'host' ? {hostPokemon: pokemon} : {guestPokemon: pokemon};

    await FIREDB.ref('/Match/' + matchId).update(playerInfo);
    return dispatch(_sendChosenPokemon(pokemon));
  };
export const choosePlayerPokemon = (pk) => (dispatch) => {
  return dispatch(_choosePlayerPokemon(pk));
};

export const unchoosePlayerPokemon = (pk) => (dispatch) => {
  return dispatch(_unchoosePlayerPokemon(pk));
};

export const fetchSinglePokemon = (id) => async (dispatch) => {
  try {
    const pk = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return dispatch(_fetchSinglePokemon(pk));
  } catch (error) {
    console.error(error);
  }
};

export const applyMoves = (moves, playerPk, oppPk) => (dispatch) => {
  const feed = [];
  console.log('moves', moves);
  moves.forEach((move) => {
    const reportClass =
      move.report.Class && move.report.Class !== 'Normal'
        ? `${move.report.Class}`
        : '';
    const action =
      `${move.pokemon.owner}'s ${move.pokemon.name} uses ${move.attack.move.name} for ${move.report.Damage} on ${move.attackedPokemon.name}. ` +
      reportClass;
    playerPk.forEach((pk) => {
      if (
        pk.owner === move.attackedPokemon.owner &&
        pk.name == move.attackedPokemon.name
      ) {
        pk.stats[0].base_stat -= move.report.Damage;
      }
    });

    oppPk.forEach((pk) => {
      if (
        pk.owner === move.attackedPokemon.owner &&
        pk.name == move.attackedPokemon.name
      ) {
        pk.stats[0].base_stat -= move.report.Damage;
      }
    });
    feed.push(action);
  });

  const updatedPlayerPk = [...playerPk];
  const updatedOppPk = [...oppPk];
  console.log(feed);
  dispatch(_applyMoves(updatedPlayerPk, updatedOppPk));
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

export const fetchPlayerOnePokemon = (pkId, username) => async (dispatch) => {
  try {
     let playerPk = await Promise.all(pkId.map(async (id) => {
      const pk = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const movesArr = [
        pk.data.moves[0],
        pk.data.moves[1],
        pk.data.moves[2],
        pk.data.moves[3],
      ];
      await movesArr.forEach(async (move) => {
        const getMove = await axios.get(`${move.move.url}`);
        move.moveData = getMove.data;
      });
      pk.data.moves = movesArr;
      pk.data.owner = username;
      return pk.data
      // playerPk.push();
    }));
    // console.log("infetch")
    // console.log(JSON.stringify(playerPk))
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
export const fetchOpponentPokemon = (matchId, role) => async (dispatch) => {
  try {
    const oppRole = role == 'host' ? 'guestPokemon' : 'hostPokemon';
    const oppPoke = await axios.get(
      `https://poke-war-4483c-default-rtdb.firebaseio.com/Match/${matchId}/${oppRole}.json`
    );
    console.log(oppPoke.data);
    return dispatch(_getOpponentPokemon(oppPoke.data));
    // const oppRole = role == 'host' ? 'guestPokemon' : 'hostPokemon';
    // await FIREDB.ref('/Match/' + matchId + oppRole).get((snapshot) => {
    //   const oppPoke = snapshot.val();
    //   console.log(oppPoke);
    //   return dispatch(_getOpponentPokemon(oppPoke));
    // });
    // console.log(oppPoke);
    // return dispatch(_getOpponentPokemon(oppPoke));
  } catch (error) {
    console.error(error);
  }
};

export default function (
  state = {
    singlePokemon: {},
    playerOnePokemon: [],
    opponentPokemon: [],
    chosenPokemon: [],
  },
  action
) {
  switch (action.type) {
    case GET_PLAYERONE_POKEMON:
      return {...state, playerOnePokemon: action.pokemon};
    case GET_OPPONENT_POKEMON:
      console.log(action);
      return {...state, opponentPokemon: action.pokemon};
    case ATTACK_OPPONENT:
      return {...state, playerTwoPokemon: action.pokemon};
    case APPLY_MOVES:
      return {
        ...state,
        playerOnePokemon: action.playerPk,
        opponentPokemon: action.oppPk,
      };
    case CHOOSE_PLAYER_POKEMON:
      return {
        ...state,
        chosenPokemon: [...state.chosenPokemon, action.pokemon],
      };
    case UNCHOOSE_PLAYER_POKEMON:
      const updated = [];
      state.chosenPokemon.map((pk) => {
        if (pk.name !== action.pokemon.name) {
          updated.push(pk);
        }
      });
      return {...state, chosenPokemon: updated};
    case SEND_CHOSEN_POKEMON:
      return state;
    default:
      return state;
  }
}
