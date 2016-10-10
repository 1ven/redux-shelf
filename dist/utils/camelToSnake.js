"use strict";
const isUpperLetter = (letter) => letter.toUpperCase() === letter;
const camelToSnake = function (str) {
    return str
        .split('')
        .reduce((acc, letter) => (isUpperLetter(letter) ? (acc + '_' + letter.toLowerCase()) : (acc + letter)), '');
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = camelToSnake;
