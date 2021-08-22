// const ATTACK_OPPONENT = 'ATTACK_OPPONENT';
const SELECT_ATTACK = 'SELECT_ATTACK';
const CLEAR_PLAYER_TURN = 'CLEAR_PLAYER_TURN';
const SELECT_ATTACKED_POKEMON = 'SELECT_ATTACKED_POKEMON';
const CLEAR_ATTACKED_POKEMON = 'CLEAR_ATTACKED_POKEMON';

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

export const _selectAttackedPokemon = (pokemon) => {
  return {
    type: SELECT_ATTACKED_POKEMON,
    pokemon,
  };
};

export const _clearAttackedPokemon = () => {
  return {
    type: CLEAR_ATTACKED_POKEMON,
  };
};

export const selectAttack = (selectedPokemon, attack) => (dispatch) => {
  const attackObj = {pokemon: selectedPokemon.name, attack: attack};
  return dispatch(_selectAttack(attackObj));
};

export default function (
  state = {
    playerAttack: {},
    playerTurn: [],
    attackedPokemon: [],
  },
  action
) {
  switch (action.type) {
    case SELECT_ATTACK:
      return {...state, playerTurn: [...state.playerTurn, action.attack]};
    case SELECT_ATTACKED_POKEMON:
      return {
        ...state,
        attackedPokemon: [...state.attackedPokemon, action.pokemon],
      };

    case CLEAR_PLAYER_TURN:
      return {...state, playerTurn: []};
    case CLEAR_ATTACKED_POKEMON:
      return {...state, attackedPokemon: []};
    default:
      return state;
  }
}
