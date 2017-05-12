"use strict";
/* import { IAction, IActionType } from '../interfaces'; */

Object.defineProperty(exports, "__esModule", { value: true });
/* type IState = any; */
/* interface IActionHandlersMap { */
/*   [key: IActionType]: IActionHandler, */
/* } */
var reduce = require("lodash/reduce");
var transformState = function transformState(state, action, map) {
    return reduce(map, function (prevState, transformer, actionType) {
        return actionType === action.type ? transformer(prevState, action) : prevState;
    }, state);
};
var createReducer = function createReducer(initialState) {
    for (var _len = arguments.length, maps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        maps[_key - 1] = arguments[_key];
    }

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];
        return reduce(maps, function (prevState, map) {
            return transformState(prevState, action, map);
        }, state);
    };
};
exports.default = createReducer;