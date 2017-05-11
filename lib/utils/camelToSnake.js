"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isUpperLetter = function isUpperLetter(letter) {
    return letter.toUpperCase() === letter;
};
var camelToSnake = function camelToSnake(str) {
    return str.split('').reduce(function (acc, letter) {
        return isUpperLetter(letter) ? acc + '_' + letter.toLowerCase() : acc + letter;
    }, '');
};
exports.default = camelToSnake;