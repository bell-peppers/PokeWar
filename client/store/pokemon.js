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
  console.log('opp', oppPk);
  moves.forEach((move) => {
    const reportClass =
      move.report.Class && move.report.Class !== 'Normal'
        ? `${move.report.Class}`
        : '';
    const crit = move.report.isCrit ? ' Critcal hit!' : '';
    const action = {
      message:
        `${move.pokemon.owner}'s ${move.pokemon.name} uses ${move.attack.move.name} for ${move.report.Damage} on ${move.attackedPokemon.name}. ` +
        reportClass +
        crit,
    };
    playerPk.forEach((pk) => {
      if (
        pk.owner === move.attackedPokemon.owner &&
        pk.name == move.attackedPokemon.name
      ) {
        pk.stats[0].base_stat -= move.report.Damage;
        if (pk.stats[0].base_stat <= 0 && pk.active) {
          pk.active = false;
          action.message += `${pk.name} was killed in battle.`;
        }
      }
    });

    oppPk.forEach((pk) => {
      if (
        pk.owner === move.attackedPokemon.owner &&
        pk.name == move.attackedPokemon.name
      ) {
        pk.stats[0].base_stat -= move.report.Damage;
        if (pk.stats[0].base_stat <= 0 && pk.active) {
          pk.active = false;
          action.message += `${pk.name} was killed in battle.`;
        }
      }
    });
    feed.push(action);
  });

  const updatedPlayerPk = [...playerPk];
  const updatedOppPk = [...oppPk];
  feed.forEach((f) => console.log(f.message));
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
    const playerPk = [];
    await pkId.forEach(async (id) => {
      const pk = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      const ind = pk.data.moves.length;
      let multiplier = Math.floor(((id * 151) % ind) / 2);
      const movesArr = [];
      if (ind - multiplier > 20) {
        for (let i = 0; i < 20; i++) {
          movesArr.push(pk.data.moves[multiplier + i]);
        }
      } else if (ind < 10) {
        for (let i = 0; i < ind; i++) {
          movesArr.push(pk.data.moves[i]);
        }
      } else {
        for (let i = 0; i < 20; i++) {
          movesArr.push(pk.data.moves[i]);
        }
      }

      const newMoves = await Promise.all(
        movesArr.map(async (move) => {
          const getMove = await axios.get(`${move.move.url}`);
          return {
            move: move.move,
            moveData: {
              accuracy: getMove.data.accuracy,
              type: getMove.data.type,
              power: getMove.data.power,
              damage_class: getMove.data.damage_class,
            },
          };
        })
      );
      const newerMoves = newMoves.filter(
        (move) => move.moveData.power !== null
      );

      // if (newerMoves < 4) {
      //   const newestMoves = newMoves;
      // } else {
      //   const newestMoves = [
      //     newerMoves[0],
      //     newerMoves[1],
      //     newerMoves[2],
      //     newerMoves[3],
      //   ];
      // }
      const newestMoves =
        newerMoves < 4
          ? newMoves
          : [newerMoves[0], newerMoves[1], newerMoves[2], newerMoves[3]];
      const pokemon = {
        moves: newestMoves,
        owner: username,
        id: pk.data.id,
        name: pk.data.name,
        stats: pk.data.stats,
        types: pk.data.types,
        active: true,
        sprites: {
          ...pk.data.sprites,
          frontGif: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pk.data.name}.gif`,
          backGif: `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pk.data.name}.gif`,
        },
      };
      pokemon.stats[0].base_stat += 100;
      playerPk.push(pokemon);
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
export const fetchOpponentPokemon = (matchId, role) => async (dispatch) => {
  try {
    const oppRole = role == 'host' ? 'guestPokemon' : 'hostPokemon';
    const oppPoke = await axios.get(
      `https://poke-war-4483c-default-rtdb.firebaseio.com/Match/${matchId}/${oppRole}.json`
    );
    console.log(oppPoke.data);
    return dispatch(_getOpponentPokemon(oppPoke.data));
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
