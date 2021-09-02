const starterPkIds = [
  1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501,
];

function randomNum() {
  return Math.floor(Math.random() * 500 + 1);
}
export default function randomStarterPk() {
  let pkArray = [];
  while (pkArray.length < 10) {
    pkArray.push(randomNum());
  }
  return pkArray;
}
