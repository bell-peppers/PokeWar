import axios from "axios";
import history from "../history";

const GET_SINGLE_POKEMON = "GET_SINGLE_POKEMON";
const GET_PLAYERONE_POKEMON = "GET_PLAYERONE_POKEMON";
const GET_PLAYERTWO_POKEMON = "GET_PLAYERTWO_POKEMON";

const _getSinglePokemon = (pokemon) => {
  return {
    type: GET_SINGLE_POKEMON,
    pokemon,
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
    return dispatch(_getSinglePokemon(pokemon));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlayerOnePokemon = () => async (dispatch) => {
  try {
    let cardArr = [];
    while (cardArr.length < 3) {
      // let num = Math.floor(Math.random() * 150 + 1);
      let num = Math.floor(Math.random() * 9 + 1);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${num}`
      );

      const pokemon = {
        name: response.data.name,
        pokemonType: response.data.types[0].type.name,
        imgUrl: response.data.sprites.front_default,
      };
      cardArr.push(pokemon);
    }
    return dispatch(_getPlayerOnePokemon(cardArr));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlayerTwoPokemon = () => async (dispatch) => {
  try {
    let cardArr = [];
    while (cardArr.length < 3) {
      // let num = Math.floor(Math.random() * 150 + 1);
      let num = Math.floor(Math.random() * 9 + 1);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${num}`
      );

      const pokemon = {
        name: response.data.name,
        pokemonType: response.data.types[0].type.name,
        imgUrl: response.data.sprites.front_default,
      };
      cardArr.push(pokemon);
    }
    return dispatch(_getPlayerTwoPokemon(cardArr));
  } catch (error) {
    console.error(error);
  }
};

export default function (
  state = {singlePokemon: {}, playerOnePokemon: [], playerTwoPokemon: []},
  action
) {
  switch (action.type) {
    case GET_SINGLE_POKEMON:
      return {...state, singlePokemon: action.pokemon};
    case GET_PLAYERONE_POKEMON:
      return {...state, playerOnePokemon: action.pokemon};
    case GET_PLAYERTWO_POKEMON:
      return {...state, playerTwoPokemon: action.pokemon};
    default:
      return state;
  }
}
