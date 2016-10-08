const isUpperLetter = (letter: string) => letter.toUpperCase() === letter

export default function camelToSnake(str: string) {
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
