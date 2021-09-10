import {calcDamage} from './DmgCalculations';
import {PokemonOrder} from './orderCalculation';

export function winCheck(playerPk, oppPk) {
  const playerCheck = playerPk.filter((pk) => {
    return pk.active;
  });

  const oppCheck = oppPk.filter((pk) => {
    return pk.active;
  });

  if (playerCheck.length === 0 || oppCheck.length === 0) {
    return true;
  } else {
    return false;
  }
}

export default function calculateTurn(playerTurn, oppTurn) {
  const fullTurn = [...playerTurn, ...oppTurn];
  const allPokemon = fullTurn
    .map((turn) => {
      return turn.pokemon;
    })
    .filter((pk) => pk.active);

  const pokeOrder = PokemonOrder(allPokemon);

  const fullTurnOrder = pokeOrder.map((pk) => {
    const move = fullTurn.filter((turn) => {
      if (turn.pokemon.name === pk.name && turn.pokemon.owner === pk.owner) {
        return turn;
      }
    });
    return move[0];
  });

  const turnReport = fullTurnOrder.map((turn) => {
    return {
      ...turn,
      report: calcDamage(
        turn.attack.moveData,
        turn.attackedPokemon,
        turn.pokemon
      ),
    };
  });

  return turnReport;
}

export const computerMoves = (oppPk, playerPk) => {
  let compAlive = oppPk.filter((pk) => pk.active);
  let playerAlive = playerPk.filter((pk) => pk.active);

  function randomPk(length) {
    return Math.floor(Math.random() * length);
  }

  let compMoves = [];

  for (let i = 0; i < compAlive.length; i++) {
    let move = {
      pokemon: compAlive[i],
      attackedPokemon: playerAlive[randomPk(playerAlive.length)],
      attack: compAlive[i].moves[randomPk(4)],
    };
    compMoves.push(move);
  }

  return compMoves;
};
