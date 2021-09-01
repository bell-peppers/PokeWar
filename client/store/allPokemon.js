import axios from 'axios';

//constant
const SET_POKEMON = 'SET_POKEMON';

const pokemon = [1, 6, 25, 94, 143, 150, 197, 248, 445, 448, 658, 887];

//action creator
const _setPokemon = (Pokemon) => ({
  type: SET_POKEMON,
  Pokemon,
});

//thunk function
export const fetchPokemon = (poke = pokemon) => {
  return async (dispatch) => {
    try {
      let Pokemon = [];
      if (typeof poke === 'number') {
        const end = poke === 600 ? poke + 49 : poke + 50;
        poke += 1;
        while (poke <= end) {
          let { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${poke}`
          );
          Pokemon.push(data);
          poke++;
        }
      } else {
        for (let i = 0; i < poke.length; i++) {
          let { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${poke[i]}`
          );
          Pokemon.push(data);
        }
      }
      dispatch(_setPokemon(Pokemon));
    } catch (error) {
      console.error('cant get pokemon', error);
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_POKEMON:
      return action.Pokemon;
    default:
      return state;
  }
}
