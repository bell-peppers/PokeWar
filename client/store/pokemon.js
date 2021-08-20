import axios from 'axios';
import history from '../history';

const GET_SINGLE_POKEMON = 'GET_SINGLE_POKEMON';
const GET_PLAYERONE_POKEMON = 'GET_PLAYERONE_POKEMON';
const GET_PLAYERTWO_POKEMON = 'GET_PLAYERTWO_POKEMON';
const ATTACK_OPPONENT = 'ATTACK_OPPONENT';
const SELECT_ATTACK = 'SELECT_ATTACK';

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

const _getSinglePokemon = (pokemon) => {
  return {
    type: GET_SINGLE_POKEMON,
    pokemon,
  };
};

export const _selectAttack = (attack) => {
  return {
    type: SELECT_ATTACK,
    attack,
  };
};

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

export const attackOpponent = (pokemon, attack) => (dispatch) => {
  console.log(pokemon, attack);
  const updatedHp = pokemon.stats.hp - attack.damage;
  const updatedPokemon = {...pokemon, stats: {hp: updatedHp}};
  return dispatch(_attackOpponent(updatedPokemon));
};

export const fetchSinglePokemon = (name) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    const pokemon = {
      name: response.data.name,
      pokemonType: response.data.types[0].type.name,
      imgUrl: response.data.sprites.front_default,
    };
    console.log(pokemon);
    return dispatch(_getSinglePokemon(singlePokemon));
  } catch (error) {
    console.error(error);
  }
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
    playerAttack: {},
  },
  action
) {
  switch (action.type) {
    case GET_SINGLE_POKEMON:
      return {...state, singlePokemon: action.pokemon};
    case GET_PLAYERONE_POKEMON:
      return {...state, playerOnePokemon: action.pokemon};
    case GET_PLAYERTWO_POKEMON:
      return {...state, playerTwoPokemon: action.pokemon};
    case ATTACK_OPPONENT:
      let newPoke = state.playerTwoPokemon.map((pk) => {
        return pk.name !== action.pokemon.name ? pk : action.pokemon;
      });
      return {...state, playerTwoPokemon: newPoke};
    case SELECT_ATTACK:
      return {...state, playerAttack: action.attack};
    default:
      return state;
  }
}
