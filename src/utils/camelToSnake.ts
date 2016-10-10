const isUpperLetter = (letter: string) => letter.toUpperCase() === letter

const camelToSnake = function(str: string) {
  return str
    .split('')
    .reduce((acc: string, letter: string) => (
      isUpperLetter(letter) ? (
        acc + '_' + letter.toLowerCase()
      ) : (
        acc + letter
      )
    ), '');
}

export default camelToSnake;
