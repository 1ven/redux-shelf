const isUpperLetter = letter => letter.toUpperCase() === letter;

export default const camelToSnake = str => str.split().reduce((acc, letter) => (
  isUpperLetter(letter) ? acc + '_' + letter.toLowerCase() : letter
), '').join();
