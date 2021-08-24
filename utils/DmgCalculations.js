import { damageClass } from './TypeEffectiveness';

export function calcDamage(move, target, attacker) {
  const D_class = move.damage_class;
  const Power = move.power;
  const crit = Math.floor(Math.random() * 10) + 1 === 10 ? 2 : 1;
  const rand = (Math.random() * (1.0 - 0.85) + 0.85).toFixed(2);
  let A = 0;
  let D = 0;
  let STAB = 0;
  let Type = 0;
  let Class = '';

  if (attacker.types.length === 2) {
    STAB =
      move.type.name === attacker.types[0].type.name ||
      move.type.name === attacker.types[1].type.name
        ? 1.5
        : 1;
  } else {
    STAB = move.type.name === attacker.types[0].type.name ? 1.5 : 1;
  }

  if (target.types.length === 2) {
    const dmg1 = damageClass(move.type.name, target.types[0].type.name);
    const dmg2 = damageClass(move.type.name, target.types[1].type.name);

    Type = (dmg1.damage + dmg2.damage).toFixed(2);
    Class = dmg1.damage >= dmg2.damage ? dmg1.class : dmg2.class;
  } else {
    const dmg = damageClass(move.type.name, target.types[0].type.name);
    Type = dmg.damage;
    Class = dmg.class;
  }

  // to find if this is a special move or not so we use the correct stats
  if (D_class.name === 'special') {
    A = attacker.stats[3].base_stat;
    D = target.stats[4].base_stat;
  } else {
    A = attacker.stats[1].base_stat;
    D = target.stats[2].base_stat;
  }
  console.log(Type);

  let Damage =
    (((2 / 5 + 2) * Power * A) / D / 50 + 2) * crit * rand * STAB * Type;

  Damage = Damage.toFixed(2);

  let report = {
    Damage,
    Class,
  };

  if (crit === 2) {
    report.isCrit = true;
  }

  return report;
}

/**Damage Calculation

* Damage = (((2 * Level \ 5 + 2) * Power * A/D) / 50 + 2) * Targets * Weather * Badge * Critical * random * STAB * Type * Burn * other

* where:

* Level is the level of the attacking Pokémon (or twice the level for a critical hit in Generation I and Generation II).
* A is the effective Attack stat of the attacking Pokémon if the used move is a physical move, or the effective Special Attack stat of the attacking Pokémon if the used move is a special move (ignoring allGen. II/negativeGen. III+ stat stages for a critical hit).
* D is the effective Defense stat of the target if the used move is a physical move or a special move that uses the target's Defense stat, or the effective Special Defense of the target if the used move is an other special move (ignoring allGen. II/positiveGen. III+ stat stages for a critical hit).
* Power is the effective power of the used move.
* Targets is 0.75 if the move has more than one target (except in Battle Royals), 0.5 in Battle Royals if the move has more than one target, and 1 otherwise. (In Generation III, it is 0.5 for moves that target all adjacent foes with more than one target, and 1 otherwise.)
* Weather is 1.5 if a Water-type move is being used during rain or a Fire-type move during harsh sunlight, and 0.5 if a Water-type move is used during harsh sunlight or a Fire-type move during rain, and 1 otherwise.
* Badge is applied in Generation II only. It is 1.25 if the attacking Pokémon is controlled by the player and if the player has obtained the Badge corresponding to the used move's type, and 1 otherwise.
* Critical is applied starting in Generation III. It is 2 for a critical hit in Generations III-V, 1.5 for a critical hit from Generation VI onward, and 1 otherwise.
* random is a random factor between 0.85 and 1.00 (inclusive):
    -From Generation III onward, it is a random integer percentage between 0.85 and 1.00 (inclusive)
    -In Generations I and II, it is realized as a multiplication by a random uniformly distributed integer between 217 and 255 (inclusive), followed by an integer division by 255. Flail and Reversal are exempt from this factor.
* STAB is the same-type attack bonus. This is equal to 1.5 if the move's type matches any of the user's types, 2 if the user of the move additionally has Adaptability, and 1 if otherwise.
* Type is the type effectiveness. This can be 0 (ineffective); 0.25, 0.5 (not very effective); 1 (normally effective); 2, or 4 (super effective), depending on both the move's and target's types.
* Burn is 0.5 (from Generation III onward) if the attacker is burned, its Ability is not Guts, and the used move is a physical move (other than Facade from Generation VI onward), and 1 otherwise.
* other is 1 in most cases, and a different multiplier when specific interactions of moves, Abilities, or items take effect:
*/
