export function PokemonOrder(pokemon) {
  quickSort(pokemon, 0, pokemon.length - 1);
  return pokemon;
}

function swap(pokemon, poke1, poke2) {
  let temp = pokemon[poke1];
  pokemon[poke1] = pokemon[poke2];
  pokemon[poke2] = temp;
}

function partition(pokemon, low, high) {
  let pivot = pokemon[Math.floor((low + high) / 2)].stats[5].base_stat;
  let i = low;
  let j = high;

  while (i <= j) {
    while (pokemon[i].stats[5].base_stat > pivot) {
      i++;
    }
    while (pokemon[j].stats[5].base_stat < pivot) {
      j--;
    }

    if (i <= j) {
      swap(pokemon, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(pokemon, low, high) {
  let index;

  if (pokemon.length > 1) {
    index = partition(pokemon, low, high);

    if (low < index - 1) {
      quickSort(pokemon, low, index - 1);
    }

    if (index < high) {
      quickSort(pokemon, index + 1, high);
    }
  }
  return pokemon;
}
