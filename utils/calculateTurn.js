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
  console.log(playerTurn);
  const fullTurn = [...playerTurn, ...oppTurn];

  const allPokemon = fullTurn
    .map((turn) => {
      return turn.pokemon;
    })
    .filter((pk) => pk.active);

  const pokeOrder = PokemonOrder(allPokemon);
  console.log('order', pokeOrder);

  const fullTurnOrder = pokeOrder.map((pk) => {
    const move = fullTurn.filter((turn) => {
      if (turn.pokemon.name === pk.name && turn.pokemon.owner === pk.owner) {
        return turn;
      }
    });
    console.log(move);
    return move[0];
  });

  console.log(fullTurnOrder);
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

  console.log(turnReport);
  return turnReport;
}
