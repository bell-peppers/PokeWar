import {calcDamage} from './DmgCalculations';
import {PokemonOrder} from './orderCalculation';

export default function calculateTurn(playerTurn, oppTurn) {
  console.log(playerTurn);
  const fullTurn = [...playerTurn, ...oppTurn];

  const allPokemon = fullTurn.map((turn) => {
    return turn.pokemon;
  });

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

  return turnReport;
}
