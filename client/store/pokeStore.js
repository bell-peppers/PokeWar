import axios from 'axios';
import { FlagShip, Legendary } from '../../utils/storeType';

//constants
const SET_LEGENDARY = 'SET_LEGENDARY';
const legendaryPokemon = [
  ...Object.values(FlagShip),
  ...Object.values(Legendary),
];

//action creator
const _setLegendary = (legends) => ({
  type: SET_LEGENDARY,
  legends,
});

//thunk function
export const fetchlegends = () => {
  return async (dispatch) => {
    try {
      let legends = [];
      for (let i = 0; i < legendaryPokemon.length; i++) {
        let { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${legendaryPokemon[i]}`
        );
        legends.push(data);
      }
      dispatch(_setLegendary(legends));
    } catch (error) {
      console.error('connot get legendary pokemon', error);
    }
  };
};

//reducer
export default function legendsReducer(state = [], action) {
  switch (action.type) {
    case SET_LEGENDARY:
      return action.legends;
    default:
      return state;
  }
}
