import calculateTurn from '../../utils/calculateTurn';

const SELECT_ATTACK = 'SELECT_ATTACK';
const CLEAR_PLAYER_TURN = 'CLEAR_PLAYER_TURN';
const SELECT_ATTACKED_POKEMON = 'SELECT_ATTACKED_POKEMON';
const CLEAR_ATTACKED_POKEMON = 'CLEAR_ATTACKED_POKEMON';
const SELECTED_PLAYER_POKEMON = 'SELECTED_PLAYER_POKEMON';
const CHANGE_TURNS = 'CHANGE_TURNS';
const SET_CALCULATED_ATTACKS = 'SET_CALCULATED_ATTACKS';

export const _setCalculatedAttacks = (turn) => {
  return {
    type: SET_CALCULATED_ATTACKS,
    turn,
  };
};

export const _changeTurns = () => {
  return {
    type: CHANGE_TURNS,
  };
};

export const _selectedPlayerPokemon = (pokemon) => {
  return {
    type: SELECTED_PLAYER_POKEMON,
    pokemon,
  };
};

export const _selectAttack = (attack) => {
  return {
    type: SELECT_ATTACK,
    attack,
  };
};

export const _clearPlayerTurn = () => {
  return {
    type: CLEAR_PLAYER_TURN,
  };
};

export const _selectAttackedPokemon = (turn) => {
  return {
    type: SELECT_ATTACKED_POKEMON,
    turn,
  };
};

export const _clearAttackedPokemon = () => {
  return {
    type: CLEAR_ATTACKED_POKEMON,
  };
};

export const selectAttack = (selectedPokemon, attack) => (dispatch) => {
  const attackObj = {pokemon: selectedPokemon, attack: attack};
  return dispatch(_selectAttack(attackObj));
};

export const setCalculatedAttacks = (updatedTurns) => (dispatch) => {
  return dispatch(_setCalculatedAttacks(updatedTurns));
};

export const selectAttackedPokemon =
  (attackedPokemon, attack, attackingPk) => (dispatch) => {
    const turn = {
      attackedPokemon: attackedPokemon,
      pokemon: attackingPk,
      attack: attack,
    };
    return dispatch(_selectAttackedPokemon(turn));
  };

export default function (
  state = {
    playerAttack: {},
    playerTurn: [],
    attackedPokemon: [],
    selectedPlayerPokemon: {},
    isTurn: false,
    calculatedAttacks: [],
  },
  action
) {
  switch (action.type) {
    case SELECT_ATTACK:
      return {
        ...state,
        playerAttack: action.attack,
      };
    case SELECT_ATTACKED_POKEMON:
      return {
        ...state,
        playerTurn: [...state.playerTurn, action.turn],
      };
    case SELECTED_PLAYER_POKEMON:
      return {...state, selectedPlayerPokemon: action.pokemon};
    case CLEAR_PLAYER_TURN:
      return {...state, playerTurn: []};
    case CLEAR_ATTACKED_POKEMON:
      return {...state, attackedPokemon: []};
    case CHANGE_TURNS:
      return {...state, isTurn: !state.isTurn};
    case SET_CALCULATED_ATTACKS:
      return {...state, calculatedAttacks: action.turn};
    default:
      return state;
  }
}
