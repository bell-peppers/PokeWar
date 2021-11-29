const instructions = [
  {message: 'Welcome to PokeWar!', type: 'instructions'},
  {message: "Here's how to play:", type: 'instructions'},
  {
    message:
      'First, select one of your pokemon by clicking on one of the bottom-left cards',
    type: 'instructions',
  },
  {
    message:
      "Once selected, you can click to choose which attack you'd like to perform.",
    type: 'instructions',
  },
  {
    message:
      "Once you have an attack selected, click on one of your opponent's active Pokemon to attack it.",
    type: 'instructions',
  },
  {
    message:
      "Repeat this once for each of your active Pokemon. When done and when it's your turn, click complete turn.",
    type: 'instructions',
  },
  {
    message:
      "The object of the game is to defeat all of your opponent's Pokemon.",
    type: 'instructions',
  },
  {message: 'Happy Battling!', type: 'instructions'},
];

export const swear = /\b((f{1,10}u{1,20}c{1,10}k{1,10}i{1,20}n{1,10}g{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}e{1,10}d{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}e{1,10}r{1,10}){1,5}|s{1,10}h{1,10}i{1,10}t{1,10}){1,5}|(f{1,10}u{1,20}c{1,10}k{1,10}){1,5}|(a{1,10}s{1,10}s{1,10}){1,5}|(b{1,10}i{1,20}t{1,10}c{1,10}h{1,10}){1,5}|(t{1,10}w{1,20}a{1,10}t{1,10}){1,5}|(c{1,10}u{1,20}n{1,10}t{1,10}){1,5}|(c{1,10}o{1,20}c{1,10}k{1,10}){1,5}|(d{1,10}i{1,20}c{1,10}k{1,10}){1,5}\b/gi;
export default instructions
